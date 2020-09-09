
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/pipeline.js';
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
var Task = require('./task');

var _pipelineId = 0;
/**
 * !#en
 * Pipeline can execute the task for some effect.
 * 
 * !#zh
 * 管线能执行任务达到某个效果
 * 
 * @class Pipeline
 */

function Pipeline(name, funcs) {
  if (!Array.isArray(funcs)) {
    cc.warn('funcs must be an array');
    return;
  }
  /**
   * !#en
   * The id of pipeline
   * 
   * !#zh
   * 管线的 id
   * 
   * @property id
   * @type {Number}
   */


  this.id = _pipelineId++;
  /**
   * !#en
   * The name of pipeline
   * 
   * !#zh
   * 管线的名字
   * 
   * @property name
   * @type {String}
   */

  this.name = name;
  /**
   * !#en
   * All pipes of pipeline
   * 
   * !#zh
   * 所有的管道
   * 
   * @property pipes
   * @type {Function[]}
   */

  this.pipes = [];

  for (var i = 0, l = funcs.length; i < l; i++) {
    if (typeof funcs[i] === 'function') {
      this.pipes.push(funcs[i]);
    }
  }
}

Pipeline.prototype = {
  /**
   * !#en
   * Create a new pipeline
   * 
   * !#zh
   * 创建一个管线
   * 
   * @method constructor
   * @param {string} name - The name of pipeline
   * @param {Function[]} funcs - The array of pipe, every pipe must be function which take two parameters, the first is a `Task` flowed in pipeline, the second is complete callback
   * 
   * @example
   * var pipeline = new Pipeline('download', [
   * (task, done) => {
   *      var url = task.input;
   *      cc.assetManager.downloader.downloadFile(url, null, null, (err, result) => {
   *          task.output = result;
   *          done(err);
   *      });
   * },
   * (task, done) => {
   *      var text = task.input;
   *      var json = JSON.stringify(text);
   *      task.output = json;
   *      done();
   * }
   * ]);
   * 
   * @typescript
   * constructor(name: string, funcs: Array<(task: Task, done?: (err: Error) => void) => void>)
   */
  constructor: Pipeline,

  /**
   * !#en
   * At specific point insert a new pipe to pipeline
   * 
   * !#zh
   * 在某个特定的点为管线插入一个新的 pipe
   * 
   * @method insert
   * @param {Function} func - The new pipe
   * @param {Task} func.task - The task handled with pipeline will be transferred to this function
   * @param {Function} [func.callback] - Callback you need to invoke manually when this pipe is finished. if the pipeline is synchronous, callback is unnecessary.
   * @param {number} index - The specific point you want to insert at.
   * @return {Pipeline} pipeline
   * 
   * @example
   * var pipeline = new Pipeline('test', []);
   * pipeline.insert((task, done) => {
   *      // do something
   *      done();
   * }, 0);
   * 
   * @typescript
   * insert(func: (task: Task, callback?: (err: Error) => void) => void, index: number): Pipeline
   */
  insert: function insert(func, index) {
    if (typeof func !== 'function' || index > this.pipes.length) {
      cc.warnID(4921);
      return;
    }

    this.pipes.splice(index, 0, func);
    return this;
  },

  /**
   * !#en
   * Append a new pipe to the pipeline
   * 
   * !#zh
   * 添加一个管道到管线中
   * 
   * @method append
   * @param {Function} func - The new pipe
   * @param {Task} func.task - The task handled with pipeline will be transferred to this function
   * @param {Function} [func.callback] - Callback you need to invoke manually when this pipe is finished. if the pipeline is synchronous, callback is unnecessary.
   * @return {Pipeline} pipeline
   * 
   * @example
   * var pipeline = new Pipeline('test', []);
   * pipeline.append((task, done) => {
   *      // do something
   *      done();
   * });
   * 
   * @typescript
   * append(func: (task: Task, callback?: (err: Error) => void) => void): Pipeline
   */
  append: function append(func) {
    if (typeof func !== 'function') {
      return;
    }

    this.pipes.push(func);
    return this;
  },

  /**
   * !#en
   * Remove pipe which at specific point
   * 
   * !#zh
   * 移除特定位置的管道
   * 
   * @method remove
   * @param {number} index - The specific point
   * @return {Pipeline} pipeline
   * 
   * @example
   * var pipeline = new Pipeline('test', (task, done) => {
   *      // do something
   *      done();  
   * });
   * pipeline.remove(0);
   * 
   * @typescript
   * remove(index: number): Pipeline
   */
  remove: function remove(index) {
    if (typeof index !== 'number') {
      return;
    }

    this.pipes.splice(index, 1);
    return this;
  },

  /**
   * !#en
   * Execute task synchronously
   * 
   * !#zh
   * 同步执行任务
   * 
   * @method sync
   * @param {Task} task - The task will be executed
   * @returns {*} result
   * 
   * @example
   * var pipeline = new Pipeline('sync', [(task) => {
   *      let input = task.input;
   *      task.output = doSomething(task.input);
   * }]);
   * 
   * var task = new Task({input: 'test'});
   * console.log(pipeline.sync(task));
   * 
   * @typescript
   * sync(task: Task): any 
   */
  sync: function sync(task) {
    var pipes = this.pipes;
    if (!(task instanceof Task) || pipes.length === 0) return;

    if (task.output != null) {
      task.input = task.output;
      task.output = null;
    }

    task._isFinish = false;

    for (var i = 0, l = pipes.length; i < l;) {
      var pipe = pipes[i];
      var result = pipe(task);

      if (result) {
        task._isFinish = true;
        return result;
      }

      i++;

      if (i !== l) {
        task.input = task.output;
        task.output = null;
      }
    }

    task._isFinish = true;
    return task.output;
  },

  /**
   * !#en
   * Execute task asynchronously
   * 
   * !#zh
   * 异步执行任务
   * 
   * @method async
   * @param {Task} task - The task will be executed
   * 
   * @example
   * var pipeline = new Pipeline('sync', [(task, done) => {
   *      let input = task.input;
   *      task.output = doSomething(task.input);
   *      done();
   * }]);
   * var task = new Task({input: 'test', onComplete: (err, result) => console.log(result)});
   * pipeline.async(task);
   *  
   * @typescript
   * async(task: Task): void
   */
  async: function async(task) {
    var pipes = this.pipes;
    if (!(task instanceof Task) || pipes.length === 0) return;

    if (task.output != null) {
      task.input = task.output;
      task.output = null;
    }

    task._isFinish = false;

    this._flow(0, task);
  },
  _flow: function _flow(index, task) {
    var self = this;
    var pipe = this.pipes[index];
    pipe(task, function (result) {
      if (result) {
        task._isFinish = true;
        task.onComplete && task.onComplete(result);
      } else {
        index++;

        if (index < self.pipes.length) {
          // move output to input
          task.input = task.output;
          task.output = null;

          self._flow(index, task);
        } else {
          task._isFinish = true;
          task.onComplete && task.onComplete(result, task.output);
        }
      }
    });
  }
};
module.exports = Pipeline;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvcGlwZWxpbmUuanMiXSwibmFtZXMiOlsiVGFzayIsInJlcXVpcmUiLCJfcGlwZWxpbmVJZCIsIlBpcGVsaW5lIiwibmFtZSIsImZ1bmNzIiwiQXJyYXkiLCJpc0FycmF5IiwiY2MiLCJ3YXJuIiwiaWQiLCJwaXBlcyIsImkiLCJsIiwibGVuZ3RoIiwicHVzaCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiaW5zZXJ0IiwiZnVuYyIsImluZGV4Iiwid2FybklEIiwic3BsaWNlIiwiYXBwZW5kIiwicmVtb3ZlIiwic3luYyIsInRhc2siLCJvdXRwdXQiLCJpbnB1dCIsIl9pc0ZpbmlzaCIsInBpcGUiLCJyZXN1bHQiLCJhc3luYyIsIl9mbG93Iiwic2VsZiIsIm9uQ29tcGxldGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7OztBQUlBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBRUEsSUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0E7Ozs7Ozs7Ozs7QUFTQSxTQUFTQyxRQUFULENBQW1CQyxJQUFuQixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDNUIsTUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBZCxDQUFMLEVBQTJCO0FBQ3ZCRyxJQUFBQSxFQUFFLENBQUNDLElBQUgsQ0FBUSx3QkFBUjtBQUNBO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0MsRUFBTCxHQUFVUixXQUFXLEVBQXJCO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS0UsSUFBTCxHQUFZQSxJQUFaO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsT0FBS08sS0FBTCxHQUFhLEVBQWI7O0FBRUEsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdSLEtBQUssQ0FB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bEI7QUFDQUQsVUFBQUEsSUFBSSxDQUFDQyxNQUFMLEdBQWMsSUFBZDs7QUFDQU8sVUFBQUEsSUFBSSxDQUFDRCxLQUFMLENBQVdiLEtBQVgsRUFBa0JNLElBQWxCO0FBQ0gsU0FMRCxNQU1LO0FBQ0RBLFVBQUFBLElBQUksQ0FBQ0csU0FBTCxHQUFpQixJQUFqQjtBQUNBSCxVQUFBQSxJQUFJLENBQUNTLFVBQUwsSUFBbUJULElBQUksQ0FBQ1MsVUFBTCxDQUFnQkosTUFBaEIsRUFBd0JMLElBQUksQ0FBQ0MsTUFBN0IsQ0FBbkI7QUFDSDtBQUNKO0FBQ0osS0FsQkcsQ0FBSjtBQW1CSDtBQTVPZ0IsQ0FBckI7QUErT0FTLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxDLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxuICovXG5cbmNvbnN0IFRhc2sgPSByZXF1aXJlKCcuL3Rhc2snKTtcblxudmFyIF9waXBlbGluZUlkID0gMDtcbi8qKlxuICogISNlblxuICogUGlwZWxpbmUgY2FuIGV4ZWN1dGUgdGhlIHRhc2sgZm9yIHNvbWUgZWZmZWN0LlxuICogXG4gKiAhI3poXG4gKiDnrqHnur/og73miafooYzku7vliqHovr7liLDmn5DkuKrmlYjmnpxcbiAqIFxuICogQGNsYXNzIFBpcGVsaW5lXG4gKi9cbmZ1bmN0aW9uIFBpcGVsaW5lIChuYW1lLCBmdW5jcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShmdW5jcykpIHtcbiAgICAgICAgY2Mud2FybignZnVuY3MgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgICByZXR1cm47XG4gICAgfSBcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGlkIG9mIHBpcGVsaW5lXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOeuoee6v+eahCBpZFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBpZFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5pZCA9IF9waXBlbGluZUlkKys7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIG5hbWUgb2YgcGlwZWxpbmVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog566h57q/55qE5ZCN5a2XXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IG5hbWVcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWxsIHBpcGVzIG9mIHBpcGVsaW5lXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOaJgOacieeahOeuoemBk1xuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBwaXBlc1xuICAgICAqIEB0eXBlIHtGdW5jdGlvbltdfVxuICAgICAqL1xuICAgIHRoaXMucGlwZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZnVuY3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZnVuY3NbaV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucGlwZXMucHVzaChmdW5jc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuUGlwZWxpbmUucHJvdG90eXBlID0ge1xuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ3JlYXRlIGEgbmV3IHBpcGVsaW5lXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWIm+W7uuS4gOS4queuoee6v1xuICAgICAqIFxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHBpcGVsaW5lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBmdW5jcyAtIFRoZSBhcnJheSBvZiBwaXBlLCBldmVyeSBwaXBlIG11c3QgYmUgZnVuY3Rpb24gd2hpY2ggdGFrZSB0d28gcGFyYW1ldGVycywgdGhlIGZpcnN0IGlzIGEgYFRhc2tgIGZsb3dlZCBpbiBwaXBlbGluZSwgdGhlIHNlY29uZCBpcyBjb21wbGV0ZSBjYWxsYmFja1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCdkb3dubG9hZCcsIFtcbiAgICAgKiAodGFzaywgZG9uZSkgPT4ge1xuICAgICAqICAgICAgdmFyIHVybCA9IHRhc2suaW5wdXQ7XG4gICAgICogICAgICBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5kb3dubG9hZEZpbGUodXJsLCBudWxsLCBudWxsLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgKiAgICAgICAgICB0YXNrLm91dHB1dCA9IHJlc3VsdDtcbiAgICAgKiAgICAgICAgICBkb25lKGVycik7XG4gICAgICogICAgICB9KTtcbiAgICAgKiB9LFxuICAgICAqICh0YXNrLCBkb25lKSA9PiB7XG4gICAgICogICAgICB2YXIgdGV4dCA9IHRhc2suaW5wdXQ7XG4gICAgICogICAgICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHRleHQpO1xuICAgICAqICAgICAgdGFzay5vdXRwdXQgPSBqc29uO1xuICAgICAqICAgICAgZG9uZSgpO1xuICAgICAqIH1cbiAgICAgKiBdKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZnVuY3M6IEFycmF5PCh0YXNrOiBUYXNrLCBkb25lPzogKGVycjogRXJyb3IpID0+IHZvaWQpID0+IHZvaWQ+KVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yOiBQaXBlbGluZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBdCBzcGVjaWZpYyBwb2ludCBpbnNlcnQgYSBuZXcgcGlwZSB0byBwaXBlbGluZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlnKjmn5DkuKrnibnlrprnmoTngrnkuLrnrqHnur/mj5LlhaXkuIDkuKrmlrDnmoQgcGlwZVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgaW5zZXJ0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBuZXcgcGlwZVxuICAgICAqIEBwYXJhbSB7VGFza30gZnVuYy50YXNrIC0gVGhlIHRhc2sgaGFuZGxlZCB3aXRoIHBpcGVsaW5lIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gdGhpcyBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtmdW5jLmNhbGxiYWNrXSAtIENhbGxiYWNrIHlvdSBuZWVkIHRvIGludm9rZSBtYW51YWxseSB3aGVuIHRoaXMgcGlwZSBpcyBmaW5pc2hlZC4gaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBjYWxsYmFjayBpcyB1bm5lY2Vzc2FyeS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgc3BlY2lmaWMgcG9pbnQgeW91IHdhbnQgdG8gaW5zZXJ0IGF0LlxuICAgICAqIEByZXR1cm4ge1BpcGVsaW5lfSBwaXBlbGluZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCd0ZXN0JywgW10pO1xuICAgICAqIHBpcGVsaW5lLmluc2VydCgodGFzaywgZG9uZSkgPT4ge1xuICAgICAqICAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogICAgICBkb25lKCk7XG4gICAgICogfSwgMCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbnNlcnQoZnVuYzogKHRhc2s6IFRhc2ssIGNhbGxiYWNrPzogKGVycjogRXJyb3IpID0+IHZvaWQpID0+IHZvaWQsIGluZGV4OiBudW1iZXIpOiBQaXBlbGluZVxuICAgICAqL1xuICAgIGluc2VydCAoZnVuYywgaW5kZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nIHx8IGluZGV4ID4gdGhpcy5waXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCg0OTIxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLnBpcGVzLnNwbGljZShpbmRleCwgMCwgZnVuYyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBlbmQgYSBuZXcgcGlwZSB0byB0aGUgcGlwZWxpbmVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq566h6YGT5Yiw566h57q/5LitXG4gICAgICogXG4gICAgICogQG1ldGhvZCBhcHBlbmRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIG5ldyBwaXBlXG4gICAgICogQHBhcmFtIHtUYXNrfSBmdW5jLnRhc2sgLSBUaGUgdGFzayBoYW5kbGVkIHdpdGggcGlwZWxpbmUgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byB0aGlzIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2Z1bmMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgeW91IG5lZWQgdG8gaW52b2tlIG1hbnVhbGx5IHdoZW4gdGhpcyBwaXBlIGlzIGZpbmlzaGVkLiBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIGNhbGxiYWNrIGlzIHVubmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm4ge1BpcGVsaW5lfSBwaXBlbGluZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCd0ZXN0JywgW10pO1xuICAgICAqIHBpcGVsaW5lLmFwcGVuZCgodGFzaywgZG9uZSkgPT4ge1xuICAgICAqICAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogICAgICBkb25lKCk7XG4gICAgICogfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhcHBlbmQoZnVuYzogKHRhc2s6IFRhc2ssIGNhbGxiYWNrPzogKGVycjogRXJyb3IpID0+IHZvaWQpID0+IHZvaWQpOiBQaXBlbGluZVxuICAgICAqL1xuICAgIGFwcGVuZCAoZnVuYykge1xuICAgICAgICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLnBpcGVzLnB1c2goZnVuYyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlIHBpcGUgd2hpY2ggYXQgc3BlY2lmaWMgcG9pbnRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog56e76Zmk54m55a6a5L2N572u55qE566h6YGTXG4gICAgICogXG4gICAgICogQG1ldGhvZCByZW1vdmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgc3BlY2lmaWMgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtQaXBlbGluZX0gcGlwZWxpbmVcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwaXBlbGluZSA9IG5ldyBQaXBlbGluZSgndGVzdCcsICh0YXNrLCBkb25lKSA9PiB7XG4gICAgICogICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiAgICAgIGRvbmUoKTsgIFxuICAgICAqIH0pO1xuICAgICAqIHBpcGVsaW5lLnJlbW92ZSgwKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlbW92ZShpbmRleDogbnVtYmVyKTogUGlwZWxpbmVcbiAgICAgKi9cbiAgICByZW1vdmUgKGluZGV4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdGhpcy5waXBlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEV4ZWN1dGUgdGFzayBzeW5jaHJvbm91c2x5XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWQjOatpeaJp+ihjOS7u+WKoVxuICAgICAqIFxuICAgICAqIEBtZXRob2Qgc3luY1xuICAgICAqIEBwYXJhbSB7VGFza30gdGFzayAtIFRoZSB0YXNrIHdpbGwgYmUgZXhlY3V0ZWRcbiAgICAgKiBAcmV0dXJucyB7Kn0gcmVzdWx0XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUoJ3N5bmMnLCBbKHRhc2spID0+IHtcbiAgICAgKiAgICAgIGxldCBpbnB1dCA9IHRhc2suaW5wdXQ7XG4gICAgICogICAgICB0YXNrLm91dHB1dCA9IGRvU29tZXRoaW5nKHRhc2suaW5wdXQpO1xuICAgICAqIH1dKTtcbiAgICAgKiBcbiAgICAgKiB2YXIgdGFzayA9IG5ldyBUYXNrKHtpbnB1dDogJ3Rlc3QnfSk7XG4gICAgICogY29uc29sZS5sb2cocGlwZWxpbmUuc3luYyh0YXNrKSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzeW5jKHRhc2s6IFRhc2spOiBhbnkgXG4gICAgICovXG4gICAgc3luYyAodGFzaykge1xuICAgICAgICB2YXIgcGlwZXMgPSB0aGlzLnBpcGVzO1xuICAgICAgICBpZiAoISh0YXNrIGluc3RhbmNlb2YgVGFzaykgfHwgcGlwZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGlmICh0YXNrLm91dHB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0YXNrLmlucHV0ID0gdGFzay5vdXRwdXQ7XG4gICAgICAgICAgICB0YXNrLm91dHB1dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGFzay5faXNGaW5pc2ggPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwaXBlcy5sZW5ndGg7IGkgPCBsOykge1xuICAgICAgICAgICAgdmFyIHBpcGUgPSBwaXBlc1tpXTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwaXBlKHRhc2spO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRhc2suX2lzRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaWYgKGkgIT09IGwpIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlucHV0ID0gdGFzay5vdXRwdXQ7XG4gICAgICAgICAgICAgICAgdGFzay5vdXRwdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRhc2suX2lzRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRhc2sub3V0cHV0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRXhlY3V0ZSB0YXNrIGFzeW5jaHJvbm91c2x5XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOW8guatpeaJp+ihjOS7u+WKoVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgYXN5bmNcbiAgICAgKiBAcGFyYW0ge1Rhc2t9IHRhc2sgLSBUaGUgdGFzayB3aWxsIGJlIGV4ZWN1dGVkXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUoJ3N5bmMnLCBbKHRhc2ssIGRvbmUpID0+IHtcbiAgICAgKiAgICAgIGxldCBpbnB1dCA9IHRhc2suaW5wdXQ7XG4gICAgICogICAgICB0YXNrLm91dHB1dCA9IGRvU29tZXRoaW5nKHRhc2suaW5wdXQpO1xuICAgICAqICAgICAgZG9uZSgpO1xuICAgICAqIH1dKTtcbiAgICAgKiB2YXIgdGFzayA9IG5ldyBUYXNrKHtpbnB1dDogJ3Rlc3QnLCBvbkNvbXBsZXRlOiAoZXJyLCByZXN1bHQpID0+IGNvbnNvbGUubG9nKHJlc3VsdCl9KTtcbiAgICAgKiBwaXBlbGluZS5hc3luYyh0YXNrKTtcbiAgICAgKiAgXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhc3luYyh0YXNrOiBUYXNrKTogdm9pZFxuICAgICAqL1xuICAgIGFzeW5jICh0YXNrKSB7XG4gICAgICAgIHZhciBwaXBlcyA9IHRoaXMucGlwZXM7XG4gICAgICAgIGlmICghKHRhc2sgaW5zdGFuY2VvZiBUYXNrKSB8fCBwaXBlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgaWYgKHRhc2sub3V0cHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRhc2suaW5wdXQgPSB0YXNrLm91dHB1dDtcbiAgICAgICAgICAgIHRhc2sub3V0cHV0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9mbG93KDAsIHRhc2spO1xuICAgIH0sXG5cbiAgICBfZmxvdyAoaW5kZXgsIHRhc2spIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcGlwZSA9IHRoaXMucGlwZXNbaW5kZXhdO1xuICAgICAgICBwaXBlKHRhc2ssIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGFzay5vbkNvbXBsZXRlICYmIHRhc2sub25Db21wbGV0ZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzZWxmLnBpcGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIG91dHB1dCB0byBpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0YXNrLmlucHV0ID0gdGFzay5vdXRwdXQ7XG4gICAgICAgICAgICAgICAgICAgIHRhc2sub3V0cHV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmxvdyhpbmRleCwgdGFzayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRhc2sub25Db21wbGV0ZSAmJiB0YXNrLm9uQ29tcGxldGUocmVzdWx0LCB0YXNrLm91dHB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBpcGVsaW5lO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=