
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCToggle.js';
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
var GraySpriteState = require('../utils/gray-sprite-state');
/**
 * !#en The toggle component is a CheckBox, when it used together with a ToggleGroup, it
 * could be treated as a RadioButton.
 * !#zh Toggle 是一个 CheckBox，当它和 ToggleGroup 一起使用的时候，可以变成 RadioButton。
 * @class Toggle
 * @extends Button
 * @uses GraySpriteState
 */


var Toggle = cc.Class({
  name: 'cc.Toggle',
  "extends": require('./CCButton'),
  mixins: [GraySpriteState],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Toggle',
    help: 'i18n:COMPONENT.help_url.toggle',
    inspector: 'packages://inspector/inspectors/comps/toggle.js'
  },
  properties: {
    /**
     * !#en When this value is true, the check mark component will be enabled, otherwise
     * the check mark component will be disabled.
     * !#zh 如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。
     * @property {Boolean} isChecked
     */
    _N$isChecked: true,
    isChecked: {
      get: function get() {
        return this._N$isChecked;
      },
      set: function set(value) {
        if (value === this._N$isChecked) {
          return;
        }

        var group = this.toggleGroup || this._toggleContainer;

        if (group && group.enabled && this._N$isChecked) {
          if (!group.allowSwitchOff) {
            return;
          }
        }

        this._N$isChecked = value;

        this._updateCheckMark();

        if (group && group.enabled) {
          group.updateToggles(this);
        }

        if (cc.Toggle._triggerEventInScript_isChecked) {
          this._emitToggleEvents();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle.isChecked'
    },

    /**
     * !#en The toggle group which the toggle belongs to, when it is null, the toggle is a CheckBox.
     * Otherwise, the toggle is a RadioButton.
     * !#zh Toggle 所属的 ToggleGroup，这个属性是可选的。如果这个属性为 null，则 Toggle 是一个 CheckBox，
     * 否则，Toggle 是一个 RadioButton。
     * @property {ToggleGroup} toggleGroup
     */
    toggleGroup: {
      "default": null,
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle.toggleGroup',
      type: require('./CCToggleGroup')
    },

    /**
     * !#en The image used for the checkmark.
     * !#zh Toggle 处于选中状态时显示的图片
     * @property {Sprite} checkMark
     */
    checkMark: {
      "default": null,
      type: cc.Sprite,
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle.checkMark'
    },

    /**
     * !#en If Toggle is clicked, it will trigger event's handler
     * !#zh Toggle 按钮的点击事件列表。
     * @property {Component.EventHandler[]} checkEvents
     */
    checkEvents: {
      "default": [],
      type: cc.Component.EventHandler
    },
    _resizeToTarget: {
      animatable: false,
      set: function set(value) {
        if (value) {
          this._resizeNodeToTargetNode();
        }
      }
    }
  },
  statics: {
    _triggerEventInScript_check: false,
    _triggerEventInScript_isChecked: false
  },
  onEnable: function onEnable() {
    this._super();

    if (!CC_EDITOR) {
      this._registerToggleEvent();
    }

    if (this.toggleGroup && this.toggleGroup.enabledInHierarchy) {
      this.toggleGroup.addToggle(this);
    }
  },
  onDisable: function onDisable() {
    this._super();

    if (!CC_EDITOR) {
      this._unregisterToggleEvent();
    }

    if (this.toggleGroup && this.toggleGroup.enabledInHierarchy) {
      this.toggleGroup.removeToggle(this);
    }
  },
  _hideCheckMark: function _hideCheckMark() {
    this._N$isChecked = false;

    this._updateCheckMark();
  },
  toggle: function toggle(event) {
    this.isChecked = !this.isChecked;

    if (!cc.Toggle._triggerEventInScript_isChecked && (cc.Toggle._triggerEventInScript_check || event)) {
      this._emitToggleEvents();
    }
  },

  /**
   * !#en Make the toggle button checked.
   * !#zh 使 toggle 按钮处于选中状态
   * @method check
   */
  check: function check() {
    this.isChecked = true;

    if (!cc.Toggle._triggerEventInScript_isChecked && cc.Toggle._triggerEventInScript_check) {
      this._emitToggleEvents();
    }
  },

  /**
   * !#en Make the toggle button unchecked.
   * !#zh 使 toggle 按钮处于未选中状态
   * @method uncheck
   */
  uncheck: function uncheck() {
    this.isChecked = false;

    if (!cc.Toggle._triggerEventInScript_isChecked && cc.Toggle._triggerEventInScript_check) {
      this._emitToggleEvents();
    }
  },
  _updateCheckMark: function _updateCheckMark() {
    if (this.checkMark) {
      this.checkMark.node.active = !!this.isChecked;
    }
  },
  _updateDisabledState: function _updateDisabledState() {
    this._super();

    if (this.enableAutoGrayEffect && this.checkMark) {
      var useGrayMaterial = !this.interactable;

      this._switchGrayMaterial(useGrayMaterial, this.checkMark);
    }
  },
  _registerToggleEvent: function _registerToggleEvent() {
    this.node.on('click', this.toggle, this);
  },
  _unregisterToggleEvent: function _unregisterToggleEvent() {
    this.node.off('click', this.toggle, this);
  },
  _emitToggleEvents: function _emitToggleEvents() {
    this.node.emit('toggle', this);

    if (this.checkEvents) {
      cc.Component.EventHandler.emitEvents(this.checkEvents, this);
    }
  }
});
cc.Toggle = module.exports = Toggle;

var js = require('../platform/js');

js.get(Toggle.prototype, '_toggleContainer', function () {
  var parent = this.node.parent;

  if (cc.Node.isNode(parent)) {
    return parent.getComponent(cc.ToggleContainer);
  }

  return null;
});
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event toggle
 * @param {Event.EventCustom} event
 * @param {Toggle} toggle - The Toggle component.
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NUb2dnbGUuanMiXSwibmFtZXMiOlsiR3JheVNwcml0ZVN0YXRlIiwicmVxdWlyZSIsIlRvZ2dsZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJwcm9wZXJ0aWVzIiwiX04kaXNDaGVja2VkIiwiaXNDaGVja2VkIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJncm91cCIsInRvZ2dsZUdyb3VwIiwiX3RvZ2dsZUNvbnRhaW5lciIsImVuYWJsZWQiLCJhbGxvd1N3aXRjaE9mZiIsIl91cGRhdGVDaGVja01hcmsiLCJ1cGRhdGVUb2dnbGVzIiwiX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCIsIl9lbWl0VG9nZ2xlRXZlbnRzIiwidG9vbHRpcCIsIkNDX0RFViIsInR5cGUiLCJjaGVja01hcmsiLCJTcHJpdGUiLCJjaGVja0V2ZW50cyIsIkNvbXBvbmVudCIsIkV2ZW50SGFuZGxlciIsIl9yZXNpemVUb1RhcmdldCIsImFuaW1hdGFibGUiLCJfcmVzaXplTm9kZVRvVGFyZ2V0Tm9kZSIsInN0YXRpY3MiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2siLCJvbkVuYWJsZSIsIl9zdXBlciIsIl9yZWdpc3RlclRvZ2dsZUV2ZW50IiwiZW5hYmxlZEluSGllcmFyY2h5IiwiYWRkVG9nZ2xlIiwib25EaXNhYmxlIiwiX3VucmVnaXN0ZXJUb2dnbGVFdmVudCIsInJlbW92ZVRvZ2dsZSIsIl9oaWRlQ2hlY2tNYXJrIiwidG9nZ2xlIiwiZXZlbnQiLCJjaGVjayIsInVuY2hlY2siLCJub2RlIiwiYWN0aXZlIiwiX3VwZGF0ZURpc2FibGVkU3RhdGUiLCJlbmFibGVBdXRvR3JheUVmZmVjdCIsInVzZUdyYXlNYXRlcmlhbCIsImludGVyYWN0YWJsZSIsIl9zd2l0Y2hHcmF5TWF0ZXJpYWwiLCJvbiIsIm9mZiIsImVtaXQiLCJlbWl0RXZlbnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsImpzIiwicHJvdG90eXBlIiwicGFyZW50IiwiTm9kZSIsImlzTm9kZSIsImdldENvbXBvbmVudCIsIlRvZ2dsZUNvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLDRCQUFELENBQS9CO0FBRUE7Ozs7Ozs7Ozs7QUFRQSxJQUFJQyxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2xCQyxFQUFBQSxJQUFJLEVBQUUsV0FEWTtBQUVsQixhQUFTSixPQUFPLENBQUMsWUFBRCxDQUZFO0FBR2xCSyxFQUFBQSxNQUFNLEVBQUUsQ0FBQ04sZUFBRCxDQUhVO0FBSWxCTyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLG9DQURXO0FBRWpCQyxJQUFBQSxJQUFJLEVBQUUsZ0NBRlc7QUFHakJDLElBQUFBLFNBQVMsRUFBRTtBQUhNLEdBSkg7QUFVbEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSOzs7Ozs7QUFNQUMsSUFBQUEsWUFBWSxFQUFFLElBUE47QUFRUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLRixZQUFaO0FBQ0gsT0FITTtBQUlQRyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixZQUFJQSxLQUFLLEtBQUssS0FBS0osWUFBbkIsRUFBaUM7QUFDN0I7QUFDSDs7QUFFRCxZQUFJSyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxJQUFvQixLQUFLQyxnQkFBckM7O0FBQ0EsWUFBSUYsS0FBSyxJQUFJQSxLQUFLLENBQUNHLE9BQWYsSUFBMEIsS0FBS1IsWUFBbkMsRUFBaUQ7QUFDN0MsY0FBSSxDQUFDSyxLQUFLLENBQUNJLGNBQVgsRUFBMkI7QUFDdkI7QUFDSDtBQUVK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QUF6Qjs7QUFDQSxRQUFJLEtBQUs5QixXQUFULEVBQXNCO0FBQ2xCN0IsTUFBQUEsRUFBRSxDQUFDOEIsU0FBSCxDQUFhQyxZQUFiLENBQTBCNkIsVUFBMUIsQ0FBcUMsS0FBSy9CLFdBQTFDLEVBQXVELElBQXZEO0FBQ0g7QUFDSjtBQXZMaUIsQ0FBVCxDQUFiO0FBMkxBN0IsRUFBRSxDQUFDRCxNQUFILEdBQVk4RCxNQUFNLENBQUNDLE9BQVAsR0FBaUIvRCxNQUE3Qjs7QUFFQSxJQUFNZ0UsRUFBRSxHQUFHakUsT0FBTyxDQUFDLGdCQUFELENBQWxCOztBQUVBaUUsRUFBRSxDQUFDbkQsR0FBSCxDQUFPYixNQUFNLENBQUNpRSxTQUFkLEVBQXlCLGtCQUF6QixFQUNJLFlBQVk7QUFDUixNQUFJQyxNQUFNLEdBQUcsS0FBS2YsSUFBTCxDQUFVZSxNQUF2Qjs7QUFDQSxNQUFJakUsRUFBRSxDQUFDa0UsSUFBSCxDQUFRQyxNQUFSLENBQWVGLE1BQWYsQ0FBSixFQUE0QjtBQUN4QixXQUFPQSxNQUFNLENBQUNHLFlBQVAsQ0FBb0JwRSxFQUFFLENBQUNxRSxlQUF2QixDQUFQO0FBQ0g7O0FBQ0QsU0FBTyxJQUFQO0FBQ0gsQ0FQTDtBQVVBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBHcmF5U3ByaXRlU3RhdGUgPSByZXF1aXJlKCcuLi91dGlscy9ncmF5LXNwcml0ZS1zdGF0ZScpO1xuXG4vKipcbiAqICEjZW4gVGhlIHRvZ2dsZSBjb21wb25lbnQgaXMgYSBDaGVja0JveCwgd2hlbiBpdCB1c2VkIHRvZ2V0aGVyIHdpdGggYSBUb2dnbGVHcm91cCwgaXRcbiAqIGNvdWxkIGJlIHRyZWF0ZWQgYXMgYSBSYWRpb0J1dHRvbi5cbiAqICEjemggVG9nZ2xlIOaYr+S4gOS4qiBDaGVja0JveO+8jOW9k+Wug+WSjCBUb2dnbGVHcm91cCDkuIDotbfkvb/nlKjnmoTml7blgJnvvIzlj6/ku6Xlj5jmiJAgUmFkaW9CdXR0b27jgIJcbiAqIEBjbGFzcyBUb2dnbGVcbiAqIEBleHRlbmRzIEJ1dHRvblxuICogQHVzZXMgR3JheVNwcml0ZVN0YXRlXG4gKi9cbmxldCBUb2dnbGUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlRvZ2dsZScsXG4gICAgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ0J1dHRvbicpLFxuICAgIG1peGluczogW0dyYXlTcHJpdGVTdGF0ZV0sXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1RvZ2dsZScsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC50b2dnbGUnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3RvZ2dsZS5qcycsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gV2hlbiB0aGlzIHZhbHVlIGlzIHRydWUsIHRoZSBjaGVjayBtYXJrIGNvbXBvbmVudCB3aWxsIGJlIGVuYWJsZWQsIG90aGVyd2lzZVxuICAgICAgICAgKiB0aGUgY2hlY2sgbWFyayBjb21wb25lbnQgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICAgICAgICogISN6aCDlpoLmnpzov5nkuKrorr7nva7kuLogdHJ1Ze+8jOWImSBjaGVjayBtYXJrIOe7hOS7tuS8muWkhOS6jiBlbmFibGVkIOeKtuaAge+8jOWQpuWImeWkhOS6jiBkaXNhYmxlZCDnirbmgIHjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0NoZWNrZWRcbiAgICAgICAgICovXG4gICAgICAgIF9OJGlzQ2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgaXNDaGVja2VkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fTiRpc0NoZWNrZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuX04kaXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLnRvZ2dsZUdyb3VwIHx8IHRoaXMuX3RvZ2dsZUNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAuZW5hYmxlZCAmJiB0aGlzLl9OJGlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3VwLmFsbG93U3dpdGNoT2ZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX04kaXNDaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2hlY2tNYXJrKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBncm91cC51cGRhdGVUb2dnbGVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbWl0VG9nZ2xlRXZlbnRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudG9nZ2xlLmlzQ2hlY2tlZCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHRvZ2dsZSBncm91cCB3aGljaCB0aGUgdG9nZ2xlIGJlbG9uZ3MgdG8sIHdoZW4gaXQgaXMgbnVsbCwgdGhlIHRvZ2dsZSBpcyBhIENoZWNrQm94LlxuICAgICAgICAgKiBPdGhlcndpc2UsIHRoZSB0b2dnbGUgaXMgYSBSYWRpb0J1dHRvbi5cbiAgICAgICAgICogISN6aCBUb2dnbGUg5omA5bGe55qEIFRvZ2dsZUdyb3Vw77yM6L+Z5Liq5bGe5oCn5piv5Y+v6YCJ55qE44CC5aaC5p6c6L+Z5Liq5bGe5oCn5Li6IG51bGzvvIzliJkgVG9nZ2xlIOaYr+S4gOS4qiBDaGVja0JveO+8jFxuICAgICAgICAgKiDlkKbliJnvvIxUb2dnbGUg5piv5LiA5LiqIFJhZGlvQnV0dG9u44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VG9nZ2xlR3JvdXB9IHRvZ2dsZUdyb3VwXG4gICAgICAgICAqL1xuICAgICAgICB0b2dnbGVHcm91cDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudG9nZ2xlLnRvZ2dsZUdyb3VwJyxcbiAgICAgICAgICAgIHR5cGU6IHJlcXVpcmUoJy4vQ0NUb2dnbGVHcm91cCcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGltYWdlIHVzZWQgZm9yIHRoZSBjaGVja21hcmsuXG4gICAgICAgICAqICEjemggVG9nZ2xlIOWkhOS6jumAieS4reeKtuaAgeaXtuaYvuekuueahOWbvueJh1xuICAgICAgICAgKiBAcHJvcGVydHkge1Nwcml0ZX0gY2hlY2tNYXJrXG4gICAgICAgICAqL1xuICAgICAgICBjaGVja01hcms6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnRvZ2dsZS5jaGVja01hcmsnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSWYgVG9nZ2xlIGlzIGNsaWNrZWQsIGl0IHdpbGwgdHJpZ2dlciBldmVudCdzIGhhbmRsZXJcbiAgICAgICAgICogISN6aCBUb2dnbGUg5oyJ6ZKu55qE54K55Ye75LqL5Lu25YiX6KGo44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29tcG9uZW50LkV2ZW50SGFuZGxlcltdfSBjaGVja0V2ZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgY2hlY2tFdmVudHM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlclxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZXNpemVUb1RhcmdldDoge1xuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVOb2RlVG9UYXJnZXROb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgX3RyaWdnZXJFdmVudEluU2NyaXB0X2NoZWNrOiBmYWxzZSxcbiAgICAgICAgX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZDogZmFsc2UsXG4gICAgfSxcblxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlclRvZ2dsZUV2ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlR3JvdXAgJiYgdGhpcy50b2dnbGVHcm91cC5lbmFibGVkSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlR3JvdXAuYWRkVG9nZ2xlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3RlclRvZ2dsZUV2ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlR3JvdXAgJiYgdGhpcy50b2dnbGVHcm91cC5lbmFibGVkSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlR3JvdXAucmVtb3ZlVG9nZ2xlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9oaWRlQ2hlY2tNYXJrICgpIHtcbiAgICAgICAgdGhpcy5fTiRpc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2hlY2tNYXJrKCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gIXRoaXMuaXNDaGVja2VkO1xuICAgICAgICBpZiAoIWNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkICYmIChjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2NoZWNrIHx8IGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5fZW1pdFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTWFrZSB0aGUgdG9nZ2xlIGJ1dHRvbiBjaGVja2VkLlxuICAgICAqICEjemgg5L2/IHRvZ2dsZSDmjInpkq7lpITkuo7pgInkuK3nirbmgIFcbiAgICAgKiBAbWV0aG9kIGNoZWNrXG4gICAgICovXG4gICAgY2hlY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICBpZiAoIWNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkICYmIGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRUb2dnbGVFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1ha2UgdGhlIHRvZ2dsZSBidXR0b24gdW5jaGVja2VkLlxuICAgICAqICEjemgg5L2/IHRvZ2dsZSDmjInpkq7lpITkuo7mnKrpgInkuK3nirbmgIFcbiAgICAgKiBAbWV0aG9kIHVuY2hlY2tcbiAgICAgKi9cbiAgICB1bmNoZWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gZmFsc2U7XG4gICAgICAgIGlmICghY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9pc0NoZWNrZWQgJiYgY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9jaGVjaykge1xuICAgICAgICAgICAgdGhpcy5fZW1pdFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVDaGVja01hcms6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tNYXJrKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWFyay5ub2RlLmFjdGl2ZSA9ICEhdGhpcy5pc0NoZWNrZWQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZURpc2FibGVkU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVBdXRvR3JheUVmZmVjdCAmJiB0aGlzLmNoZWNrTWFyaykge1xuICAgICAgICAgICAgbGV0IHVzZUdyYXlNYXRlcmlhbCA9ICF0aGlzLmludGVyYWN0YWJsZTtcbiAgICAgICAgICAgIHRoaXMuX3N3aXRjaEdyYXlNYXRlcmlhbCh1c2VHcmF5TWF0ZXJpYWwsIHRoaXMuY2hlY2tNYXJrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVnaXN0ZXJUb2dnbGVFdmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oJ2NsaWNrJywgdGhpcy50b2dnbGUsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfdW5yZWdpc3RlclRvZ2dsZUV2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoJ2NsaWNrJywgdGhpcy50b2dnbGUsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfZW1pdFRvZ2dsZUV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgndG9nZ2xlJywgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrRXZlbnRzKSB7XG4gICAgICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5jaGVja0V2ZW50cywgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5Ub2dnbGUgPSBtb2R1bGUuZXhwb3J0cyA9IFRvZ2dsZTtcblxuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xuXG5qcy5nZXQoVG9nZ2xlLnByb3RvdHlwZSwgJ190b2dnbGVDb250YWluZXInLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIGlmIChjYy5Ob2RlLmlzTm9kZShwYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldENvbXBvbmVudChjYy5Ub2dnbGVDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbik7XG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgdG9nZ2xlXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtUb2dnbGV9IHRvZ2dsZSAtIFRoZSBUb2dnbGUgY29tcG9uZW50LlxuICovXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==