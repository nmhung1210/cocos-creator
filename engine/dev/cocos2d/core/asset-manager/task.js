
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/task.js';
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
var _taskId = 0;
var MAX_DEAD_NUM = 500;
var _deadPool = [];
/**
 * !#en
 * Task is used to run in the pipeline for some effect
 * 
 * !#zh
 * 任务用于在管线中运行以达成某种效果
 * 
 * @class Task
 */

function Task(options) {
  /**
   * !#en
   * The id of task
   * 
   * !#zh
   * 任务id
   * 
   * @property id
   * @type {Number}
   */
  this.id = _taskId++;
  this._isFinish = true;
  /**
   * !#en
   * The callback when task is completed
   * 
   * !#zh
   * 完成回调
   * 
   * @property onComplete
   * @type {Function}
   */

  this.onComplete = null;
  /**
   * !#en
   * The callback of progression
   * 
   * !#zh
   * 进度回调
   * 
   * @property onProgress
   * @type {Function}
   */

  this.onProgress = null;
  /**
   * !#en
   * The callback when something goes wrong
   * 
   * !#zh
   * 错误回调
   * 
   * @property onError
   * @type {Function}
   */

  this.onError = null;
  /**
   * !#en
   * The source of task
   * 
   * !#zh
   * 任务的源
   * 
   * @property source
   * @type {*}
   */

  this.source = null;
  /**
   * !#en
   * The output of task
   * 
   * !#zh
   * 任务的输出
   * 
   * @property output
   * @type {*}
   */

  this.output = null;
  /**
   * !#en
   * The input of task
   * 
   * !#zh
   * 任务的输入
   * 
   * @property input
   * @type {*}
   */

  this.input = null;
  /**
   * !#en
   * The progression of task
   * 
   * !#zh
   * 任务的进度
   * 
   * @property progress
   * @type {*}
   */

  this.progress = null;
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

  this.options = null;
  this.set(options);
}

