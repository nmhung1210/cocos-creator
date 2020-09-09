
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCComponentEventHandler.js';
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

/**
 * !#en
 * Component will register a event to target component's handler.
 * And it will trigger the handler when a certain event occurs.
 *
 * !@zh
 * “EventHandler” 类用来设置场景中的事件回调，
 * 该类允许用户设置回调目标节点，目标组件名，组件方法名，
 * 并可通过 emit 方法调用目标函数。
 * @class Component.EventHandler
 * @example
 * // Let's say we have a MainMenu component on newTarget
 * // file: MainMenu.js
 * cc.Class({
 *   extends: cc.Component,
 *   // sender: the node MainMenu.js belongs to
 *   // eventType: CustomEventData
 *   onClick (sender, eventType) {
 *     cc.log('click');
 *   }
 * })
 * // Create new EventHandler
 * var eventHandler = new cc.Component.EventHandler();
 * eventHandler.target = newTarget;
 * eventHandler.component = "MainMenu";
 * eventHandler.handler = "onClick";
 * eventHandler.customEventData = "my data";
 */
cc.Component.EventHandler = cc.Class({
  name: 'cc.ClickEvent',
  properties: {
    /**
     * !#en the node that contains target callback, such as the node example script belongs to
     * !#zh 事件响应函数所在节点 ，比如例子中脚本归属的节点本身
     * @property target
     * @type {Node}
     * @default null
     */
    target: {
      "default": null,
      type: cc.Node
    },

    /**
     * !#en name of the component(script) that contains target callback, such as the name 'MainMenu' of script in example
     * !#zh 事件响应函数所在组件名（脚本名）, 比如例子中的脚本名 'MainMenu'
     * @property component
     * @type {String}
     * @default ''
     */
    // only for deserializing old project component field
    component: '',
    _componentId: '',
    _componentName: {
      get: function get() {
        this._genCompIdIfNeeded();

        return this._compId2Name(this._componentId);
      },
      set: function set(value) {
        this._componentId = this._compName2Id(value);
      }
    },

    /**
     * !#en Event handler, such as function's name 'onClick' in example
     * !#zh 响应事件函数名，比如例子中的 'onClick'
     * @property handler
     * @type {String}
     * @default ''
     */
    handler: {
      "default": ''
    },

    /**
     * !#en Custom Event Data, such as 'eventType' in example
     * !#zh 自定义事件数据，比如例子中的 eventType
     * @property customEventData
     * @default ''
     * @type {String}
     */
    customEventData: {
      "default": ''
    }
  },
  statics: {
    /**
     * @method emitEvents
     * @param {Component.EventHandler[]} events
     * @param {any} ...params
     * @static
     */
    emitEvents: function emitEvents(events) {
      'use strict';

      var args;

      if (arguments.length > 0) {
        args = new Array(arguments.length - 1);

        for (var i = 0, l = args.length; i < l; i++) {
          args[i] = arguments[i + 1];
        }
      }

      for (var _i = 0, _l = events.length; _i < _l; _i++) {
        var event = events[_i];
        if (!(event instanceof cc.Component.EventHandler)) continue;
        event.emit(args);
      }
    }
  },

  /**
   * !#en Emit event with params
   * !#zh 触发目标组件上的指定 handler 函数，该参数是回调函数的参数值（可不填）。
   * @method emit
   * @param {Array} params
   * @example
   * // Call Function
   * var eventHandler = new cc.Component.EventHandler();
   * eventHandler.target = newTarget;
   * eventHandler.component = "MainMenu";
   * eventHandler.handler = "OnClick"
   * eventHandler.emit(["param1", "param2", ....]);
   */
  emit: function emit(params) {
    var target = this.target;
    if (!cc.isValid(target)) return;

    this._genCompIdIfNeeded();

    var compType = cc.js._getClassById(this._componentId);

    var comp = target.getComponent(compType);
    if (!cc.isValid(comp)) return;
    var handler = comp[this.handler];
    if (typeof handler !== 'function') return;

    if (this.customEventData != null && this.customEventData !== '') {
      params = params.slice();
      params.push(this.customEventData);
    }

    handler.apply(comp, params);
  },
  _compName2Id: function _compName2Id(compName) {
    var comp = cc.js.getClassByName(compName);
    return cc.js._getClassId(comp);
  },
  _compId2Name: function _compId2Name(compId) {
    var comp = cc.js._getClassById(compId);

    return cc.js.getClassName(comp);
  },
  // to be deprecated in the future
  _genCompIdIfNeeded: function _genCompIdIfNeeded() {
    if (!this._componentId) {
      this._componentName = this.component;
      this.component = '';
    }
  }
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NDb21wb25lbnRFdmVudEhhbmRsZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDb21wb25lbnQiLCJFdmVudEhhbmRsZXIiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwidGFyZ2V0IiwidHlwZSIsIk5vZGUiLCJjb21wb25lbnQiLCJfY29tcG9uZW50SWQiLCJfY29tcG9uZW50TmFtZSIsImdldCIsIl9nZW5Db21wSWRJZk5lZWRlZCIsIl9jb21wSWQyTmFtZSIsInNldCIsInZhbHVlIiwiX2NvbXBOYW1lMklkIiwiaGFuZGxlciIsImN1c3RvbUV2ZW50RGF0YSIsInN0YXRpY3MiLCJlbWl0RXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkFycmF5IiwiaSIsImwiLCJldmVudCIsImVtaXQiLCJwYXJhbXMiLCJpc1ZhbGlkIiwiY29tcFR5cGUiLCJqcyIsIl9nZXRDbGFzc0J5SWQiLCJjb21wIiwiZ2V0Q29tcG9uZW50Iiwic2xpY2UiLCJwdXNoIiwiYXBwbHkiLCJjb21wTmFtZSIsImdldENsYXNzQnlOYW1lIiwiX2dldENsYXNzSWQiLCJjb21wSWQiLCJnZXRDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkFBLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhQyxZQUFiLEdBQTRCRixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUNqQ0MsRUFBQUEsSUFBSSxFQUFFLGVBRDJCO0FBRWpDQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjs7Ozs7OztBQU9BQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRVAsRUFBRSxDQUFDUTtBQUZMLEtBUkE7O0FBWVI7Ozs7Ozs7QUFPQTtBQUNBQyxJQUFB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bkJ3QixRQXBIbUIsRUFvSFQ7QUFDcEIsUUFBSUwsSUFBSSxHQUFHcEMsRUFBRSxDQUFDa0MsRUFBSCxDQUFNUSxjQUFOLENBQXFCRCxRQUFyQixDQUFYO0FBQ0EsV0FBT3pDLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTVMsV0FBTixDQUFrQlAsSUFBbEIsQ0FBUDtBQUNILEdBdkhnQztBQXlIakN0QixFQUFBQSxZQXpIaUMsd0JBeUhuQjhCLE1BekhtQixFQXlIWDtBQUNsQixRQUFJUixJQUFJLEdBQUdwQyxFQUFFLENBQUNrQyxFQUFILENBQU1DLGFBQU4sQ0FBb0JTLE1BQXBCLENBQVg7O0FBQ0EsV0FBTzVDLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTVcsWUFBTixDQUFtQlQsSUFBbkIsQ0FBUDtBQUNILEdBNUhnQztBQThIakM7QUFDQXZCLEVBQUFBLGtCQS9IaUMsZ0NBK0hYO0FBQ2xCLFFBQUksQ0FBQyxLQUFLSCxZQUFWLEVBQXdCO0FBQ3BCLFdBQUtDLGNBQUwsR0FBc0IsS0FBS0YsU0FBM0I7QUFDQSxXQUFLQSxTQUFMLEdBQWlCLEVBQWpCO0FBQ0g7QUFDSjtBQXBJZ0MsQ0FBVCxDQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBDb21wb25lbnQgd2lsbCByZWdpc3RlciBhIGV2ZW50IHRvIHRhcmdldCBjb21wb25lbnQncyBoYW5kbGVyLlxuICogQW5kIGl0IHdpbGwgdHJpZ2dlciB0aGUgaGFuZGxlciB3aGVuIGEgY2VydGFpbiBldmVudCBvY2N1cnMuXG4gKlxuICogIUB6aFxuICog4oCcRXZlbnRIYW5kbGVy4oCdIOexu+eUqOadpeiuvue9ruWcuuaZr+S4reeahOS6i+S7tuWbnuiwg++8jFxuICog6K+l57G75YWB6K6455So5oi36K6+572u5Zue6LCD55uu5qCH6IqC54K577yM55uu5qCH57uE5Lu25ZCN77yM57uE5Lu25pa55rOV5ZCN77yMXG4gKiDlubblj6/pgJrov4cgZW1pdCDmlrnms5XosIPnlKjnm67moIflh73mlbDjgIJcbiAqIEBjbGFzcyBDb21wb25lbnQuRXZlbnRIYW5kbGVyXG4gKiBAZXhhbXBsZVxuICogLy8gTGV0J3Mgc2F5IHdlIGhhdmUgYSBNYWluTWVudSBjb21wb25lbnQgb24gbmV3VGFyZ2V0XG4gKiAvLyBmaWxlOiBNYWluTWVudS5qc1xuICogY2MuQ2xhc3Moe1xuICogICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gKiAgIC8vIHNlbmRlcjogdGhlIG5vZGUgTWFpbk1lbnUuanMgYmVsb25ncyB0b1xuICogICAvLyBldmVudFR5cGU6IEN1c3RvbUV2ZW50RGF0YVxuICogICBvbkNsaWNrIChzZW5kZXIsIGV2ZW50VHlwZSkge1xuICogICAgIGNjLmxvZygnY2xpY2snKTtcbiAqICAgfVxuICogfSlcbiAqIC8vIENyZWF0ZSBuZXcgRXZlbnRIYW5kbGVyXG4gKiB2YXIgZXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcbiAqIGV2ZW50SGFuZGxlci50YXJnZXQgPSBuZXdUYXJnZXQ7XG4gKiBldmVudEhhbmRsZXIuY29tcG9uZW50ID0gXCJNYWluTWVudVwiO1xuICogZXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcIm9uQ2xpY2tcIjtcbiAqIGV2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBcIm15IGRhdGFcIjtcbiAqL1xuY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQ2xpY2tFdmVudCcsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiB0aGUgbm9kZSB0aGF0IGNvbnRhaW5zIHRhcmdldCBjYWxsYmFjaywgc3VjaCBhcyB0aGUgbm9kZSBleGFtcGxlIHNjcmlwdCBiZWxvbmdzIHRvXG4gICAgICAgICAqICEjemgg5LqL5Lu25ZON5bqU5Ye95pWw5omA5Zyo6IqC54K5IO+8jOavlOWmguS+i+WtkOS4reiEmuacrOW9kuWxnueahOiKgueCueacrOi6q1xuICAgICAgICAgKiBAcHJvcGVydHkgdGFyZ2V0XG4gICAgICAgICAqIEB0eXBlIHtOb2RlfVxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAqL1xuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBuYW1lIG9mIHRoZSBjb21wb25lbnQoc2NyaXB0KSB0aGF0IGNvbnRhaW5zIHRhcmdldCBjYWxsYmFjaywgc3VjaCBhcyB0aGUgbmFtZSAnTWFpbk1lbnUnIG9mIHNjcmlwdCBpbiBleGFtcGxlXG4gICAgICAgICAqICEjemgg5LqL5Lu25ZON5bqU5Ye95pWw5omA5Zyo57uE5Lu25ZCN77yI6ISa5pys5ZCN77yJLCDmr5TlpoLkvovlrZDkuK3nmoTohJrmnKzlkI0gJ01haW5NZW51J1xuICAgICAgICAgKiBAcHJvcGVydHkgY29tcG9uZW50XG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICAgICAqL1xuICAgICAgICAvLyBvbmx5IGZvciBkZXNlcmlhbGl6aW5nIG9sZCBwcm9qZWN0IGNvbXBvbmVudCBmaWVsZFxuICAgICAgICBjb21wb25lbnQ6ICcnLFxuICAgICAgICBfY29tcG9uZW50SWQ6ICcnLFxuICAgICAgICBfY29tcG9uZW50TmFtZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5Db21wSWRJZk5lZWRlZCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBJZDJOYW1lKHRoaXMuX2NvbXBvbmVudElkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50SWQgPSB0aGlzLl9jb21wTmFtZTJJZCh2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBFdmVudCBoYW5kbGVyLCBzdWNoIGFzIGZ1bmN0aW9uJ3MgbmFtZSAnb25DbGljaycgaW4gZXhhbXBsZVxuICAgICAgICAgKiAhI3poIOWTjeW6lOS6i+S7tuWHveaVsOWQje+8jOavlOWmguS+i+WtkOS4reeahCAnb25DbGljaydcbiAgICAgICAgICogQHByb3BlcnR5IGhhbmRsZXJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJydcbiAgICAgICAgICovXG4gICAgICAgIGhhbmRsZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEN1c3RvbSBFdmVudCBEYXRhLCBzdWNoIGFzICdldmVudFR5cGUnIGluIGV4YW1wbGVcbiAgICAgICAgICogISN6aCDoh6rlrprkuYnkuovku7bmlbDmja7vvIzmr5TlpoLkvovlrZDkuK3nmoQgZXZlbnRUeXBlXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjdXN0b21FdmVudERhdGFcbiAgICAgICAgICogQGRlZmF1bHQgJydcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGN1c3RvbUV2ZW50RGF0YToge1xuICAgICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGVtaXRFdmVudHNcbiAgICAgICAgICogQHBhcmFtIHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGV2ZW50c1xuICAgICAgICAgKiBAcGFyYW0ge2FueX0gLi4ucGFyYW1zXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGVtaXRFdmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICAgICAgbGV0IGFyZ3M7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBldmVudC5lbWl0KGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRW1pdCBldmVudCB3aXRoIHBhcmFtc1xuICAgICAqICEjemgg6Kem5Y+R55uu5qCH57uE5Lu25LiK55qE5oyH5a6aIGhhbmRsZXIg5Ye95pWw77yM6K+l5Y+C5pWw5piv5Zue6LCD5Ye95pWw55qE5Y+C5pWw5YC877yI5Y+v5LiN5aGr77yJ44CCXG4gICAgICogQG1ldGhvZCBlbWl0XG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBDYWxsIEZ1bmN0aW9uXG4gICAgICogdmFyIGV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICogZXZlbnRIYW5kbGVyLnRhcmdldCA9IG5ld1RhcmdldDtcbiAgICAgKiBldmVudEhhbmRsZXIuY29tcG9uZW50ID0gXCJNYWluTWVudVwiO1xuICAgICAqIGV2ZW50SGFuZGxlci5oYW5kbGVyID0gXCJPbkNsaWNrXCJcbiAgICAgKiBldmVudEhhbmRsZXIuZW1pdChbXCJwYXJhbTFcIiwgXCJwYXJhbTJcIiwgLi4uLl0pO1xuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0YXJnZXQpKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fZ2VuQ29tcElkSWZOZWVkZWQoKTtcbiAgICAgICAgdmFyIGNvbXBUeXBlID0gY2MuanMuX2dldENsYXNzQnlJZCh0aGlzLl9jb21wb25lbnRJZCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY29tcCA9IHRhcmdldC5nZXRDb21wb25lbnQoY29tcFR5cGUpO1xuICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY29tcCkpIHJldHVybjtcblxuICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBbdGhpcy5oYW5kbGVyXTtcbiAgICAgICAgaWYgKHR5cGVvZihoYW5kbGVyKSAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUV2ZW50RGF0YSAhPSBudWxsICYmIHRoaXMuY3VzdG9tRXZlbnREYXRhICE9PSAnJykge1xuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNsaWNlKCk7XG4gICAgICAgICAgICBwYXJhbXMucHVzaCh0aGlzLmN1c3RvbUV2ZW50RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVyLmFwcGx5KGNvbXAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIF9jb21wTmFtZTJJZCAoY29tcE5hbWUpIHtcbiAgICAgICAgbGV0IGNvbXAgPSBjYy5qcy5nZXRDbGFzc0J5TmFtZShjb21wTmFtZSk7XG4gICAgICAgIHJldHVybiBjYy5qcy5fZ2V0Q2xhc3NJZChjb21wKTtcbiAgICB9LFxuXG4gICAgX2NvbXBJZDJOYW1lIChjb21wSWQpIHtcbiAgICAgICAgbGV0IGNvbXAgPSBjYy5qcy5fZ2V0Q2xhc3NCeUlkKGNvbXBJZCk7XG4gICAgICAgIHJldHVybiBjYy5qcy5nZXRDbGFzc05hbWUoY29tcCk7XG4gICAgfSxcblxuICAgIC8vIHRvIGJlIGRlcHJlY2F0ZWQgaW4gdGhlIGZ1dHVyZVxuICAgIF9nZW5Db21wSWRJZk5lZWRlZCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudE5hbWUgPSB0aGlzLmNvbXBvbmVudDtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50ID0gJyc7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==