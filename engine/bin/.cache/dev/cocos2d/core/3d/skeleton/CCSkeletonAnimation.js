
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/CCSkeletonAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var Animation = require('../../components/CCAnimation');

var Model = require('../CCModel');

var SkeletonAnimationClip = require('./CCSkeletonAnimationClip');
/**
 * @module cc
 */

/**
 * !#en .
 * !#zh 。
 * @class SkeletonAnimation
 * @extends Animation
 */


var SkeletonAnimation = cc.Class({
  name: 'cc.SkeletonAnimation',
  "extends": Animation,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/skeleton-animation.js',
    menu: 'i18n:MAIN_MENU.component.others/Skeleton Animation'
  },
  properties: {
    _model: {
      "default": null,
      type: Model
    },
    _defaultClip: {
      override: true,
      "default": null,
      type: SkeletonAnimationClip
    },
    _clips: {
      override: true,
      "default": [],
      type: [SkeletonAnimationClip],
      visible: true
    },
    defaultClip: {
      override: true,
      get: function get() {
        return this._defaultClip;
      },
      set: function set(v) {
        this._defaultClip = v;
      },
      type: SkeletonAnimationClip
    },
    model: {
      get: function get() {
        return this._model;
      },
      set: function set(val) {
        this._model = val;

        this._updateClipModel();
      },
      type: Model
    }
  },
  __preload: function __preload() {
    this._updateClipModel();
  },
  _updateClipModel: function _updateClipModel() {
    if (this._defaultClip) {
      this._defaultClip._model = this._model;
    }

    var clips = this._clips;

    for (var i = 0; i < clips.length; i++) {
      clips[i]._model = this._model;
    }
  },
  addClip: function addClip(clip, newName) {
    clip._model = this._model;
    return Animation.prototype.addClip.call(this, clip, newName);
  },
  searchClips: CC_EDITOR && function () {
    if (!this._model) {
      cc.warn('There was no model provided.');
      return;
    }

    this._clips.length = 0;
    var self = this;
    Editor.assetdb.queryPathByUuid(this._model._uuid, function (err, modelPath) {
      if (err) return console.error(err);

      var Path = require('fire-path');

      var queryPath = Path.relative(Editor.remote.Project.path, modelPath);
      queryPath = Path.join(Path.dirname(queryPath), Path.basenameNoExt(queryPath));
      queryPath = "db://" + queryPath + "*/*.sac";
      Editor.assetdb.queryAssets(queryPath, null, function (err, results) {
        if (results) {
          for (var i = 0; i < results.length; i++) {
            var clip = new SkeletonAnimationClip();
            clip._uuid = results[i].uuid;

            self._clips.push(clip);
          }

          self._defaultClip = self._clips[0];
        }
      });
    });
  }
});
cc.SkeletonAnimation = module.exports = SkeletonAnimation;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3NrZWxldG9uL0NDU2tlbGV0b25BbmltYXRpb24uanMiXSwibmFtZXMiOlsiQW5pbWF0aW9uIiwicmVxdWlyZSIsIk1vZGVsIiwiU2tlbGV0b25BbmltYXRpb25DbGlwIiwiU2tlbGV0b25BbmltYXRpb24iLCJjYyIsIkNsYXNzIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsImluc3BlY3RvciIsIm1lbnUiLCJwcm9wZXJ0aWVzIiwiX21vZGVsIiwidHlwZSIsIl9kZWZhdWx0Q2xpcCIsIm92ZXJyaWRlIiwiX2NsaXBzIiwidmlzaWJsZSIsImRlZmF1bHRDbGlwIiwiZ2V0Iiwic2V0IiwidiIsIm1vZGVsIiwidmFsIiwiX3VwZGF0ZUNsaXBNb2RlbCIsIl9fcHJlbG9hZCIsImNsaXBzIiwiaSIsImxlbmd0aCIsImFkZENsaXAiLCJjbGlwIiwibmV3TmFtZSIsInByb3RvdHlwZSIsImNhbGwiLCJzZWFyY2hDbGlwcyIsIndhcm4iLCJzZWxmIiwiRWRpdG9yIiwiYXNzZXRkYiIsInF1ZXJ5UGF0aEJ5VXVpZCIsIl91dWlkIiwiZXJyIiwibW9kZWxQYXRoIiwiY29uc29sZSIsImVycm9yIiwiUGF0aCIsInF1ZXJ5UGF0aCIsInJlbGF0aXZlIiwicmVtb3RlIiwiUHJvamVjdCIsInBhdGgiLCJqb2luIiwiZGlybmFtZSIsImJhc2VuYW1lTm9FeHQiLCJxdWVyeUFzc2V0cyIsInJlc3VsdHMiLCJ1dWlkIiwicHVzaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLDhCQUFELENBQXpCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDLFlBQUQsQ0FBckI7O0FBQ0EsSUFBTUUscUJBQXFCLEdBQUdGLE9BQU8sQ0FBQywyQkFBRCxDQUFyQztBQUVBOzs7O0FB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QUFxR0FaLEVBQUUsQ0FBQ0QsaUJBQUgsR0FBdUJ1RCxNQUFNLENBQUNDLE9BQVAsR0FBaUJ4RCxpQkFBeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEFuaW1hdGlvbiA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvQ0NBbmltYXRpb24nKTtcbmNvbnN0IE1vZGVsID0gcmVxdWlyZSgnLi4vQ0NNb2RlbCcpO1xuY29uc3QgU2tlbGV0b25BbmltYXRpb25DbGlwID0gcmVxdWlyZSgnLi9DQ1NrZWxldG9uQW5pbWF0aW9uQ2xpcCcpO1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuLyoqXG4gKiAhI2VuIC5cbiAqICEjemgg44CCXG4gKiBAY2xhc3MgU2tlbGV0b25BbmltYXRpb25cbiAqIEBleHRlbmRzIEFuaW1hdGlvblxuICovXG5sZXQgU2tlbGV0b25BbmltYXRpb24gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNrZWxldG9uQW5pbWF0aW9uJyxcbiAgICBleHRlbmRzOiBBbmltYXRpb24sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc2tlbGV0b24tYW5pbWF0aW9uLmpzJyxcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5vdGhlcnMvU2tlbGV0b24gQW5pbWF0aW9uJyxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbW9kZWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBNb2RlbFxuICAgICAgICB9LFxuXG4gICAgICAgIF9kZWZhdWx0Q2xpcDoge1xuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogU2tlbGV0b25BbmltYXRpb25DbGlwLFxuICAgICAgICB9LFxuXG4gICAgICAgIF9jbGlwczoge1xuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtTa2VsZXRvbkFuaW1hdGlvbkNsaXBdLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0Q2xpcDoge1xuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q2xpcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWZhdWx0Q2xpcCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogU2tlbGV0b25BbmltYXRpb25DbGlwLFxuICAgICAgICB9LFxuXG4gICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNsaXBNb2RlbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IE1vZGVsLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBfX3ByZWxvYWQgKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVDbGlwTW9kZWwoKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUNsaXBNb2RlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Q2xpcCkge1xuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENsaXAuX21vZGVsID0gdGhpcy5fbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBjbGlwcyA9IHRoaXMuX2NsaXBzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjbGlwc1tpXS5fbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRDbGlwIChjbGlwLCBuZXdOYW1lKSB7XG4gICAgICAgIGNsaXAuX21vZGVsID0gdGhpcy5fbW9kZWw7XG4gICAgICAgIHJldHVybiBBbmltYXRpb24ucHJvdG90eXBlLmFkZENsaXAuY2FsbCh0aGlzLCBjbGlwLCBuZXdOYW1lKTtcbiAgICB9LFxuXG4gICAgc2VhcmNoQ2xpcHM6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIGNjLndhcm4oJ1RoZXJlIHdhcyBubyBtb2RlbCBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NsaXBzLmxlbmd0aCA9IDA7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgRWRpdG9yLmFzc2V0ZGIucXVlcnlQYXRoQnlVdWlkKHRoaXMuX21vZGVsLl91dWlkLCBmdW5jdGlvbiAoZXJyLCBtb2RlbFBhdGgpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IFBhdGggPSByZXF1aXJlKCdmaXJlLXBhdGgnKTtcbiAgICAgICAgICAgIGxldCBxdWVyeVBhdGggPSBQYXRoLnJlbGF0aXZlKEVkaXRvci5yZW1vdGUuUHJvamVjdC5wYXRoLCBtb2RlbFBhdGgpO1xuICAgICAgICAgICAgcXVlcnlQYXRoID0gUGF0aC5qb2luKFBhdGguZGlybmFtZShxdWVyeVBhdGgpLCBQYXRoLmJhc2VuYW1lTm9FeHQocXVlcnlQYXRoKSk7XG4gICAgICAgICAgICBxdWVyeVBhdGggPSBgZGI6Ly8ke3F1ZXJ5UGF0aH0qLyouc2FjYDtcblxuICAgICAgICAgICAgRWRpdG9yLmFzc2V0ZGIucXVlcnlBc3NldHMocXVlcnlQYXRoLCBudWxsLCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xpcCA9IG5ldyBTa2VsZXRvbkFuaW1hdGlvbkNsaXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaXAuX3V1aWQgPSByZXN1bHRzW2ldLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jbGlwcy5wdXNoKGNsaXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2RlZmF1bHRDbGlwID0gc2VsZi5fY2xpcHNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5jYy5Ta2VsZXRvbkFuaW1hdGlvbiA9IG1vZHVsZS5leHBvcnRzID0gU2tlbGV0b25BbmltYXRpb247XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==