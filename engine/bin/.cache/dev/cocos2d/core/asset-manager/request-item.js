
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/request-item.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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

/**
 * @module cc.AssetManager
 */
var MAX_DEAD_NUM = 500;
var _deadPool = [];
/**
 * !#en
 * A collection of information about a request
 * 
 * !#zh
 * 请求的相关信息集合
 * 
 * @class RequestItem
 */

function RequestItem() {
  this._id = '';
  /**
   * !#en 
   * The uuid of request
   * 
   * !#zh 
   * 请求资源的uuid
   * 
   * @property uuid
   * @type {String}
   */

  this.uuid = '';
  /**
   * !#en 
   * The final url of request
   * 
   * !#zh
   * 请求的最终url
   * 
   * @property url
   * @type {String}
   */

  this.url = '';
  /**
   * !#en
   * The extension name of asset
   * 
   * !#zh
   * 资源的扩展名
   * 
   * @property ext
   * @type {String}
   */

  this.ext = '.json';
  /**
   * !#en
   * The content of asset
   * 
   * !#zh
   * 资源的内容
   * 
   * @property content
   * @type {*}
   */

  this.content = null;
  /**
   * !#en
   * The file of asset
   * 
   * !#zh
   * 资源的文件
   * 
   * @property file
   * @type {*}
   */

  this.file = null;
  /**
   * !#en
   * The information of asset
   * 
   * !#zh
   * 资源的相关信息
   * 
   * @property info
   * @type {Object}
   */

  this.info = null;
  this.config = null;
  /**
   * !#en
   * Whether or not it is native asset
   * 
   * !#zh
   * 资源是否是原生资源
   * 
   * @property isNative
   * @type {Boolean}
   */

  this.isNative = false;
  /**
   * !#en
   * Custom options
   * 
   * !#zh
   * 自定义参数
   * 
   * @property options
   * @type {Object}
   */

  this.options = Object.create(null);
}

RequestItem.prototype = {
  /**
   * !#en
   * Create a request item
   * 
   * !#zh
   * 创建一个 request item
   * 
   * @method constructor
   * 
   * @typescript
   * constructor()
   */
  constructor: RequestItem,

  /**
   * !#en
   * The id of request, combined from uuid and isNative
   * 
   * !#zh
   * 请求的 id, 由 uuid 和 isNative 组合而成
   * 
   * @property id
   * @type {String}
   */
  get id() {
    if (!this._id) {
      this._id = this.uuid + '@' + (this.isNative ? 'native' : 'import');
    }

    return this._id;
  },

  /**
   * !#en
   * Recycle this for reuse
   * 
   * !#zh
   * 回收 requestItem 用于复用
   * 
   * @method recycle
   * 
   * @typescript
   * recycle(): void
   */
  recycle: function recycle() {
    if (_deadPool.length === MAX_DEAD_NUM) return;
    this._id = '';
    this.uuid = '';
    this.url = '';
    this.ext = '.json';
    this.content = null;
    this.file = null;
    this.info = null;
    this.config = null;
    this.isNative = false;
    this.options = Object.create(null);

    _deadPool.push(this);
  }
};
/**
 * !#en
 * Create a new request item from pool
 * 
 * !#zh
 * 从对象池中创建 requestItem
 * 
 * @static
 * @method create
 * @returns {RequestItem} requestItem
 * 
 * @typescript 
 * create(): RequestItem
 */

RequestItem.create = function () {
  var out = null;

  if (_deadPool.length !== 0) {
    out = _deadPool.pop();
  } else {
    out = new RequestItem();
  }

  return out;
};