;
Task.prototype = {
  /**
   * !#en
   * Create a new Task
   * 
   * !#zh
   * 创建一个任务
   * 
   * @method constructor
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [options.onComplete] - Callback when the task is completed, if the pipeline is synchronous, onComplete is unnecessary.
   * @param {Function} [options.onProgress] - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
   * @param {Function} [options.onError] - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
   * @param {*} options.input - Something will be handled with pipeline
   * @param {*} [options.progress] - Progress information, you may need to assign it manually when multiple pipeline share one progress
   * @param {Object} [options.options] - Custom parameters
   * 
   * @typescript
   * constructor(options?: {onComplete?: (err: Error, result: any) => void, onError?: () => void, onProgress?: Function, input: any, progress?: any, options?: Record<string, any>})
   */
  constructor: Task,

  /**
   * !#en
   * Set paramters of this task
   * 
   * !#zh
   * 设置任务的参数
   * 
   * @method set
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [options.onComplete] - Callback when the task complete, if the pipeline is synchronous, onComplete is unnecessary.
   * @param {Function} [options.onProgress] - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
   * @param {Function} [options.onError] - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
   * @param {*} options.input - Something will be handled with pipeline
   * @param {*} [options.progress] - Progress information, you may need to assign it manually when multiple pipeline share one progress
   * @param {Object} [options.options] - Custom parameters
   * 
   * @example 
   * var task = new Task();
   * task.set({input: ['test'], onComplete: (err, result) => console.log(err), onProgress: (finish, total) => console.log(finish / total)});
   * 
   * @typescript
   * set(options?: {onComplete?: (err: Error, result: any) => void, onError?: () => void, onProgress?: Function, input: any, progress?: any, options?: Record<string, any>}): void
   */
  set: function set(options) {
    options = options || Object.create(null);
    this.onComplete = options.onComplete;
    this.onProgress = options.onProgress;
    this.onError = options.onError;
    this.source = this.input = options.input;
    this.output = null;
    this.progress = options.progress; // custom data

    this.options = options.options || Object.create(null);
  },

  /**
   * !#en
   * Dispatch event
   * 
   * !#zh
   * 发布事件
   * 
   * @method dispatch
   * @param {string} event - The event name
   * @param {*} param1 - Parameter 1
   * @param {*} param2 - Parameter 2
   * @param {*} param3 - Parameter 3
   * @param {*} param4 - Parameter 4
   * 
   * @example
   * var task = Task.create();
   * Task.onComplete = (msg) => console.log(msg);
   * Task.dispatch('complete', 'hello world');
   * 
   * @typescript
   * dispatch(event: string, param1?: any, param2?: any, param3?: any, param4?: any): void
   */
  dispatch: function dispatch(event, param1, param2, param3, param4) {
    switch (event) {
      case 'complete':
        this.onComplete && this.onComplete(param1, param2, param3, param4);
        break;

      case 'progress':
        this.onProgress && this.onProgress(param1, param2, param3, param4);
        break;

      case 'error':
        this.onError && this.onError(param1, param2, param3, param4);
        break;

      default:
        var str = 'on' + event[0].toUpperCase() + event.substr(1);

        if (typeof this[str] === 'function') {
          this[str](param1, param2, param3, param4);
        }

        break;
    }
  },

  /**
   * !#en
   * Recycle this for reuse
   * 
   * !#zh
   * 回收 task 用于复用
   * 
   * @method recycle
   * 
   * @typescript
   * recycle(): void
   */
  recycle: function recycle() {
    if (_deadPool.length === MAX_DEAD_NUM) return;
    this.onComplete = null;
    this.onProgress = null;
    this.onError = null;
    this.source = this.output = this.input = null;
    this.progress = null;
    this.options = null;

    _deadPool.push(this);
  },

  /**
   * !#en
   * Whether or not this task is completed
   * 
   * !#zh
   * 此任务是否已经完成
   * 
   * @property isFinish
   * @type {Boolean}
   */
  get isFinish() {
    return this._isFinish;
  }

};
/**
 * !#en
 * Create a new task from pool
 * 
 * !#zh
 * 从对象池中创建 task
 * 
 * @static
 * @method create
 * @param {Object} [options] - Some optional paramters
 * @param {Function} [options.onComplete] - Callback when the task complete, if the pipeline is synchronous, onComplete is unnecessary.
 * @param {Function} [options.onProgress] - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
 * @param {Function} [options.onError] - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
 * @param {*} options.input - Something will be handled with pipeline
 * @param {*} [options.progress] - Progress information, you may need to assign it manually when multiple pipeline share one progress
 * @param {Object} [options.options] - Custom parameters
 * @returns {Task} task
 * 
 * @typescript 
 * create(options?: {onComplete?: (err: Error, result: any) => void, onError?: () => void, onProgress?: Function, input: any, progress?: any, options?: Record<string, any>}): Task
 */

Task.create = function (options) {
  var out = null;

  if (_deadPool.length !== 0) {
    out = _deadPool.pop();
    out.set(options);
  } else {
    out = new Task(options);
  }

  return out;
};

