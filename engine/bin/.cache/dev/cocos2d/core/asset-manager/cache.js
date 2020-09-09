
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/cache.js';
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
var js = require('../platform/js');
/**
 * !#en
 * use to cache something
 * 
 * !#zh
 * 用于缓存某些内容
 * 
 * @class Cache
 * @typescript Cache<T = any>
 */


function Cache(map) {
  if (map) {
    this._map = map;
    this._count = Object.keys(map).length;
  } else {
    this._map = js.createMap(true);
    this._count = 0;
  }
}

Cache.prototype = {
  /**
   * !#en
   * Create a cache
   * 
   * !#zh
   * 创建一个 cache
   * 
   * @method constructor
   * @param {Object} [map] - An object used to initialize   
   * 
   * @typescript
   * constructor(map?: Record<string, T>)
   */
  constructor: Cache,

  /**
   * !#en
   * Add Key-Value to cache
   * 
   * !#zh
   * 增加键值对到缓存中
   * 
   * @method add
   * @param {String} key - The key
   * @param {*} val - The value
   * @returns {*} The value
   * 
   * @example
   * var cache = new Cache();
   * cache.add('test', null);
   * 
   * @typescript
   * add(key: string, val: T): T
   */
  add: function add(key, val) {
    if (!(key in this._map)) this._count++;
    return this._map[key] = val;
  },

  /**
   * !#en
   * Get the cached content by key
   * 
   * !#zh
   * 通过 key 获取对应的 value
   * 
   * @method get
   * @param {string} key - The key
   * @returns {*} The corresponding content
   * 
   * @example
   * var cache = new Cache();
   * var test = cache.get('test');
   * 
   * @typescript
   * get(key: string): T
   */
  get: function get(key) {
    return this._map[key];
  },

  /**
   * !#en
   * Check whether or not content exists by key
   * 
   * !#zh
   * 通过 Key 判断是否存在对应的内容
   * 
   * @method has
   * @param {string} key - The key
   * @returns {boolean} True indecates that content of the key exists
   * 
   * @example
   * var cache = new Cache();
   * var exist = cache.has('test');
   * 
   * @typescript
   * has(key: string): boolean
   */
  has: function has(key) {
    return key in this._map;
  },

  /**
   * !#en
   * Remove the cached content by key
   * 
   * !#zh
   * 通过 Key 移除对应的内容
   * 
   * @method remove
   * @param {string} key - The key
   * @returns {*} The removed content
   * 
   * @example
   * var cache = new Cache();
   * var content = cache.remove('test');
   * 
   * @typescript
   * remove(key: string): T
   */
  remove: function remove(key) {
    var out = this._map[key];

    if (key in this._map) {
      delete this._map[key];
      this._count--;
    }

    return out;
  },

  /**
   * !#en
   * Clear all content
   * 
   * !#zh
   * 清除所有内容
   * 
   * @method clear
   * 
   * @example
   * var cache = new Cache();
   * cache.clear();
   * 
   * @typescript
   * clear():void
   */
  clear: function clear() {
    if (this._count !== 0) {
      this._map = js.createMap(true);
      this._count = 0;
    }
  },

  /**
   * !#en
   * Enumerate all content and invoke function
   * 
   * !#zh
   * 枚举所有内容并执行方法
   * 
   * @method forEach
   * @param {Function} func - Function to be invoked
   * @param {*} func.val - The value 
   * @param {String} func.key - The corresponding key
   * 
   * @example
   * var cache = new Cache();
   * cache.forEach((val, key) => console.log(key));
   * 
   * @typescript
   * forEach(func: (val: T, key: string) => void): void
   */
  forEach: function forEach(func) {
    for (var key in this._map) {
      func(this._map[key], key);
    }
  },

  /**
   * !#en
   * Enumerate all content to find one element which can fulfill condition
   * 
   * !#zh
   * 枚举所有内容，找到一个可以满足条件的元素
   * 
   * @method find
   * @param {Function} predicate - The condition
   * @returns {*} content
   * 
   * @example
   * var cache = new Cache();
   * var val = cache.find((val, key) => key === 'test');
   * 
   * @typescript
   * find(predicate: (val: T, key: string) => boolean): T
   */
  find: function find(predicate) {
    for (var key in this._map) {
      if (predicate(this._map[key], key)) return this._map[key];
    }

    return null;
  },

  /**
   * !#en
   * The count of cached content
   * 
   * !#zh
   * 缓存数量
   * 
   * @property count
   * @type {Number}
   */
  get count() {
    return this._count;
  },

  /**
   * !#en
   * Destroy this cache
   * 
   * !#zh
   * 销毁这个 cache
   * 
   * @method destroy
   * 
   * @typescript
   * destroy(): void
   */
  destroy: function destroy() {
    this._map = null;
  }
};
module.exports = Cache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvY2FjaGUuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiQ2FjaGUiLCJtYXAiLCJfbWFwIiwiX2NvdW50IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImNyZWF0ZU1hcCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiYWRkIiwia2V5IiwidmFsIiwiZ2V0IiwiaGFzIiwicmVtb3ZlIiwib3V0IiwiY2xlYXIiLCJmb3JFYWNoIiwiZnVuYyIsImZpbmQiLCJwcmVkaWNhdGUiLCJjb3VudCIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7OztBQUlBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWxCO0FBQ0E7Ozs7Ozs7Ozs7OztBQVVBLFNBQVNDLEtBQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO0FBQ2pCLE1BQUlBLEdBQUosRUFBUztBQUNMLFNBQUtDLElBQUwsR0FBWUQsR0FBWjtBQUNBLFNBQUtFLE1BQUwsR0FBY0MsTUFBTSxDQUFDQyxJQUFQLENBQVlKLEdBQVosRUFBaUJLLE1BQS9CO0FBQ0gsR0FIRCxNQUlLO0FBQ0QsU0FBS0osSUFBTCxHQUFZSixFQUFFLENBQUNTLFNBQUgsQ0FBYSxJQUFiLENBQVo7QUFDQSxTQUFLSixNQUFMLEdBQWMsQ0FBZDtBQUNIO0FBQ0o7O0FBRURILEtBQUssQ0FBQ1EsU0FBTixHQUFrQjtBQUVkOzs7Ozs7Ozs7Ozs7O0FBYUFDLEVBQUFBLFdBQVcsRUFBRVQsS0FmQzs7QUFpQmQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkFVLEVBQUFBLEdBcENjLGVBb0NUQyxHQXBDUyxFQW9DSkMsR0FwQ0ksRUFvQ0M7QUFDWCxRQUFJLEVBQUVELEdBQUcsSUFBSSxLQUFLVCxJQUFkLENBQUosRUFBeUIsS0FBS0MsTUFBTDtBQUN6QixXQUFPLEtBQUtELElBQUwsQ0FBVVMsR0FBVixJQUFpQkMsR0FBeEI7QUFDSCxHQXZDYTs7QUF5Q2Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQUMsRUFBQUEsR0EzRGMsZUEyRFRGLEdBM0RTLEVBMkRKO0FBQ04sV0FBTyxLQUFLVCxJQUFMLENBQVVTLEdBQVYsQ0FBUDtBQUNILEdBN0RhOztBQStEZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBRyxFQUFBQSxHQWpGYyxlQWlGVEgsR0FqRlMsRUFpRko7QUFDTixXQUFPQSxHQUFHLElBQUksS0FBS1QsSUFBbkI7QUFDSCxHQW5GYTs7QUFxRmQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQWEsRUFBQUEsTUF2R2Msa0JBdUdOSixHQXZHTSxFQXVHRDtBQUNULFFBQUlLLEdBQUcsR0FBRyxLQUFLZCxJQUFMLENBQVVTLEdBQVYsQ0FBVjs7QUFDQSxRQUFJQSxHQUFHLElBQUksS0FBS1QsSUFBaEIsRUFBc0I7QUFDbEIsYUFBTyxLQUFLQSxJQUFMLENBQVVTLEdBQVYsQ0FBUDtBQUNBLFdBQUtSLE1BQUw7QUFDSDs7QUFDRCxXQUFPYSxHQUFQO0FBQ0gsR0E5R2E7O0FBZ0hkOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBQyxFQUFBQSxLQWhJYyxtQkFnSUw7QUFDTCxRQUFJLEtBQUtkLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsV0FBS0QsSUFBTCxHQUFZSixFQUFFLENBQUNTLFNBQUgsQ0FBYSxJQUFiLENBQVo7QUFDQSxXQUFLSixNQUFMLEdBQWMsQ0FBZDtBQUNIO0FBQ0osR0FySWE7O0FBdUlkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBZSxFQUFBQSxPQTFKYyxtQkEwSkxDLElBMUpLLEVBMEpDO0FBQ1gsU0FBSyxJQUFJUixHQUFULElBQWdCLEtBQUtULElBQXJCLEVBQTJCO0FBQ3ZCaUIsTUFBQUEsSUFBSSxDQUFDLEtBQUtqQixJQUFMLENBQVVTLEdBQVYsQ0FBRCxFQUFpQkEsR0FBakIsQ0FBSjtBQUNIO0FBQ0osR0E5SmE7O0FBZ0tkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFTLEVBQUFBLElBbExjLGdCQWtMUkMsU0FsTFEsRUFrTEc7QUFDYixTQUFLLElBQUlWLEdBQVQsSUFBZ0IsS0FBS1QsSUFBckIsRUFBMkI7QUFDdkIsVUFBSW1CLFNBQVMsQ0FBQyxLQUFLbkIsSUFBTCxDQUFVUyxHQUFWLENBQUQsRUFBaUJBLEdBQWpCLENBQWIsRUFBb0MsT0FBTyxLQUFLVCxJQUFMLENBQVVTLEdBQVYsQ0FBUDtBQUN2Qzs7QUFDRCxXQUFPLElBQVA7QUFDSCxHQXZMYTs7QUF5TGQ7Ozs7Ozs7Ozs7QUFVQSxNQUFJVyxLQUFKLEdBQWE7QUFDVCxXQUFPLEtBQUtuQixNQUFaO0FBQ0gsR0FyTWE7O0FBdU1kOzs7Ozs7Ozs7Ozs7QUFZQW9CLEVBQUFBLE9Bbk5jLHFCQW1OSDtBQUNQLFNBQUtyQixJQUFMLEdBQVksSUFBWjtBQUNIO0FBck5hLENBQWxCO0FBd05Bc0IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekIsS0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXG4gKi9cblxuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xuLyoqXG4gKiAhI2VuXG4gKiB1c2UgdG8gY2FjaGUgc29tZXRoaW5nXG4gKiBcbiAqICEjemhcbiAqIOeUqOS6jue8k+WtmOafkOS6m+WGheWuuVxuICogXG4gKiBAY2xhc3MgQ2FjaGVcbiAqIEB0eXBlc2NyaXB0IENhY2hlPFQgPSBhbnk+XG4gKi9cbmZ1bmN0aW9uIENhY2hlIChtYXApIHtcbiAgICBpZiAobWFwKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICAgICAgdGhpcy5fY291bnQgPSBPYmplY3Qua2V5cyhtYXApLmxlbmd0aDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX21hcCA9IGpzLmNyZWF0ZU1hcCh0cnVlKTtcbiAgICAgICAgdGhpcy5fY291bnQgPSAwO1xuICAgIH1cbn1cblxuQ2FjaGUucHJvdG90eXBlID0ge1xuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDcmVhdGUgYSBjYWNoZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliJvlu7rkuIDkuKogY2FjaGVcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFttYXBdIC0gQW4gb2JqZWN0IHVzZWQgdG8gaW5pdGlhbGl6ZSAgIFxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29uc3RydWN0b3IobWFwPzogUmVjb3JkPHN0cmluZywgVD4pXG4gICAgICovXG4gICAgY29uc3RydWN0b3I6IENhY2hlLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBLZXktVmFsdWUgdG8gY2FjaGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5aKe5Yqg6ZSu5YC85a+55Yiw57yT5a2Y5LitXG4gICAgICogXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gVGhlIGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsIC0gVGhlIHZhbHVlXG4gICAgICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNhY2hlID0gbmV3IENhY2hlKCk7XG4gICAgICogY2FjaGUuYWRkKCd0ZXN0JywgbnVsbCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGQoa2V5OiBzdHJpbmcsIHZhbDogVCk6IFRcbiAgICAgKi9cbiAgICBhZGQgKGtleSwgdmFsKSB7ICAgICAgIFxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fbWFwKSkgdGhpcy5fY291bnQrKztcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtrZXldID0gdmFsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBjYWNoZWQgY29udGVudCBieSBrZXlcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+HIGtleSDojrflj5blr7nlupTnmoQgdmFsdWVcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5XG4gICAgICogQHJldHVybnMgeyp9IFRoZSBjb3JyZXNwb25kaW5nIGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjYWNoZSA9IG5ldyBDYWNoZSgpO1xuICAgICAqIHZhciB0ZXN0ID0gY2FjaGUuZ2V0KCd0ZXN0Jyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXQoa2V5OiBzdHJpbmcpOiBUXG4gICAgICovXG4gICAgZ2V0IChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtrZXldO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hlY2sgd2hldGhlciBvciBub3QgY29udGVudCBleGlzdHMgYnkga2V5XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmAmui/hyBLZXkg5Yik5pat5piv5ZCm5a2Y5Zyo5a+55bqU55qE5YaF5a65XG4gICAgICogXG4gICAgICogQG1ldGhvZCBoYXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGluZGVjYXRlcyB0aGF0IGNvbnRlbnQgb2YgdGhlIGtleSBleGlzdHNcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjYWNoZSA9IG5ldyBDYWNoZSgpO1xuICAgICAqIHZhciBleGlzdCA9IGNhY2hlLmhhcygndGVzdCcpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaGFzKGtleTogc3RyaW5nKTogYm9vbGVhblxuICAgICAqL1xuICAgIGhhcyAoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgaW4gdGhpcy5fbWFwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlIHRoZSBjYWNoZWQgY29udGVudCBieSBrZXlcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+HIEtleSDnp7vpmaTlr7nlupTnmoTlhoXlrrlcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5XG4gICAgICogQHJldHVybnMgeyp9IFRoZSByZW1vdmVkIGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjYWNoZSA9IG5ldyBDYWNoZSgpO1xuICAgICAqIHZhciBjb250ZW50ID0gY2FjaGUucmVtb3ZlKCd0ZXN0Jyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZW1vdmUoa2V5OiBzdHJpbmcpOiBUXG4gICAgICovXG4gICAgcmVtb3ZlIChrZXkpIHtcbiAgICAgICAgdmFyIG91dCA9IHRoaXMuX21hcFtrZXldO1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMuX21hcCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX21hcFtrZXldO1xuICAgICAgICAgICAgdGhpcy5fY291bnQtLTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2xlYXIgYWxsIGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5riF6Zmk5omA5pyJ5YaF5a65XG4gICAgICogXG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNhY2hlID0gbmV3IENhY2hlKCk7XG4gICAgICogY2FjaGUuY2xlYXIoKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNsZWFyKCk6dm9pZFxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvdW50ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9jb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEVudW1lcmF0ZSBhbGwgY29udGVudCBhbmQgaW52b2tlIGZ1bmN0aW9uXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOaemuS4vuaJgOacieWGheWuueW5tuaJp+ihjOaWueazlVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZm9yRWFjaFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkXG4gICAgICogQHBhcmFtIHsqfSBmdW5jLnZhbCAtIFRoZSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuYy5rZXkgLSBUaGUgY29ycmVzcG9uZGluZyBrZXlcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjYWNoZSA9IG5ldyBDYWNoZSgpO1xuICAgICAqIGNhY2hlLmZvckVhY2goKHZhbCwga2V5KSA9PiBjb25zb2xlLmxvZyhrZXkpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZvckVhY2goZnVuYzogKHZhbDogVCwga2V5OiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkXG4gICAgICovXG4gICAgZm9yRWFjaCAoZnVuYykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICBmdW5jKHRoaXMuX21hcFtrZXldLCBrZXkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFbnVtZXJhdGUgYWxsIGNvbnRlbnQgdG8gZmluZCBvbmUgZWxlbWVudCB3aGljaCBjYW4gZnVsZmlsbCBjb25kaXRpb25cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5p6a5Li+5omA5pyJ5YaF5a6577yM5om+5Yiw5LiA5Liq5Y+v5Lul5ruh6Laz5p2h5Lu255qE5YWD57SgXG4gICAgICogXG4gICAgICogQG1ldGhvZCBmaW5kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIC0gVGhlIGNvbmRpdGlvblxuICAgICAqIEByZXR1cm5zIHsqfSBjb250ZW50XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY2FjaGUgPSBuZXcgQ2FjaGUoKTtcbiAgICAgKiB2YXIgdmFsID0gY2FjaGUuZmluZCgodmFsLCBrZXkpID0+IGtleSA9PT0gJ3Rlc3QnKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZpbmQocHJlZGljYXRlOiAodmFsOiBULCBrZXk6IHN0cmluZykgPT4gYm9vbGVhbik6IFRcbiAgICAgKi9cbiAgICBmaW5kIChwcmVkaWNhdGUpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX21hcCkge1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSh0aGlzLl9tYXBba2V5XSwga2V5KSkgcmV0dXJuIHRoaXMuX21hcFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGNvdW50IG9mIGNhY2hlZCBjb250ZW50XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOe8k+WtmOaVsOmHj1xuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBjb3VudFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRGVzdHJveSB0aGlzIGNhY2hlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmUgOavgei/meS4qiBjYWNoZVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZGVzdHJveVxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGVzdHJveSgpOiB2b2lkXG4gICAgICovXG4gICAgZGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG51bGw7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYWNoZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==