module.exports = RequestItem;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvcmVxdWVzdC1pdGVtLmpzIl0sIm5hbWVzIjpbIk1BWF9ERUFEX05VTSIsIl9kZWFkUG9vbCIsIlJlcXVlc3RJdGVtIiwiX2lkIiwidXVpZCIsInVybCIsImV4dCIsImNvbnRlbnQiLCJmaWxlIiwiaW5mbyIsImNvbmZpZyIsImlzTmF0aXZlIiwib3B0aW9ucyIsIk9iamVjdCIsImNyZWF0ZSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiaWQiLCJyZWN5Y2xlIiwibGVuZ3RoIiwicHVzaCIsIm91dCIsInBvcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7O0FBSUEsSUFBSUEsWUFBWSxHQUFHLEdBQW5CO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBRUE7Ozs7Ozs7Ozs7QUFTQSxTQUFTQyxXQUFULEdBQXdCO0FBRXBCLE9BQUtDLEdBQUwsR0FBVyxFQUFYO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxPQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUVBOzs7Ozs7Ozs7OztBQVVBLE9BQUtDLEdBQUwsR0FBVyxPQUFYO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0MsT0FBTCxHQUFlLElBQWY7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxPQUFLQyxJQUFMLEdBQVksSUFBWjtBQUVBOzs7Ozs7Ozs7OztBQVVBLE9BQUtDLElBQUwsR0FBWSxJQUFaO0FBRUEsT0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxPQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0MsT0FBTCxHQUFlQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQWY7QUFDSDs7QUFFRFosV0FBVyxDQUFDYSxTQUFaLEdBQXdCO0FBRXBCOzs7Ozs7Ozs7Ozs7QUFZQUMsRUFBQUEsV0FBVyxFQUFFZCxXQWRPOztBQWdCcEI7Ozs7Ozs7Ozs7QUFVQSxNQUFJZSxFQUFKLEdBQVU7QUFDTixRQUFJLENBQUMsS0FBS2QsR0FBVixFQUFlO0FBQ1gsV0FBS0EsR0FBTCxHQUFXLEtBQUtDLElBQUwsR0FBWSxHQUFaLElBQW1CLEtBQUtPLFFBQUwsR0FBZ0IsUUFBaEIsR0FBMkIsUUFBOUMsQ0FBWDtBQUNIOztBQUNELFdBQU8sS0FBS1IsR0FBWjtBQUNILEdBL0JtQjs7QUFpQ3BCOzs7Ozs7Ozs7Ozs7QUFZQWUsRUFBQUEsT0E3Q29CLHFCQTZDVDtBQUNQLFFBQUlqQixTQUFTLENBQUNrQixNQUFWLEtBQXFCbkIsWUFBekIsRUFBdUM7QUFDdkMsU0FBS0csR0FBTCxHQUFXLEVBQVg7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLE9BQVg7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBZjs7QUFDQWIsSUFBQUEsU0FBUyxDQUFDbUIsSUFBVixDQUFlLElBQWY7QUFDSDtBQTFEbUIsQ0FBeEI7QUE2REE7Ozs7Ozs7Ozs7Ozs7OztBQWNBbEIsV0FBVyxDQUFDWSxNQUFaLEdBQXFCLFlBQVk7QUFDN0IsTUFBSU8sR0FBRyxHQUFHLElBQVY7O0FBQ0EsTUFBSXBCLFNBQVMsQ0FBQ2tCLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDeEJFLElBQUFBLEdBQUcsR0FBR3BCLFNBQVMsQ0FBQ3FCLEdBQVYsRUFBTjtBQUNILEdBRkQsTUFHSztBQUNERCxJQUFBQSxHQUFHLEdBQUcsSUFBSW5CLFdBQUosRUFBTjtBQUNIOztBQUVELFNBQU9tQixHQUFQO0FBQ0gsQ0FWRDs7QUFZQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdEIsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqL1xuXG52YXIgTUFYX0RFQURfTlVNID0gNTAwO1xudmFyIF9kZWFkUG9vbCA9IFtdO1xuXG4vKipcbiAqICEjZW5cbiAqIEEgY29sbGVjdGlvbiBvZiBpbmZvcm1hdGlvbiBhYm91dCBhIHJlcXVlc3RcbiAqIFxuICogISN6aFxuICog6K+35rGC55qE55u45YWz5L+h5oGv6ZuG5ZCIXG4gKiBcbiAqIEBjbGFzcyBSZXF1ZXN0SXRlbVxuICovXG5mdW5jdGlvbiBSZXF1ZXN0SXRlbSAoKSB7XG5cbiAgICB0aGlzLl9pZCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgdXVpZCBvZiByZXF1ZXN0XG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDor7fmsYLotYTmupDnmoR1dWlkXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHV1aWRcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudXVpZCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgZmluYWwgdXJsIG9mIHJlcXVlc3RcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6K+35rGC55qE5pyA57uIdXJsXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHVybFxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy51cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgZXh0ZW5zaW9uIG5hbWUgb2YgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6LWE5rqQ55qE5omp5bGV5ZCNXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGV4dFxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5leHQgPSAnLmpzb24nO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBjb250ZW50IG9mIGFzc2V0XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOi1hOa6kOeahOWGheWuuVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBjb250ZW50XG4gICAgICogQHR5cGUgeyp9XG4gICAgICovXG4gICAgdGhpcy5jb250ZW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgZmlsZSBvZiBhc3NldFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDotYTmupDnmoTmlofku7ZcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgZmlsZVxuICAgICAqIEB0eXBlIHsqfVxuICAgICAqL1xuICAgIHRoaXMuZmlsZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGluZm9ybWF0aW9uIG9mIGFzc2V0XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOi1hOa6kOeahOebuOWFs+S/oeaBr1xuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBpbmZvXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmluZm8gPSBudWxsO1xuXG4gICAgdGhpcy5jb25maWcgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdoZXRoZXIgb3Igbm90IGl0IGlzIG5hdGl2ZSBhc3NldFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDotYTmupDmmK/lkKbmmK/ljp/nlJ/otYTmupBcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgaXNOYXRpdmVcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmlzTmF0aXZlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ3VzdG9tIG9wdGlvbnNcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6Ieq5a6a5LmJ5Y+C5pWwXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IG9wdGlvbnNcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5cblJlcXVlc3RJdGVtLnByb3RvdHlwZSA9IHtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDcmVhdGUgYSByZXF1ZXN0IGl0ZW1cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Yib5bu65LiA5LiqIHJlcXVlc3QgaXRlbVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNvbnN0cnVjdG9yKClcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcjogUmVxdWVzdEl0ZW0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGlkIG9mIHJlcXVlc3QsIGNvbWJpbmVkIGZyb20gdXVpZCBhbmQgaXNOYXRpdmVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6K+35rGC55qEIGlkLCDnlLEgdXVpZCDlkowgaXNOYXRpdmUg57uE5ZCI6ICM5oiQXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgaWQgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMudXVpZCArICdAJyArICh0aGlzLmlzTmF0aXZlID8gJ25hdGl2ZScgOiAnaW1wb3J0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVjeWNsZSB0aGlzIGZvciByZXVzZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlm57mlLYgcmVxdWVzdEl0ZW0g55So5LqO5aSN55SoXG4gICAgICogXG4gICAgICogQG1ldGhvZCByZWN5Y2xlXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWN5Y2xlKCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWN5Y2xlICgpIHtcbiAgICAgICAgaWYgKF9kZWFkUG9vbC5sZW5ndGggPT09IE1BWF9ERUFEX05VTSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9pZCA9ICcnO1xuICAgICAgICB0aGlzLnV1aWQgPSAnJztcbiAgICAgICAgdGhpcy51cmwgPSAnJztcbiAgICAgICAgdGhpcy5leHQgPSAnLmpzb24nO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmZpbGUgPSBudWxsO1xuICAgICAgICB0aGlzLmluZm8gPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNOYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgX2RlYWRQb29sLnB1c2godGhpcyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGUgYSBuZXcgcmVxdWVzdCBpdGVtIGZyb20gcG9vbFxuICogXG4gKiAhI3poXG4gKiDku47lr7nosaHmsaDkuK3liJvlu7ogcmVxdWVzdEl0ZW1cbiAqIFxuICogQHN0YXRpY1xuICogQG1ldGhvZCBjcmVhdGVcbiAqIEByZXR1cm5zIHtSZXF1ZXN0SXRlbX0gcmVxdWVzdEl0ZW1cbiAqIFxuICogQHR5cGVzY3JpcHQgXG4gKiBjcmVhdGUoKTogUmVxdWVzdEl0ZW1cbiAqL1xuUmVxdWVzdEl0ZW0uY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvdXQgPSBudWxsO1xuICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIG91dCA9IF9kZWFkUG9vbC5wb3AoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG91dCA9IG5ldyBSZXF1ZXN0SXRlbSgpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RJdGVtOyJdLCJzb3VyY2VSb290IjoiLyJ9