module.exports = Task;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvdGFzay5qcyJdLCJuYW1lcyI6WyJfdGFza0lkIiwiTUFYX0RFQURfTlVNIiwiX2RlYWRQb29sIiwiVGFzayIsIm9wdGlvbnMiLCJpZCIsIl9pc0ZpbmlzaCIsIm9uQ29tcGxldGUiLCJvblByb2dyZXNzIiwib25FcnJvciIsInNvdXJjZSIsIm91dHB1dCIsImlucHV0IiwicHJvZ3Jlc3MiLCJzZXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIk9iamVjdCIsImNyZWF0ZSIsImRpc3BhdGNoIiwiZXZlbnQiLCJwYXJhbTEiLCJwYXJhbTIiLCJwYXJhbTMiLCJwYXJhbTQiLCJzdHIiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInJlY3ljbGUiLCJsZW5ndGgiLCJwdXNoIiwiaXNGaW5pc2giLCJvdXQiLCJwb3AiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7OztBQUlBLElBQUlBLE9BQU8sR0FBRyxDQUFkO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEdBQW5CO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBRUE7Ozs7Ozs7Ozs7QUFTQSxTQUFTQyxJQUFULENBQWVDLE9BQWYsRUFBd0I7QUFDcEI7Ozs7Ozs7Ozs7QUFVQSxPQUFLQyxFQUFMLEdBQVVMLE9BQU8sRUFBakI7QUFFQSxPQUFLTSxTQUFMLEdBQWlCLElBQWpCO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUVBOzs7Ozs7Ozs7OztBQVVBLE9BQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxPQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUVBOzs7Ozs7Ozs7OztBQVVBLE9BQUtDLE1BQUwsR0FBYyxJQUFkO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0MsTUFBTCxHQUFjLElB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OztBQVVBLE1BQUlDLFFBQUosR0FBZ0I7QUFDWixXQUFPLEtBQUt6QixTQUFaO0FBQ0g7O0FBdklZLENBQWpCO0FBMElBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBSCxJQUFJLENBQUNlLE1BQUwsR0FBYyxVQUFVZCxPQUFWLEVBQW1CO0FBQzdCLE1BQUk0QixHQUFHLEdBQUcsSUFBVjs7QUFDQSxNQUFJOUIsU0FBUyxDQUFDMkIsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUN4QkcsSUFBQUEsR0FBRyxHQUFHOUIsU0FBUyxDQUFDK0IsR0FBVixFQUFOO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ2xCLEdBQUosQ0FBUVYsT0FBUjtBQUNILEdBSEQsTUFJSztBQUNENEIsSUFBQUEsR0FBRyxHQUFHLElBQUk3QixJQUFKLENBQVNDLE9BQVQsQ0FBTjtBQUNIOztBQUVELFNBQU80QixHQUFQO0FBQ0gsQ0FYRDs7QUFhQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEMsSUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqL1xuXG52YXIgX3Rhc2tJZCA9IDA7XG52YXIgTUFYX0RFQURfTlVNID0gNTAwO1xudmFyIF9kZWFkUG9vbCA9IFtdO1xuXG4vKipcbiAqICEjZW5cbiAqIFRhc2sgaXMgdXNlZCB0byBydW4gaW4gdGhlIHBpcGVsaW5lIGZvciBzb21lIGVmZmVjdFxuICogXG4gKiAhI3poXG4gKiDku7vliqHnlKjkuo7lnKjnrqHnur/kuK3ov5DooYzku6Xovr7miJDmn5Dnp43mlYjmnpxcbiAqIFxuICogQGNsYXNzIFRhc2tcbiAqL1xuZnVuY3Rpb24gVGFzayAob3B0aW9ucykge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgaWQgb2YgdGFza1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDku7vliqFpZFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBpZFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5pZCA9IF90YXNrSWQrKztcblxuICAgIHRoaXMuX2lzRmluaXNoID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgY2FsbGJhY2sgd2hlbiB0YXNrIGlzIGNvbXBsZXRlZFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlrozmiJDlm57osINcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgb25Db21wbGV0ZVxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLm9uQ29tcGxldGUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBjYWxsYmFjayBvZiBwcm9ncmVzc2lvblxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDov5vluqblm57osINcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgb25Qcm9ncmVzc1xuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLm9uUHJvZ3Jlc3MgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBjYWxsYmFjayB3aGVuIHNvbWV0aGluZyBnb2VzIHdyb25nXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmUmeivr+Wbnuiwg1xuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBvbkVycm9yXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMub25FcnJvciA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIHNvdXJjZSBvZiB0YXNrXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS7u+WKoeeahOa6kFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VcbiAgICAgKiBAdHlwZSB7Kn1cbiAgICAgKi9cbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIG91dHB1dCBvZiB0YXNrXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS7u+WKoeeahOi+k+WHulxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBvdXRwdXRcbiAgICAgKiBAdHlwZSB7Kn1cbiAgICAgKi9cbiAgICB0aGlzLm91dHB1dCA9IG51bGxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgaW5wdXQgb2YgdGFza1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDku7vliqHnmoTovpPlhaVcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgaW5wdXRcbiAgICAgKiBAdHlwZSB7Kn1cbiAgICAgKi9cbiAgICB0aGlzLmlucHV0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgcHJvZ3Jlc3Npb24gb2YgdGFza1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDku7vliqHnmoTov5vluqZcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgcHJvZ3Jlc3NcbiAgICAgKiBAdHlwZSB7Kn1cbiAgICAgKi9cbiAgICB0aGlzLnByb2dyZXNzID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDdXN0b20gb3B0aW9uc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDoh6rlrprkuYnlj4LmlbBcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9uc1xuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gbnVsbDtcbiAgICB0aGlzLnNldChvcHRpb25zKTtcbn07XG5cblRhc2sucHJvdG90eXBlID0ge1xuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDcmVhdGUgYSBuZXcgVGFza1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliJvlu7rkuIDkuKrku7vliqFcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Db21wbGV0ZV0gLSBDYWxsYmFjayB3aGVuIHRoZSB0YXNrIGlzIGNvbXBsZXRlZCwgaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBvbkNvbXBsZXRlIGlzIHVubmVjZXNzYXJ5LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uUHJvZ3Jlc3NdIC0gQ29udGludW91c2x5IGNhbGxiYWNrIHdoZW4gdGhlIHRhc2sgaXMgcnVuaW5nLCBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIG9uUHJvZ3Jlc3MgaXMgdW5uZWNlc3NhcnkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25FcnJvcl0gLSBDYWxsYmFjayB3aGVuIHNvbWV0aGluZyBnb2VzIHdyb25nLCBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIG9uRXJyb3IgaXMgdW5uZWNlc3NhcnkuXG4gICAgICogQHBhcmFtIHsqfSBvcHRpb25zLmlucHV0IC0gU29tZXRoaW5nIHdpbGwgYmUgaGFuZGxlZCB3aXRoIHBpcGVsaW5lXG4gICAgICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wcm9ncmVzc10gLSBQcm9ncmVzcyBpbmZvcm1hdGlvbiwgeW91IG1heSBuZWVkIHRvIGFzc2lnbiBpdCBtYW51YWxseSB3aGVuIG11bHRpcGxlIHBpcGVsaW5lIHNoYXJlIG9uZSBwcm9ncmVzc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5vcHRpb25zXSAtIEN1c3RvbSBwYXJhbWV0ZXJzXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb25zdHJ1Y3RvcihvcHRpb25zPzoge29uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzdWx0OiBhbnkpID0+IHZvaWQsIG9uRXJyb3I/OiAoKSA9PiB2b2lkLCBvblByb2dyZXNzPzogRnVuY3Rpb24sIGlucHV0OiBhbnksIHByb2dyZXNzPzogYW55LCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Pn0pXG4gICAgICovXG4gICAgY29uc3RydWN0b3I6IFRhc2ssXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0IHBhcmFtdGVycyBvZiB0aGlzIHRhc2tcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6K6+572u5Lu75Yqh55qE5Y+C5pWwXG4gICAgICogXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gdGhlIHRhc2sgY29tcGxldGUsIGlmIHRoZSBwaXBlbGluZSBpcyBzeW5jaHJvbm91cywgb25Db21wbGV0ZSBpcyB1bm5lY2Vzc2FyeS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vblByb2dyZXNzXSAtIENvbnRpbnVvdXNseSBjYWxsYmFjayB3aGVuIHRoZSB0YXNrIGlzIHJ1bmluZywgaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBvblByb2dyZXNzIGlzIHVubmVjZXNzYXJ5LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRXJyb3JdIC0gQ2FsbGJhY2sgd2hlbiBzb21ldGhpbmcgZ29lcyB3cm9uZywgaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBvbkVycm9yIGlzIHVubmVjZXNzYXJ5LlxuICAgICAqIEBwYXJhbSB7Kn0gb3B0aW9ucy5pbnB1dCAtIFNvbWV0aGluZyB3aWxsIGJlIGhhbmRsZWQgd2l0aCBwaXBlbGluZVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMucHJvZ3Jlc3NdIC0gUHJvZ3Jlc3MgaW5mb3JtYXRpb24sIHlvdSBtYXkgbmVlZCB0byBhc3NpZ24gaXQgbWFudWFsbHkgd2hlbiBtdWx0aXBsZSBwaXBlbGluZSBzaGFyZSBvbmUgcHJvZ3Jlc3NcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMub3B0aW9uc10gLSBDdXN0b20gcGFyYW1ldGVyc1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlIFxuICAgICAqIHZhciB0YXNrID0gbmV3IFRhc2soKTtcbiAgICAgKiB0YXNrLnNldCh7aW5wdXQ6IFsndGVzdCddLCBvbkNvbXBsZXRlOiAoZXJyLCByZXN1bHQpID0+IGNvbnNvbGUubG9nKGVyciksIG9uUHJvZ3Jlc3M6IChmaW5pc2gsIHRvdGFsKSA9PiBjb25zb2xlLmxvZyhmaW5pc2ggLyB0b3RhbCl9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNldChvcHRpb25zPzoge29uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzdWx0OiBhbnkpID0+IHZvaWQsIG9uRXJyb3I/OiAoKSA9PiB2b2lkLCBvblByb2dyZXNzPzogRnVuY3Rpb24sIGlucHV0OiBhbnksIHByb2dyZXNzPzogYW55LCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Pn0pOiB2b2lkXG4gICAgICovXG4gICAgc2V0IChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZSA9IG9wdGlvbnMub25Db21wbGV0ZTtcbiAgICAgICAgdGhpcy5vblByb2dyZXNzID0gb3B0aW9ucy5vblByb2dyZXNzO1xuICAgICAgICB0aGlzLm9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3I7XG4gICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5pbnB1dCA9IG9wdGlvbnMuaW5wdXQ7XG4gICAgICAgIHRoaXMub3V0cHV0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IG9wdGlvbnMucHJvZ3Jlc3M7XG4gICAgICAgIC8vIGN1c3RvbSBkYXRhXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRGlzcGF0Y2ggZXZlbnRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Y+R5biD5LqL5Lu2XG4gICAgICogXG4gICAgICogQG1ldGhvZCBkaXNwYXRjaFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbTEgLSBQYXJhbWV0ZXIgMVxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW0yIC0gUGFyYW1ldGVyIDJcbiAgICAgKiBAcGFyYW0geyp9IHBhcmFtMyAtIFBhcmFtZXRlciAzXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbTQgLSBQYXJhbWV0ZXIgNFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHRhc2sgPSBUYXNrLmNyZWF0ZSgpO1xuICAgICAqIFRhc2sub25Db21wbGV0ZSA9IChtc2cpID0+IGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICogVGFzay5kaXNwYXRjaCgnY29tcGxldGUnLCAnaGVsbG8gd29ybGQnKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGRpc3BhdGNoKGV2ZW50OiBzdHJpbmcsIHBhcmFtMT86IGFueSwgcGFyYW0yPzogYW55LCBwYXJhbTM/OiBhbnksIHBhcmFtND86IGFueSk6IHZvaWRcbiAgICAgKi9cbiAgICBkaXNwYXRjaCAoZXZlbnQsIHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMsIHBhcmFtNCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICBjYXNlICdjb21wbGV0ZScgOlxuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZSAmJiB0aGlzLm9uQ29tcGxldGUocGFyYW0xLCBwYXJhbTIsIHBhcmFtMywgcGFyYW00KTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBjYXNlICdwcm9ncmVzcyc6IFxuICAgICAgICAgICAgICAgIHRoaXMub25Qcm9ncmVzcyAmJiB0aGlzLm9uUHJvZ3Jlc3MocGFyYW0xLCBwYXJhbTIsIHBhcmFtMywgcGFyYW00KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzogXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yICYmIHRoaXMub25FcnJvcihwYXJhbTEsIHBhcmFtMiwgcGFyYW0zLCBwYXJhbTQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gJ29uJyArIGV2ZW50WzBdLnRvVXBwZXJDYXNlKCkgKyBldmVudC5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW3N0cl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tzdHJdKHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMsIHBhcmFtNCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWN5Y2xlIHRoaXMgZm9yIHJldXNlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWbnuaUtiB0YXNrIOeUqOS6juWkjeeUqFxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcmVjeWNsZVxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcmVjeWNsZSgpOiB2b2lkXG4gICAgICovXG4gICAgcmVjeWNsZSAoKSB7XG4gICAgICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoID09PSBNQVhfREVBRF9OVU0pIHJldHVybjtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5vblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLm91dHB1dCA9IHRoaXMuaW5wdXQgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbnVsbDtcbiAgICAgICAgX2RlYWRQb29sLnB1c2godGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHRhc2sgaXMgY29tcGxldGVkXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOatpOS7u+WKoeaYr+WQpuW3sue7j+WujOaIkFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBpc0ZpbmlzaFxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIGdldCBpc0ZpbmlzaCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0ZpbmlzaDtcbiAgICB9XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZSBhIG5ldyB0YXNrIGZyb20gcG9vbFxuICogXG4gKiAhI3poXG4gKiDku47lr7nosaHmsaDkuK3liJvlu7ogdGFza1xuICogXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGNyZWF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gdGhlIHRhc2sgY29tcGxldGUsIGlmIHRoZSBwaXBlbGluZSBpcyBzeW5jaHJvbm91cywgb25Db21wbGV0ZSBpcyB1bm5lY2Vzc2FyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uUHJvZ3Jlc3NdIC0gQ29udGludW91c2x5IGNhbGxiYWNrIHdoZW4gdGhlIHRhc2sgaXMgcnVuaW5nLCBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIG9uUHJvZ3Jlc3MgaXMgdW5uZWNlc3NhcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkVycm9yXSAtIENhbGxiYWNrIHdoZW4gc29tZXRoaW5nIGdvZXMgd3JvbmcsIGlmIHRoZSBwaXBlbGluZSBpcyBzeW5jaHJvbm91cywgb25FcnJvciBpcyB1bm5lY2Vzc2FyeS5cbiAqIEBwYXJhbSB7Kn0gb3B0aW9ucy5pbnB1dCAtIFNvbWV0aGluZyB3aWxsIGJlIGhhbmRsZWQgd2l0aCBwaXBlbGluZVxuICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wcm9ncmVzc10gLSBQcm9ncmVzcyBpbmZvcm1hdGlvbiwgeW91IG1heSBuZWVkIHRvIGFzc2lnbiBpdCBtYW51YWxseSB3aGVuIG11bHRpcGxlIHBpcGVsaW5lIHNoYXJlIG9uZSBwcm9ncmVzc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm9wdGlvbnNdIC0gQ3VzdG9tIHBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHtUYXNrfSB0YXNrXG4gKiBcbiAqIEB0eXBlc2NyaXB0IFxuICogY3JlYXRlKG9wdGlvbnM/OiB7b25Db21wbGV0ZT86IChlcnI6IEVycm9yLCByZXN1bHQ6IGFueSkgPT4gdm9pZCwgb25FcnJvcj86ICgpID0+IHZvaWQsIG9uUHJvZ3Jlc3M/OiBGdW5jdGlvbiwgaW5wdXQ6IGFueSwgcHJvZ3Jlc3M/OiBhbnksIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+fSk6IFRhc2tcbiAqL1xuVGFzay5jcmVhdGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBvdXQgPSBudWxsO1xuICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIG91dCA9IF9kZWFkUG9vbC5wb3AoKTtcbiAgICAgICAgb3V0LnNldChvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG91dCA9IG5ldyBUYXNrKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhc2s7Il0sInNvdXJjZVJvb3QiOiIvIn0=