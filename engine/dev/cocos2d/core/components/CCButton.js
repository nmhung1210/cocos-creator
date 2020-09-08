
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCButton.js';
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
var Component = require('./CCComponent');

var GraySpriteState = require('../utils/gray-sprite-state');
/**
 * !#en Enum for transition type.
 * !#zh 过渡类型
 * @enum Button.Transition
 */


var Transition = cc.Enum({
  /**
   * !#en The none type.
   * !#zh 不做任何过渡
   * @property {Number} NONE
   */
  NONE: 0,

  /**
   * !#en The color type.
   * !#zh 颜色过渡
   * @property {Number} COLOR
   */
  COLOR: 1,

  /**
   * !#en The sprite type.
   * !#zh 精灵过渡
   * @property {Number} SPRITE
   */
  SPRITE: 2,

  /**
   * !#en The scale type
   * !#zh 缩放过渡
   * @property {Number} SCALE
   */
  SCALE: 3
});
var State = cc.Enum({
  NORMAL: 0,
  HOVER: 1,
  PRESSED: 2,
  DISABLED: 3
});
/**
 * !#en
 * Button has 4 Transition types<br/>
 * When Button state changed:<br/>
 *  If Transition type is Button.Transition.NONE, Button will do nothing<br/>
 *  If Transition type is Button.Transition.COLOR, Button will change target's color<br/>
 *  If Transition type is Button.Transition.SPRITE, Button will change target Sprite's sprite<br/>
 *  If Transition type is Button.Transition.SCALE, Button will change target node's scale<br/>
 *
 * Button will trigger 5 events:<br/>
 *  Button.EVENT_TOUCH_DOWN<br/>
 *  Button.EVENT_TOUCH_UP<br/>
 *  Button.EVENT_HOVER_IN<br/>
 *  Button.EVENT_HOVER_MOVE<br/>
 *  Button.EVENT_HOVER_OUT<br/>
 *  User can get the current clicked node with 'event.target' from event object which is passed as parameter in the callback function of click event.
 *
 * !#zh
 * 按钮组件。可以被按下，或者点击。
 *
 * 按钮可以通过修改 Transition 来设置按钮状态过渡的方式：
 * 
 *   - Button.Transition.NONE   // 不做任何过渡
 *   - Button.Transition.COLOR  // 进行颜色之间过渡
 *   - Button.Transition.SPRITE // 进行精灵之间过渡
 *   - Button.Transition.SCALE // 进行缩放过渡
 *
 * 按钮可以绑定事件（但是必须要在按钮的 Node 上才能绑定事件）：<br/>
 * 以下事件可以在全平台上都触发：
 * 
 *   - cc.Node.EventType.TOUCH_START  // 按下时事件
 *   - cc.Node.EventType.TOUCH_Move   // 按住移动后事件
 *   - cc.Node.EventType.TOUCH_END    // 按下后松开后事件
 *   - cc.Node.EventType.TOUCH_CANCEL // 按下取消事件
 * 
 * 以下事件只在 PC 平台上触发：
 * 
 *   - cc.Node.EventType.MOUSE_DOWN  // 鼠标按下时事件
 *   - cc.Node.EventType.MOUSE_MOVE  // 鼠标按住移动后事件
 *   - cc.Node.EventType.MOUSE_ENTER // 鼠标进入目标事件
 *   - cc.Node.EventType.MOUSE_LEAVE // 鼠标离开目标事件
 *   - cc.Node.EventType.MOUSE_UP    // 鼠标松开事件
 *   - cc.Node.EventType.MOUSE_WHEEL // 鼠标滚轮事件
 * 
 * 用户可以通过获取 __点击事件__ 回调函数的参数 event 的 target 属性获取当前点击对象。
 * @class Button
 * @extends Component
 * @uses GraySpriteState
 * @example
 *
 * // Add an event to the button.
 * button.node.on(cc.Node.EventType.TOUCH_START, function (event) {
 *     cc.log("This is a callback after the trigger event");
 * });

 * // You could also add a click event
 * //Note: In this way, you can't get the touch event info, so use it wisely.
 * button.node.on('click', function (button) {
 *    //The event is a custom event, you could get the Button component via first argument
 * })
 *
 */

var Button = cc.Class({
  name: 'cc.Button',
  "extends": Component,
  mixins: [GraySpriteState],
  ctor: function ctor() {
    this._pressed = false;
    this._hovered = false;
    this._fromColor = null;
    this._toColor = null;
    this._time = 0;
    this._transitionFinished = true; // init _originalScale in __preload()

    this._fromScale = cc.Vec2.ZERO;
    this._toScale = cc.Vec2.ZERO;
    this._originalScale = null;
    this._graySpriteMaterial = null;
    this._spriteMaterial = null;
    this._sprite = null;
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Button',
    help: 'i18n:COMPONENT.help_url.button',
    inspector: 'packages://inspector/inspectors/comps/button.js',
    executeInEditMode: true
  },
  properties: {
    /**
     * !#en
     * Whether the Button is disabled.
     * If true, the Button will trigger event and do transition.
     * !#zh
     * 按钮事件是否被响应，如果为 false，则按钮将被禁用。
     * @property {Boolean} interactable
     * @default true
     */
    interactable: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.interactable',
      notify: function notify() {
        this._updateState();

        if (!this.interactable) {
          this._resetState();
        }
      },
      animatable: false
    },
    _resizeToTarget: {
      animatable: false,
      set: function set(value) {
        if (value) {
          this._resizeNodeToTargetNode();
        }
      }
    },

    /**
     * !#en When this flag is true, Button target sprite will turn gray when interactable is false.
     * !#zh 如果这个标记为 true，当 button 的 interactable 属性为 false 的时候，会使用内置 shader 让 button 的 target 节点的 sprite 组件变灰
     * @property {Boolean} enableAutoGrayEffect
     */
    enableAutoGrayEffect: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.auto_gray_effect',
      notify: function notify() {
        this._updateDisabledState(true);
      }
    },

    /**
     * !#en Transition type
     * !#zh 按钮状态改变时过渡方式。
     * @property {Button.Transition} transition
     * @default Button.Transition.Node
     */
    transition: {
      "default": Transition.NONE,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.transition',
      type: Transition,
      animatable: false,
      notify: function notify(oldValue) {
        this._updateTransition(oldValue);
      },
      formerlySerializedAs: 'transition'
    },
    // color transition

    /**
     * !#en Normal state color.
     * !#zh 普通状态下按钮所显示的颜色。
     * @property {Color} normalColor
     */
    normalColor: {
      "default": cc.Color.WHITE,
      displayName: 'Normal',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.NORMAL) {
          this._getTarget().opacity = this.normalColor.a;
        }

        this._updateState();
      }
    },

    /**
     * !#en Pressed state color
     * !#zh 按下状态时按钮所显示的颜色。
     * @property {Color} pressedColor
     */
    pressedColor: {
      "default": cc.color(211, 211, 211),
      displayName: 'Pressed',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.pressed_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.PRESSED) {
          this._getTarget().opacity = this.pressedColor.a;
        }

        this._updateState();
      },
      formerlySerializedAs: 'pressedColor'
    },

    /**
     * !#en Hover state color
     * !#zh 悬停状态下按钮所显示的颜色。
     * @property {Color} hoverColor
     */
    hoverColor: {
      "default": cc.Color.WHITE,
      displayName: 'Hover',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.hover_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.HOVER) {
          this._getTarget().opacity = this.hoverColor.a;
        }

        this._updateState();
      },
      formerlySerializedAs: 'hoverColor'
    },

    /**
     * !#en Disabled state color
     * !#zh 禁用状态下按钮所显示的颜色。
     * @property {Color} disabledColor
     */
    disabledColor: {
      "default": cc.color(124, 124, 124),
      displayName: 'Disabled',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.disabled_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.DISABLED) {
          this._getTarget().opacity = this.disabledColor.a;
        }

        this._updateState();
      }
    },

    /**
     * !#en Color and Scale transition duration
     * !#zh 颜色过渡和缩放过渡时所需时间
     * @property {Number} duration
     */
    duration: {
      "default": 0.1,
      range: [0, 10],
      tooltip: CC_DEV && 'i18n:COMPONENT.button.duration'
    },

    /**
     * !#en  When user press the button, the button will zoom to a scale.
     * The final scale of the button  equals (button original scale * zoomScale)
     * !#zh 当用户点击按钮后，按钮会缩放到一个值，这个值等于 Button 原始 scale * zoomScale
     * @property {Number} zoomScale
     */
    zoomScale: {
      "default": 1.2,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.zoom_scale'
    },
    // sprite transition

    /**
     * !#en Normal state sprite
     * !#zh 普通状态下按钮所显示的 Sprite 。
     * @property {SpriteFrame} normalSprite
     */
    normalSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Normal',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_sprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en Pressed state sprite
     * !#zh 按下状态时按钮所显示的 Sprite 。
     * @property {SpriteFrame} pressedSprite
     */
    pressedSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Pressed',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.pressed_sprite',
      formerlySerializedAs: 'pressedSprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en Hover state sprite
     * !#zh 悬停状态下按钮所显示的 Sprite 。
     * @property {SpriteFrame} hoverSprite
     */
    hoverSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Hover',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.hover_sprite',
      formerlySerializedAs: 'hoverSprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en Disabled state sprite
     * !#zh 禁用状态下按钮所显示的 Sprite 。
     * @property {SpriteFrame} disabledSprite
     */
    disabledSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Disabled',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.disabled_sprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en
     * Transition target.
     * When Button state changed:
     *  If Transition type is Button.Transition.NONE, Button will do nothing
     *  If Transition type is Button.Transition.COLOR, Button will change target's color
     *  If Transition type is Button.Transition.SPRITE, Button will change target Sprite's sprite
     * !#zh
     * 需要过渡的目标。
     * 当前按钮状态改变规则：
     * -如果 Transition type 选择 Button.Transition.NONE，按钮不做任何过渡。
     * -如果 Transition type 选择 Button.Transition.COLOR，按钮会对目标颜色进行颜色之间的过渡。
     * -如果 Transition type 选择 Button.Transition.Sprite，按钮会对目标 Sprite 进行 Sprite 之间的过渡。
     * @property {Node} target
     */
    target: {
      "default": null,
      type: cc.Node,
      tooltip: CC_DEV && "i18n:COMPONENT.button.target",
      notify: function notify(oldValue) {
        this._applyTarget();

        if (oldValue && this.target !== oldValue) {
          this._unregisterTargetEvent(oldValue);
        }
      }
    },

    /**
     * !#en If Button is clicked, it will trigger event's handler
     * !#zh 按钮的点击事件列表。
     * @property {Component.EventHandler[]} clickEvents
     */
    clickEvents: {
      "default": [],
      type: cc.Component.EventHandler,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.click_events'
    }
  },
  statics: {
    Transition: Transition
  },
  __preload: function __preload() {
    this._applyTarget();

    this._resetState();
  },
  _resetState: function _resetState() {
    this._pressed = false;
    this._hovered = false; // // Restore button status

    var target = this._getTarget();

    var transition = this.transition;
    var originalScale = this._originalScale;

    if (transition === Transition.COLOR && this.interactable) {
      this._setTargetColor(this.normalColor);
    } else if (transition === Transition.SCALE && originalScale) {
      target.setScale(originalScale.x, originalScale.y);
    }

    this._transitionFinished = true;
  },
  onEnable: function onEnable() {
    // check sprite frames
    if (this.normalSprite) {
      this.normalSprite.ensureLoadTexture();
    }

    if (this.hoverSprite) {
      this.hoverSprite.ensureLoadTexture();
    }

    if (this.pressedSprite) {
      this.pressedSprite.ensureLoadTexture();
    }

    if (this.disabledSprite) {
      this.disabledSprite.ensureLoadTexture();
    }

    if (!CC_EDITOR) {
      this._registerNodeEvent();
    }

    this._updateState();
  },
  onDisable: function onDisable() {
    this._resetState();

    if (!CC_EDITOR) {
      this._unregisterNodeEvent();
    }
  },
  _getTarget: function _getTarget() {
    return this.target ? this.target : this.node;
  },
  _onTargetSpriteFrameChanged: function _onTargetSpriteFrameChanged(comp) {
    if (this.transition === Transition.SPRITE) {
      this._setCurrentStateSprite(comp.spriteFrame);
    }
  },
  _onTargetColorChanged: function _onTargetColorChanged(color) {
    if (this.transition === Transition.COLOR) {
      this._setCurrentStateColor(color);
    }
  },
  _onTargetScaleChanged: function _onTargetScaleChanged() {
    var target = this._getTarget(); // update _originalScale if target scale changed


    if (this._originalScale) {
      if (this.transition !== Transition.SCALE || this._transitionFinished) {
        this._originalScale.x = target.scaleX;
        this._originalScale.y = target.scaleY;
      }
    }
  },
  _setTargetColor: function _setTargetColor(color) {
    var target = this._getTarget();

    var cloneColor = color.clone();
    target.opacity = cloneColor.a;
    cloneColor.a = 255; // don't set node opacity via node.color.a

    target.color = cloneColor;
  },
  _getStateColor: function _getStateColor(state) {
    switch (state) {
      case State.NORMAL:
        return this.normalColor;

      case State.HOVER:
        return this.hoverColor;

      case State.PRESSED:
        return this.pressedColor;

      case State.DISABLED:
        return this.disabledColor;
    }
  },
  _getStateSprite: function _getStateSprite(state) {
    switch (state) {
      case State.NORMAL:
        return this.normalSprite;

      case State.HOVER:
        return this.hoverSprite;

      case State.PRESSED:
        return this.pressedSprite;

      case State.DISABLED:
        return this.disabledSprite;
    }
  },
  _setCurrentStateColor: function _setCurrentStateColor(color) {
    switch (this._getButtonState()) {
      case State.NORMAL:
        this.normalColor = color;
        break;

      case State.HOVER:
        this.hoverColor = color;
        break;

      case State.PRESSED:
        this.pressedColor = color;
        break;

      case State.DISABLED:
        this.disabledColor = color;
        break;
    }
  },
  _setCurrentStateSprite: function _setCurrentStateSprite(spriteFrame) {
    switch (this._getButtonState()) {
      case State.NORMAL:
        this.normalSprite = spriteFrame;
        break;

      case State.HOVER:
        this.hoverSprite = spriteFrame;
        break;

      case State.PRESSED:
        this.pressedSprite = spriteFrame;
        break;

      case State.DISABLED:
        this.disabledSprite = spriteFrame;
        break;
    }
  },
  update: function update(dt) {
    var target = this._getTarget();

    if (this._transitionFinished) return;
    if (this.transition !== Transition.COLOR && this.transition !== Transition.SCALE) return;
    this.time += dt;
    var ratio = 1.0;

    if (this.duration > 0) {
      ratio = this.time / this.duration;
    } // clamp ratio


    if (ratio >= 1) {
      ratio = 1;
    }

    if (this.transition === Transition.COLOR) {
      var color = this._fromColor.lerp(this._toColor, ratio);

      this._setTargetColor(color);
    } // Skip if _originalScale is invalid
    else if (this.transition === Transition.SCALE && this._originalScale) {
        target.scale = this._fromScale.lerp(this._toScale, ratio);
      }

    if (ratio === 1) {
      this._transitionFinished = true;
    }
  },
  _registerNodeEvent: function _registerNodeEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
  },
  _unregisterNodeEvent: function _unregisterNodeEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
    this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
  },
  _registerTargetEvent: function _registerTargetEvent(target) {
    if (CC_EDITOR) {
      target.on('spriteframe-changed', this._onTargetSpriteFrameChanged, this);
      target.on(cc.Node.EventType.COLOR_CHANGED, this._onTargetColorChanged, this);
    }

    target.on(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
  },
  _unregisterTargetEvent: function _unregisterTargetEvent(target) {
    if (CC_EDITOR) {
      target.off('spriteframe-changed', this._onTargetSpriteFrameChanged, this);
      target.off(cc.Node.EventType.COLOR_CHANGED, this._onTargetColorChanged, this);
    }

    target.off(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
  },
  _getTargetSprite: function _getTargetSprite(target) {
    var sprite = null;

    if (target) {
      sprite = target.getComponent(cc.Sprite);
    }

    return sprite;
  },
  _applyTarget: function _applyTarget() {
    var target = this._getTarget();

    this._sprite = this._getTargetSprite(target);

    if (!this._originalScale) {
      this._originalScale = cc.Vec2.ZERO;
    }

    this._originalScale.x = target.scaleX;
    this._originalScale.y = target.scaleY;

    this._registerTargetEvent(target);
  },
  // touch event handler
  _onTouchBegan: function _onTouchBegan(event) {
    if (!this.interactable || !this.enabledInHierarchy) return;
    this._pressed = true;

    this._updateState();

    event.stopPropagation();
  },
  _onTouchMove: function _onTouchMove(event) {
    if (!this.interactable || !this.enabledInHierarchy || !this._pressed) return; // mobile phone will not emit _onMouseMoveOut,
    // so we have to do hit test when touch moving

    var touch = event.touch;

    var hit = this.node._hitTest(touch.getLocation());

    var target = this._getTarget();

    var originalScale = this._originalScale;

    if (this.transition === Transition.SCALE && originalScale) {
      if (hit) {
        this._fromScale.x = originalScale.x;
        this._fromScale.y = originalScale.y;
        this._toScale.x = originalScale.x * this.zoomScale;
        this._toScale.y = originalScale.y * this.zoomScale;
        this._transitionFinished = false;
      } else {
        this.time = 0;
        this._transitionFinished = true;
        target.setScale(originalScale.x, originalScale.y);
      }
    } else {
      var state;

      if (hit) {
        state = State.PRESSED;
      } else {
        state = State.NORMAL;
      }

      this._applyTransition(state);
    }

    event.stopPropagation();
  },
  _onTouchEnded: function _onTouchEnded(event) {
    if (!this.interactable || !this.enabledInHierarchy) return;

    if (this._pressed) {
      cc.Component.EventHandler.emitEvents(this.clickEvents, event);
      this.node.emit('click', this);
    }

    this._pressed = false;

    this._updateState();

    event.stopPropagation();
  },
  _onTouchCancel: function _onTouchCancel() {
    if (!this.interactable || !this.enabledInHierarchy) return;
    this._pressed = false;

    this._updateState();
  },
  _onMouseMoveIn: function _onMouseMoveIn() {
    if (this._pressed || !this.interactable || !this.enabledInHierarchy) return;
    if (this.transition === Transition.SPRITE && !this.hoverSprite) return;

    if (!this._hovered) {
      this._hovered = true;

      this._updateState();
    }
  },
  _onMouseMoveOut: function _onMouseMoveOut() {
    if (this._hovered) {
      this._hovered = false;

      this._updateState();
    }
  },
  // state handler
  _updateState: function _updateState() {
    var state = this._getButtonState();

    this._applyTransition(state);

    this._updateDisabledState();
  },
  _getButtonState: function _getButtonState() {
    var state;

    if (!this.interactable) {
      state = State.DISABLED;
    } else if (this._pressed) {
      state = State.PRESSED;
    } else if (this._hovered) {
      state = State.HOVER;
    } else {
      state = State.NORMAL;
    }

    return state;
  },
  _updateColorTransitionImmediately: function _updateColorTransitionImmediately(state) {
    var color = this._getStateColor(state);

    this._setTargetColor(color);

    this._fromColor = color.clone();
    this._toColor = color;
  },
  _updateColorTransition: function _updateColorTransition(state) {
    if (CC_EDITOR || state === State.DISABLED) {
      this._updateColorTransitionImmediately(state);
    } else {
      var target = this._getTarget();

      var color = this._getStateColor(state);

      this._fromColor = target.color.clone();
      this._toColor = color;
      this.time = 0;
      this._transitionFinished = false;
    }
  },
  _updateSpriteTransition: function _updateSpriteTransition(state) {
    var sprite = this._getStateSprite(state);

    if (this._sprite && sprite) {
      this._sprite.spriteFrame = sprite;
    }
  },
  _updateScaleTransition: function _updateScaleTransition(state) {
    if (state === State.PRESSED) {
      this._zoomUp();
    } else {
      this._zoomBack();
    }
  },
  _zoomUp: function _zoomUp() {
    // skip before __preload()
    if (!this._originalScale) {
      return;
    }

    this._fromScale.x = this._originalScale.x;
    this._fromScale.y = this._originalScale.y;
    this._toScale.x = this._originalScale.x * this.zoomScale;
    this._toScale.y = this._originalScale.y * this.zoomScale;
    this.time = 0;
    this._transitionFinished = false;
  },
  _zoomBack: function _zoomBack() {
    // skip before __preload()
    if (!this._originalScale) {
      return;
    }

    var target = this._getTarget();

    this._fromScale.x = target.scaleX;
    this._fromScale.y = target.scaleY;
    this._toScale.x = this._originalScale.x;
    this._toScale.y = this._originalScale.y;
    this.time = 0;
    this._transitionFinished = false;
  },
  _updateTransition: function _updateTransition(oldTransition) {
    // Reset to normal data when change transition.
    if (oldTransition === Transition.COLOR) {
      this._updateColorTransitionImmediately(State.NORMAL);
    } else if (oldTransition === Transition.SPRITE) {
      this._updateSpriteTransition(State.NORMAL);
    }

    this._updateState();
  },
  _applyTransition: function _applyTransition(state) {
    var transition = this.transition;

    if (transition === Transition.COLOR) {
      this._updateColorTransition(state);
    } else if (transition === Transition.SPRITE) {
      this._updateSpriteTransition(state);
    } else if (transition === Transition.SCALE) {
      this._updateScaleTransition(state);
    }
  },
  _resizeNodeToTargetNode: CC_EDITOR && function () {
    this.node.setContentSize(this._getTarget().getContentSize());
  },
  _updateDisabledState: function _updateDisabledState(force) {
    if (!this._sprite) return;

    if (this.enableAutoGrayEffect || force) {
      var useGrayMaterial = false;

      if (!(this.transition === Transition.SPRITE && this.disabledSprite)) {
        useGrayMaterial = this.enableAutoGrayEffect && !this.interactable;
      }

      this._switchGrayMaterial(useGrayMaterial, this._sprite);
    }
  }
});
cc.Button = module.exports = Button;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event click
 * @param {Event.EventCustom} event
 * @param {Button} button - The Button component.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NCdXR0b24uanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwicmVxdWlyZSIsIkdyYXlTcHJpdGVTdGF0ZSIsIlRyYW5zaXRpb24iLCJjYyIsIkVudW0iLCJOT05FIiwiQ09MT1IiLCJTUFJJVEUiLCJTQ0FMRSIsIlN0YXRlIiwiTk9STUFMIiwiSE9WRVIiLCJQUkVTU0VEIiwiRElTQUJMRUQiLCJCdXR0b24iLCJDbGFzcyIsIm5hbWUiLCJtaXhpbnMiLCJjdG9yIiwiX3ByZXNzZWQiLCJfaG92ZXJlZCIsIl9mcm9tQ29sb3IiLCJfdG9Db2xvciIsIl90aW1lIiwiX3RyYW5zaXRpb25GaW5pc2hlZCIsIl9mcm9tU2NhbGUiLCJWZWMyIiwiWkVSTyIsIl90b1NjYWxlIiwiX29yaWdpbmFsU2NhbGUiLCJfZ3JheVNwcml0ZU1hdGVyaWFsIiwiX3Nwcml0ZU1hdGVyaWFsIiwiX3Nwcml0ZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJwcm9wZXJ0aWVzIiwiaW50ZXJhY3RhYmxlIiwidG9vbHRpcCIsIkNDX0RFViIsIm5vdGlmeSIsIl91cGRhdGVTdGF0ZSIsIl9yZXNldFN0YXRlIiwiYW5pbWF0YWJsZSIsIl9yZXNpemVUb1RhcmdldCIsInNldCIsInZhbHVlIiwiX3Jlc2l6ZU5vZGVUb1RhcmdldE5vZGUiLCJlbmFibGVBdXRvR3JheUVmZmVjdCIsIl91cGRhdGVEaXNhYmxlZFN0YXRlIiwidHJhbnNpdGlvbiIsInR5cGUiLCJvbGRWYWx1ZSIsIl91cGRhdGVUcmFuc2l0aW9uIiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJub3JtYWxDb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJkaXNwbGF5TmFtZSIsIl9nZXRCdXR0b25TdGF0ZSIsIl9nZXRUYXJnZXQiLCJvcGFjaXR5IiwiYSIsInByZXNzZWRDb2xvciIsImNvbG9yIiwiaG92ZXJDb2xvciIsImRpc2FibGVkQ29sb3IiLCJkdXJhdGlvbiIsInJhbmdlIiwiem9vbVNjYWxlIiwibm9ybWFsU3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJwcmVzc2VkU3ByaXRlIiwiaG92ZXJTcHJpdGUiLCJkaXNhYmxlZFNwcml0ZSIsInRhcmdldCIsIk5vZGUiLCJfYXBwbHlUYXJnZXQiLCJfdW5yZWdpc3RlclRhcmdldEV2ZW50IiwiY2xpY2tFdmVudHMiLCJFdmVudEhhbmRsZXIiLCJzdGF0aWNzIiwiX19wcmVsb2FkIiwib3JpZ2luYWxTY2FsZSIsIl9zZXRUYXJnZXRDb2xvciIsInNldFNjYWxlIiwieCIsInkiLCJvbkVuYWJsZSIsImVuc3VyZUxvYWRUZXh0dXJlIiwiX3JlZ2lzdGVyTm9kZUV2ZW50Iiwib25EaXNhYmxlIiwiX3VucmVnaXN0ZXJOb2RlRXZlbnQiLCJub2RlIiwiX29uVGFyZ2V0U3ByaXRlRnJhbWVDaGFuZ2VkIiwiY29tcCIsIl9zZXRDdXJyZW50U3RhdGVTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIl9vblRhcmdldENvbG9yQ2hhbmdlZCIsIl9zZXRDdXJyZW50U3RhdGVDb2xvciIsIl9vblRhcmdldFNjYWxlQ2hhbmdlZCIsInNjYWxlWCIsInNjYWxlWSIsImNsb25lQ29sb3IiLCJjbG9uZSIsIl9nZXRTdGF0ZUNvbG9yIiwic3RhdGUiLCJfZ2V0U3RhdGVTcHJpdGUiLCJ1cGRhdGUiLCJkdCIsInRpbWUiLCJyYXRpbyIsImxlcnAiLCJzY2FsZSIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJfb25Ub3VjaEJlZ2FuIiwiVE9VQ0hfTU9WRSIsIl9vblRvdWNoTW92ZSIsIlRPVUNIX0VORCIsIl9vblRvdWNoRW5kZWQiLCJUT1VDSF9DQU5DRUwiLCJfb25Ub3VjaENhbmNlbCIsIk1PVVNFX0VOVEVSIiwiX29uTW91c2VNb3ZlSW4iLCJNT1VTRV9MRUFWRSIsIl9vbk1vdXNlTW92ZU91dCIsIm9mZiIsIl9yZWdpc3RlclRhcmdldEV2ZW50IiwiQ09MT1JfQ0hBTkdFRCIsIlNDQUxFX0NIQU5HRUQiLCJfZ2V0VGFyZ2V0U3ByaXRlIiwic3ByaXRlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwiZXZlbnQiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b3VjaCIsImhpdCIsIl9oaXRUZXN0IiwiZ2V0TG9jYXRpb24iLCJfYXBwbHlUcmFuc2l0aW9uIiwiZW1pdEV2ZW50cyIsImVtaXQiLCJfdXBkYXRlQ29sb3JUcmFuc2l0aW9uSW1tZWRpYXRlbHkiLCJfdXBkYXRlQ29sb3JUcmFuc2l0aW9uIiwiX3VwZGF0ZVNwcml0ZVRyYW5zaXRpb24iLCJfdXBkYXRlU2NhbGVUcmFuc2l0aW9uIiwiX3pvb21VcCIsIl96b29tQmFjayIsIm9sZFRyYW5zaXRpb24iLCJzZXRDb250ZW50U2l6ZSIsImdldENvbnRlbnRTaXplIiwiZm9yY2UiLCJ1c2VHcmF5TWF0ZXJpYWwiLCJfc3dpdGNoR3JheU1hdGVyaWFsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBekI7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsNEJBQUQsQ0FBL0I7QUFFQTs7Ozs7OztBQUtBLElBQUlFLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDckI7Ozs7O0FBS0FDLEVBQUFBLElBQUksRUFBRSxDQU5lOztBQVFyQjs7Ozs7QUFLQUMsRUFBQUEsS0FBSyxFQUFFLENBYmM7O0FBZXJCOzs7OztBQUtBQyxFQUFBQSxNQUFNLEVBQUUsQ0FwQmE7O0FBcUJyQjs7Ozs7QUFLQUMsRUFBQUEsS0FBSyxFQUFFO0FBMUJjLENBQVIsQ0FBakI7QUE2QkEsSUFBTUMsS0FBSyxHQUFHTixFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNsQk0sRUFBQUEsTUFBTSxFQUFFLENBRFU7QUFFbEJDLEVBQUFBLEtBQUssRUFBRSxDQUZXO0FBR2xCQyxFQUFBQSxPQUFPLEVBQUUsQ0FIUztBQUlsQkMsRUFBQUEsUUFBUSxFQUFFO0FBSlEsQ0FBUixDQUFkO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThEQSxJQUFJQyxNQUFNLEdBQUdYLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTO0FBQ2xCQyxFQUFBQSxJQUFJLEVBQUUsV0FEWTtBQUVsQixhQUFTakIsU0FGUztBQUdsQmtCLEVBQUFBLE1BQU0sRUFBRSxDQUFDaEIsZUFBRCxDQUhVO0FBS2xCaUIsRUFBQUEsSUFMa0Isa0JBS1Y7QUFDSixTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxtQkFBTCxHQUEyQixJQUEzQixDQU5JLENBT0o7O0FBQ0EsU0FBS0MsVUFBTCxHQUFrQnRCLEVBQUUsQ0FBQ3VCLElBQUgsQ0FBUUMsSUFBMUI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCekIsRUFBRSxDQUFDdUIsSUFBSCxDQUFRQyxJQUF4QjtBQUNBLFNBQUtFLGNBQUwsR0FBc0IsSUFBdEI7QUFFQSxTQUFLQyxtQkFBTCxHQUEyQixJQUEzQjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFFQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNILEdBckJpQjtBQXVCbEJDLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUUsb0NBRFc7QUFFakJDLElBQUFBLElBQUksRUFBRSxnQ0FGVztBQUdqQkMsSUFBQUEsU0FBUyxFQUFFLGlEQUhNO0FBSWpCQyxJQUFBQSxpQkFBaUIsRUFBRTtBQUpGLEdBdkJIO0FBOEJsQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7Ozs7Ozs7OztBQVNBQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLG9DQUZUO0FBR1ZDLE1BQUFBLE1BSFUsb0JBR0E7QUFDTixhQUFLQyxZQUFMOztBQUVBLFlBQUksQ0FBQyxLQUFLSixZQUFWLEVBQXdCO0FBQ3BCLGVBQUtLLFdBQUw7QUFDSDtBQUNKLE9BVFM7QUFVVkMsTUFBQUEsVUFBVSxFQUFFO0FBVkYsS0FWTjtBQXVCUkMsSUFBQUEsZUFBZSxFQUFFO0FBQ2JELE1BQUFBLFVBQVUsRUFBRSxLQURDO0FBRWJFLE1BQUFBLEdBRmEsZUFFUkMsS0FGUSxFQUVEO0FBQ1IsWUFBSUEsS0FBSixFQUFXO0FBQ1AsZUFBS0MsdUJBQUw7QUFDSDtBQUNKO0FBTlksS0F2QlQ7O0FBZ0NSOzs7OztBQUtBQyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNsQixpQkFBUyxLQURTO0FBRWxCVixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSx3Q0FGRDtBQUdsQkMsTUFBQUEsTUFIa0Isb0JBR1I7QUFDTixhQUFLUyxvQkFBTCxDQUEwQixJQUExQjtBQUNIO0FBTGlCLEtBckNkOztBQTZDUjs7Ozs7O0FBTUFDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTbkQsVUFBVSxDQUFDRyxJQURaO0FBRVJvQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxrQ0FGWDtBQUdSWSxNQUFBQSxJQUFJLEVBQUVwRCxVQUhFO0FBSVI0QyxNQUFBQSxVQUFVLEVBQUUsS0FKSjtBQUtSSCxNQUFBQSxNQUxRLGtCQUtBWSxRQUxBLEVBS1U7QUFDZCxhQUFLQyxpQkFBTCxDQUF1QkQsUUFBdkI7QUFDSCxPQVBPO0FBUVJFLE1BQUFBLG9CQUFvQixFQUFFO0FBUmQsS0FuREo7QUE4RFI7O0FBRUE7Ozs7O0FBS0FDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTdkQsRUFBRSxDQUFDd0QsS0FBSCxDQUFTQyxLQURUO0FBRVRDLE1BQUFBLFdBQVcsRUFBRSxRQUZKO0FBR1RwQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxvQ0FIVjtBQUlUQyxNQUFBQSxNQUpTLG9CQUlDO0FBQ04sWUFBSSxLQUFLVSxVQUFMLEtBQW9CbkQsVUFBVSxDQUFDeUQsS0FBL0IsSUFBd0MsS0FBS0csZUFBTCxPQUEyQnJELEtBQUssQ0FBQ0MsTUFBN0UsRUFBcUY7QUFDakYsZUFBS3FELFVBQUwsR0FBa0JDLE9BQWxCLEdBQTRCLEtBQUtOLFdBQUwsQ0FBaUJPLENBQTdDO0FBQ0g7O0FBQ0QsYUFBS3JCLFlBQUw7QUFDSDtBQVRRLEtBckVMOztBQWlGUjs7Ozs7QUFLQXNCLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTL0QsRUFBRSxDQUFDZ0UsS0FBSCxDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLEdBQW5CLENBREM7QUFFVk4sTUFBQUEsV0FBVyxFQUFFLFNBRkg7QUFHVnBCLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHFDQUhUO0FBSVZDLE1BQUFBLE1BSlUsb0JBSUE7QUFDTixZQUFJLEtBQUtVLFVBQUwsS0FBb0JuRCxVQUFVLENBQUN5RCxLQUEvQixJQUF3QyxLQUFLRyxlQUFMLE9BQTJCckQsS0FBSyxDQUFDRyxPQUE3RSxFQUFzRjtBQUNsRixlQUFLbUQsVUFBTCxHQUFrQkMsT0FBbEIsR0FBNEIsS0FBS0UsWUFBTCxDQUFrQkQsQ0FBOUM7QUFDSDs7QUFDRCxhQUFLckIsWUFBTDtBQUNILE9BVFM7QUFVVmEsTUFBQUEsb0JBQW9CLEVBQUU7QUFWWixLQXRGTjs7QUFtR1I7Ozs7O0FBS0FXLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTakUsRUFBRSxDQUFDd0QsS0FBSCxDQUFTQyxLQURWO0FBRVJDLE1BQUFBLFdBQVcsRUFBRSxPQUZMO0FBR1JwQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxtQ0FIWDtBQUlSQyxNQUFBQSxNQUpRLG9CQUlFO0FBQ04sWUFBSSxLQUFLVSxVQUFMLEtBQW9CbkQsVUFBVSxDQUFDeUQsS0FBL0IsSUFBd0MsS0FBS0csZUFBTCxPQUEyQnJELEtBQUssQ0FBQ0UsS0FBN0UsRUFBb0Y7QUFDaEYsZUFBS29ELFVBQUwsR0FBa0JDLE9BQWxCLEdBQTRCLEtBQUtJLFVBQUwsQ0FBZ0JILENBQTVDO0FBQ0g7O0FBQ0QsYUFBS3JCLFlBQUw7QUFDSCxPQVRPO0FBVVJhLE1BQUFBLG9CQUFvQixFQUFFO0FBVmQsS0F4R0o7O0FBcUhSOzs7OztBQUtBWSxJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBU2xFLEVBQUUsQ0FBQ2dFLEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixDQURFO0FBRVhOLE1BQUFBLFdBQVcsRUFBRSxVQUZGO0FBR1hwQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxzQ0FIUjtBQUlYQyxNQUFBQSxNQUpXLG9CQUlEO0FBQ04sWUFBSSxLQUFLVSxVQUFMLEtBQW9CbkQsVUFBVSxDQUFDeUQsS0FBL0IsSUFBd0MsS0FBS0csZUFBTCxPQUEyQnJELEtBQUssQ0FBQ0ksUUFBN0UsRUFBdUY7QUFDbkYsZUFBS2tELFVBQUwsR0FBa0JDLE9BQWxCLEdBQTRCLEtBQUtLLGFBQUwsQ0FBbUJKLENBQS9DO0FBQ0g7O0FBQ0QsYUFBS3JCLFlBQUw7QUFDSDtBQVRVLEtBMUhQOztBQXNJUjs7Ozs7QUFLQTBCLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLEdBREg7QUFFTkMsTUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FGRDtBQUdOOUIsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFIYixLQTNJRjs7QUFpSlI7Ozs7OztBQU1BOEIsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsR0FERjtBQUVQL0IsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFGWixLQXZKSDtBQTRKUjs7QUFDQTs7Ozs7QUFLQStCLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVm5CLE1BQUFBLElBQUksRUFBRW5ELEVBQUUsQ0FBQ3VFLFdBRkM7QUFHVmIsTUFBQUEsV0FBVyxFQUFFLFFBSEg7QUFJVnBCLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHFDQUpUO0FBS1ZDLE1BQUFBLE1BTFUsb0JBS0E7QUFDTixhQUFLQyxZQUFMO0FBQ0g7QUFQUyxLQWxLTjs7QUE0S1I7Ozs7O0FBS0ErQixJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhyQixNQUFBQSxJQUFJLEVBQUVuRCxFQUFFLENBQUN1RSxXQUZFO0FBR1hiLE1BQUFBLFdBQVcsRUFBRSxTQUhGO0FBSVhwQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxzQ0FKUjtBQUtYZSxNQUFBQSxvQkFBb0IsRUFBRSxlQUxYO0FBTVhkLE1BQUFBLE1BTlcsb0JBTUQ7QUFDTixhQUFLQyxZQUFMO0FBQ0g7QUFSVSxLQWpMUDs7QUE0TFI7Ozs7O0FBS0FnQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVR0QixNQUFBQSxJQUFJLEVBQUVuRCxFQUFFLENBQUN1RSxXQUZBO0FBR1RiLE1BQUFBLFdBQVcsRUFBRSxPQUhKO0FBSVRwQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxvQ0FKVjtBQUtUZSxNQUFBQSxvQkFBb0IsRUFBRSxhQUxiO0FBTVRkLE1BQUFBLE1BTlMsb0JBTUM7QUFDTixhQUFLQyxZQUFMO0FBQ0g7QUFSUSxLQWpNTDs7QUE0TVI7Ozs7O0FBS0FpQyxJQUFBQSxjQUFjLEVBQUU7QUFDWixpQkFBUyxJQURHO0FBRVp2QixNQUFBQSxJQUFJLEVBQUVuRCxFQUFFLENBQUN1RSxXQUZHO0FBR1piLE1BQUFBLFdBQVcsRUFBRSxVQUhEO0FBSVpwQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSx1Q0FKUDtBQUtaQyxNQUFBQSxNQUxZLG9CQUtGO0FBQ04sYUFBS0MsWUFBTDtBQUNIO0FBUFcsS0FqTlI7O0FBMk5SOzs7Ozs7Ozs7Ozs7Ozs7QUFlQWtDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSnhCLE1BQUFBLElBQUksRUFBRW5ELEVBQUUsQ0FBQzRFLElBRkw7QUFHSnRDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhCQUhmO0FBSUpDLE1BQUFBLE1BSkksa0JBSUlZLFFBSkosRUFJYztBQUNkLGFBQUt5QixZQUFMOztBQUNBLFlBQUl6QixRQUFRLElBQUksS0FBS3VCLE1BQUwsS0FBZ0J2QixRQUFoQyxFQUEwQztBQUN0QyxlQUFLMEIsc0JBQUwsQ0FBNEIxQixRQUE1QjtBQUNIO0FBQ0o7QUFURyxLQTFPQTs7QUFzUFI7Ozs7O0FBS0EyQixJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxFQURBO0FBRVQ1QixNQUFBQSxJQUFJLEVBQUVuRCxFQUFFLENBQUNKLFNBQUgsQ0FBYW9GLFlBRlY7QUFHVDFDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJO0FBSFY7QUEzUEwsR0E5Qk07QUFnU2xCMEMsRUFBQUEsT0FBTyxFQUFFO0FBQ0xsRixJQUFBQSxVQUFVLEVBQUVBO0FBRFAsR0FoU1M7QUFvU2xCbUYsRUFBQUEsU0FwU2tCLHVCQW9TTDtBQUNULFNBQUtMLFlBQUw7O0FBQ0EsU0FBS25DLFdBQUw7QUFDSCxHQXZTaUI7QUF5U2xCQSxFQUFBQSxXQXpTa0IseUJBeVNIO0FBQ1gsU0FBSzFCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCLENBRlcsQ0FHWDs7QUFDQSxRQUFJMEQsTUFBTSxHQUFHLEtBQUtmLFVBQUwsRUFBYjs7QUFDQSxRQUFJVixVQUFVLEdBQUcsS0FBS0EsVUFBdEI7QUFDQSxRQUFJaUMsYUFBYSxHQUFHLEtBQUt6RCxjQUF6Qjs7QUFFQSxRQUFJd0IsVUFBVSxLQUFLbkQsVUFBVSxDQUFDSSxLQUExQixJQUFtQyxLQUFLa0MsWUFBNUMsRUFBMEQ7QUFDdEQsV0FBSytDLGVBQUwsQ0FBcUIsS0FBSzdCLFdBQTFCO0FBQ0gsS0FGRCxNQUdLLElBQUlMLFVBQVUsS0FBS25ELFVBQVUsQ0FBQ00sS0FBMUIsSUFBbUM4RSxhQUF2QyxFQUFzRDtBQUN2RFIsTUFBQUEsTUFBTSxDQUFDVSxRQUFQLENBQWdCRixhQUFhLENBQUNHLENBQTlCLEVBQWlDSCxhQUFhLENBQUNJLENBQS9DO0FBQ0g7O0FBQ0QsU0FBS2xFLG1CQUFMLEdBQTJCLElBQTNCO0FBQ0gsR0F4VGlCO0FBMFRsQm1FLEVBQUFBLFFBMVRrQixzQkEwVE47QUFDUjtBQUNBLFFBQUksS0FBS2xCLFlBQVQsRUFBdUI7QUFDbkIsV0FBS0EsWUFBTCxDQUFrQm1CLGlCQUFsQjtBQUNIOztBQUNELFFBQUksS0FBS2hCLFdBQVQsRUFBc0I7QUFDbEIsV0FBS0EsV0FBTCxDQUFpQmdCLGlCQUFqQjtBQUNIOztBQUNELFFBQUksS0FBS2pCLGFBQVQsRUFBd0I7QUFDcEIsV0FBS0EsYUFBTCxDQUFtQmlCLGlCQUFuQjtBQUNIOztBQUNELFFBQUksS0FBS2YsY0FBVCxFQUF5QjtBQUNyQixXQUFLQSxjQUFMLENBQW9CZSxpQkFBcEI7QUFDSDs7QUFFRCxRQUFJLENBQUMxRCxTQUFMLEVBQWdCO0FBQ1osV0FBSzJELGtCQUFMO0FBQ0g7O0FBRUQsU0FBS2pELFlBQUw7QUFDSCxHQTlVaUI7QUFnVmxCa0QsRUFBQUEsU0FoVmtCLHVCQWdWTDtBQUNULFNBQUtqRCxXQUFMOztBQUVBLFFBQUksQ0FBQ1gsU0FBTCxFQUFnQjtBQUNaLFdBQUs2RCxvQkFBTDtBQUNIO0FBQ0osR0F0VmlCO0FBd1ZsQmhDLEVBQUFBLFVBeFZrQix3QkF3Vko7QUFDVixXQUFPLEtBQUtlLE1BQUwsR0FBYyxLQUFLQSxNQUFuQixHQUE0QixLQUFLa0IsSUFBeEM7QUFDSCxHQTFWaUI7QUE0VmxCQyxFQUFBQSwyQkE1VmtCLHVDQTRWV0MsSUE1VlgsRUE0VmlCO0FBQy9CLFFBQUksS0FBSzdDLFVBQUwsS0FBb0JuRCxVQUFVLENBQUNLLE1BQW5DLEVBQTJDO0FBQ3ZDLFdBQUs0RixzQkFBTCxDQUE0QkQsSUFBSSxDQUFDRSxXQUFqQztBQUNIO0FBQ0osR0FoV2lCO0FBa1dsQkMsRUFBQUEscUJBbFdrQixpQ0FrV0tsQyxLQWxXTCxFQWtXWTtBQUMxQixRQUFJLEtBQUtkLFVBQUwsS0FBb0JuRCxVQUFVLENBQUNJLEtBQW5DLEVBQTBDO0FBQ3RDLFdBQUtnRyxxQkFBTCxDQUEyQm5DLEtBQTNCO0FBQ0g7QUFDSixHQXRXaUI7QUF3V2xCb0MsRUFBQUEscUJBeFdrQixtQ0F3V087QUFDckIsUUFBSXpCLE1BQU0sR0FBRyxLQUFLZixVQUFMLEVBQWIsQ0FEcUIsQ0FFckI7OztBQUNBLFFBQUksS0FBS2xDLGNBQVQsRUFBeUI7QUFDckIsVUFBSSxLQUFLd0IsVUFBTCxLQUFvQm5ELFVBQVUsQ0FBQ00sS0FBL0IsSUFBd0MsS0FBS2dCLG1CQUFqRCxFQUFzRTtBQUNsRSxhQUFLSyxjQUFMLENBQW9CNEQsQ0FBcEIsR0FBd0JYLE1BQU0sQ0FBQzBCLE1BQS9CO0FBQ0EsYUFBSzNFLGNBQUwsQ0FBb0I2RCxDQUFwQixHQUF3QlosTUFBTSxDQUFDMkIsTUFBL0I7QUFDSDtBQUNKO0FBQ0osR0FqWGlCO0FBbVhsQmxCLEVBQUFBLGVBblhrQiwyQkFtWERwQixLQW5YQyxFQW1YTTtBQUNwQixRQUFJVyxNQUFNLEdBQUcsS0FBS2YsVUFBTCxFQUFiOztBQUNBLFFBQUkyQyxVQUFVLEdBQUd2QyxLQUFLLENBQUN3QyxLQUFOLEVBQWpCO0FBQ0E3QixJQUFBQSxNQUFNLENBQUNkLE9BQVAsR0FBaUIwQyxVQUFVLENBQUN6QyxDQUE1QjtBQUNBeUMsSUFBQUEsVUFBVSxDQUFDekMsQ0FBWCxHQUFlLEdBQWYsQ0FKb0IsQ0FJQzs7QUFDckJhLElBQUFBLE1BQU0sQ0FBQ1gsS0FBUCxHQUFldUMsVUFBZjtBQUNILEdBelhpQjtBQTJYbEJFLEVBQUFBLGNBM1hrQiwwQkEyWEZDLEtBM1hFLEVBMlhLO0FBQ25CLFlBQVFBLEtBQVI7QUFDSSxXQUFLcEcsS0FBSyxDQUFDQyxNQUFYO0FBQ0ksZUFBTyxLQUFLZ0QsV0FBWjs7QUFDSixXQUFLakQsS0FBSyxDQUFDRSxLQUFYO0FBQ0ksZUFBTyxLQUFLeUQsVUFBWjs7QUFDSixXQUFLM0QsS0FBSyxDQUFDRyxPQUFYO0FBQ0ksZUFBTyxLQUFLc0QsWUFBWjs7QUFDSixXQUFLekQsS0FBSyxDQUFDSSxRQUFYO0FBQ0ksZUFBTyxLQUFLd0QsYUFBWjtBQVJSO0FBVUgsR0F0WWlCO0FBd1lsQnlDLEVBQUFBLGVBeFlrQiwyQkF3WURELEtBeFlDLEVBd1lNO0FBQ3BCLFlBQVFBLEtBQVI7QUFDSSxXQUFLcEcsS0FBSyxDQUFDQyxNQUFYO0FBQ0ksZUFBTyxLQUFLK0QsWUFBWjs7QUFDSixXQUFLaEUsS0FBSyxDQUFDRSxLQUFYO0FBQ0ksZUFBTyxLQUFLaUUsV0FBWjs7QUFDSixXQUFLbkUsS0FBSyxDQUFDRyxPQUFYO0FBQ0ksZUFBTyxLQUFLK0QsYUFBWjs7QUFDSixXQUFLbEUsS0FBSyxDQUFDSSxRQUFYO0FBQ0ksZUFBTyxLQUFLZ0UsY0FBWjtBQVJSO0FBVUgsR0FuWmlCO0FBcVpsQnlCLEVBQUFBLHFCQXJaa0IsaUNBcVpLbkMsS0FyWkwsRUFxWlk7QUFDMUIsWUFBUyxLQUFLTCxlQUFMLEVBQVQ7QUFDSSxXQUFLckQsS0FBSyxDQUFDQyxNQUFYO0FBQ0ksYUFBS2dELFdBQUwsR0FBbUJTLEtBQW5CO0FBQ0E7O0FBQ0osV0FBSzFELEtBQUssQ0FBQ0UsS0FBWDtBQUNJLGFBQUt5RCxVQUFMLEdBQWtCRCxLQUFsQjtBQUNBOztBQUNKLFdBQUsxRCxLQUFLLENBQUNHLE9BQVg7QUFDSSxhQUFLc0QsWUFBTCxHQUFvQkMsS0FBcEI7QUFDQTs7QUFDSixXQUFLMUQsS0FBSyxDQUFDSSxRQUFYO0FBQ0ksYUFBS3dELGFBQUwsR0FBcUJGLEtBQXJCO0FBQ0E7QUFaUjtBQWNILEdBcGFpQjtBQXNhbEJnQyxFQUFBQSxzQkF0YWtCLGtDQXNhTUMsV0F0YU4sRUFzYW1CO0FBQ2pDLFlBQVMsS0FBS3RDLGVBQUwsRUFBVDtBQUNJLFdBQUtyRCxLQUFLLENBQUNDLE1BQVg7QUFDSSxhQUFLK0QsWUFBTCxHQUFvQjJCLFdBQXBCO0FBQ0E7O0FBQ0osV0FBSzNGLEtBQUssQ0FBQ0UsS0FBWDtBQUNJLGFBQUtpRSxXQUFMLEdBQW1Cd0IsV0FBbkI7QUFDQTs7QUFDSixXQUFLM0YsS0FBSyxDQUFDRyxPQUFYO0FBQ0ksYUFBSytELGFBQUwsR0FBcUJ5QixXQUFyQjtBQUNBOztBQUNKLFdBQUszRixLQUFLLENBQUNJLFFBQVg7QUFDSSxhQUFLZ0UsY0FBTCxHQUFzQnVCLFdBQXRCO0FBQ0E7QUFaUjtBQWNILEdBcmJpQjtBQXVibEJXLEVBQUFBLE1BdmJrQixrQkF1YlZDLEVBdmJVLEVBdWJOO0FBQ1IsUUFBSWxDLE1BQU0sR0FBRyxLQUFLZixVQUFMLEVBQWI7O0FBQ0EsUUFBSSxLQUFLdkMsbUJBQVQsRUFBOEI7QUFDOUIsUUFBSSxLQUFLNkIsVUFBTCxLQUFvQm5ELFVBQVUsQ0FBQ0ksS0FBL0IsSUFBd0MsS0FBSytDLFVBQUwsS0FBb0JuRCxVQUFVLENBQUNNLEtBQTNFLEVBQWtGO0FBRWxGLFNBQUt5RyxJQUFMLElBQWFELEVBQWI7QUFDQSxRQUFJRSxLQUFLLEdBQUcsR0FBWjs7QUFDQSxRQUFJLEtBQUs1QyxRQUFMLEdBQWdCLENBQXBCLEVBQXVCO0FBQ25CNEMsTUFBQUEsS0FBSyxHQUFHLEtBQUtELElBQUwsR0FBWSxLQUFLM0MsUUFBekI7QUFDSCxLQVRPLENBV1I7OztBQUNBLFFBQUk0QyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNaQSxNQUFBQSxLQUFLLEdBQUcsQ0FBUjtBQUNIOztBQUVELFFBQUksS0FBSzdELFVBQUwsS0FBb0JuRCxVQUFVLENBQUNJLEtBQW5DLEVBQTBDO0FBQ3RDLFVBQUk2RCxLQUFLLEdBQUcsS0FBSzlDLFVBQUwsQ0FBZ0I4RixJQUFoQixDQUFxQixLQUFLN0YsUUFBMUIsRUFBb0M0RixLQUFwQyxDQUFaOztBQUNBLFdBQUszQixlQUFMLENBQXFCcEIsS0FBckI7QUFDSCxLQUhELENBSUE7QUFKQSxTQUtLLElBQUksS0FBS2QsVUFBTCxLQUFvQm5ELFVBQVUsQ0FBQ00sS0FBL0IsSUFBd0MsS0FBS3FCLGNBQWpELEVBQWlFO0FBQ2xFaUQsUUFBQUEsTUFBTSxDQUFDc0MsS0FBUCxHQUFlLEtBQUszRixVQUFMLENBQWdCMEYsSUFBaEIsQ0FBcUIsS0FBS3ZGLFFBQTFCLEVBQW9Dc0YsS0FBcEMsQ0FBZjtBQUNIOztBQUVELFFBQUlBLEtBQUssS0FBSyxDQUFkLEVBQWlCO0FBQ2IsV0FBSzFGLG1CQUFMLEdBQTJCLElBQTNCO0FBQ0g7QUFFSixHQXBkaUI7QUFzZGxCcUUsRUFBQUEsa0JBdGRrQixnQ0FzZEk7QUFDbEIsU0FBS0csSUFBTCxDQUFVcUIsRUFBVixDQUFhbEgsRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQkMsV0FBL0IsRUFBNEMsS0FBS0MsYUFBakQsRUFBZ0UsSUFBaEU7QUFDQSxTQUFLeEIsSUFBTCxDQUFVcUIsRUFBVixDQUFhbEgsRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQkcsVUFBL0IsRUFBMkMsS0FBS0MsWUFBaEQsRUFBOEQsSUFBOUQ7QUFDQSxTQUFLMUIsSUFBTCxDQUFVcUIsRUFBVixDQUFhbEgsRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQkssU0FBL0IsRUFBMEMsS0FBS0MsYUFBL0MsRUFBOEQsSUFBOUQ7QUFDQSxTQUFLNUIsSUFBTCxDQUFVcUIsRUFBVixDQUFhbEgsRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQk8sWUFBL0IsRUFBNkMsS0FBS0MsY0FBbEQsRUFBa0UsSUFBbEU7QUFFQSxTQUFLOUIsSUFBTCxDQUFVcUIsRUFBVixDQUFhbEgsRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQlMsV0FBL0IsRUFBNEMsS0FBS0MsY0FBakQsRUFBaUUsSUFBakU7QUFDQSxTQUFLaEMsSUFBTCxDQUFVcUIsRUFBVixDQUFhbEgsRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQlcsV0FBL0IsRUFBNEMsS0FBS0MsZUFBakQsRUFBa0UsSUFBbEU7QUFDSCxHQTlkaUI7QUFnZWxCbkMsRUFBQUEsb0JBaGVrQixrQ0FnZU07QUFDcEIsU0FBS0MsSUFBTCxDQUFVbUMsR0FBVixDQUFjaEksRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQkMsV0FBaEMsRUFBNkMsS0FBS0MsYUFBbEQsRUFBaUUsSUFBakU7QUFDQSxTQUFLeEIsSUFBTCxDQUFVbUMsR0FBVixDQUFjaEksRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQkcsVUFBaEMsRUFBNEMsS0FBS0MsWUFBakQsRUFBK0QsSUFBL0Q7QUFDQSxTQUFLMUIsSUFBTCxDQUFVbUMsR0FBVixDQUFjaEksRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQkssU0FBaEMsRUFBMkMsS0FBS0MsYUFBaEQsRUFBK0QsSUFBL0Q7QUFDQSxTQUFLNUIsSUFBTCxDQUFVbUMsR0FBVixDQUFjaEksRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQk8sWUFBaEMsRUFBOEMsS0FBS0MsY0FBbkQsRUFBbUUsSUFBbkU7QUFFQSxTQUFLOUIsSUFBTCxDQUFVbUMsR0FBVixDQUFjaEksRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQlMsV0FBaEMsRUFBNkMsS0FBS0MsY0FBbEQsRUFBa0UsSUFBbEU7QUFDQSxTQUFLaEMsSUFBTCxDQUFVbUMsR0FBVixDQUFjaEksRUFBRSxDQUFDNEUsSUFBSCxDQUFRdUMsU0FBUixDQUFrQlcsV0FBaEMsRUFBNkMsS0FBS0MsZUFBbEQsRUFBbUUsSUFBbkU7QUFDSCxHQXhlaUI7QUEwZWxCRSxFQUFBQSxvQkExZWtCLGdDQTBlSXRELE1BMWVKLEVBMGVZO0FBQzFCLFFBQUk1QyxTQUFKLEVBQWU7QUFDWDRDLE1BQUFBLE1BQU0sQ0FBQ3VDLEVBQVAsQ0FBVSxxQkFBVixFQUFpQyxLQUFLcEIsMkJBQXRDLEVBQW1FLElBQW5FO0FBQ0FuQixNQUFBQSxNQUFNLENBQUN1QyxFQUFQLENBQVVsSCxFQUFFLENBQUM0RSxJQUFILENBQVF1QyxTQUFSLENBQWtCZSxhQUE1QixFQUEyQyxLQUFLaEMscUJBQWhELEVBQXVFLElBQXZFO0FBQ0g7O0FBQ0R2QixJQUFBQSxNQUFNLENBQUN1QyxFQUFQLENBQVVsSCxFQUFFLENBQUM0RSxJQUFILENBQVF1QyxTQUFSLENBQWtCZ0IsYUFBNUIsRUFBMkMsS0FBSy9CLHFCQUFoRCxFQUF1RSxJQUF2RTtBQUNILEdBaGZpQjtBQWtmbEJ0QixFQUFBQSxzQkFsZmtCLGtDQWtmTUgsTUFsZk4sRUFrZmM7QUFDNUIsUUFBSTVDLFNBQUosRUFBZTtBQUNYNEMsTUFBQUEsTUFBTSxDQUFDcUQsR0FBUCxDQUFXLHFCQUFYLEVBQWtDLEtBQUtsQywyQkFBdkMsRUFBb0UsSUFBcEU7QUFDQW5CLE1BQUFBLE1BQU0sQ0FBQ3FELEdBQVAsQ0FBV2hJLEVBQUUsQ0FBQzRFLElBQUgsQ0FBUXVDLFNBQVIsQ0FBa0JlLGFBQTdCLEVBQTRDLEtBQUtoQyxxQkFBakQsRUFBd0UsSUFBeEU7QUFDSDs7QUFDRHZCLElBQUFBLE1BQU0sQ0FBQ3FELEdBQVAsQ0FBV2hJLEVBQUUsQ0FBQzRFLElBQUgsQ0FBUXVDLFNBQVIsQ0FBa0JnQixhQUE3QixFQUE0QyxLQUFLL0IscUJBQWpELEVBQXdFLElBQXhFO0FBQ0gsR0F4ZmlCO0FBMGZsQmdDLEVBQUFBLGdCQTFma0IsNEJBMGZBekQsTUExZkEsRUEwZlE7QUFDdEIsUUFBSTBELE1BQU0sR0FBRyxJQUFiOztBQUNBLFFBQUkxRCxNQUFKLEVBQVk7QUFDUjBELE1BQUFBLE1BQU0sR0FBRzFELE1BQU0sQ0FBQzJELFlBQVAsQ0FBb0J0SSxFQUFFLENBQUN1SSxNQUF2QixDQUFUO0FBQ0g7O0FBQ0QsV0FBT0YsTUFBUDtBQUNILEdBaGdCaUI7QUFrZ0JsQnhELEVBQUFBLFlBbGdCa0IsMEJBa2dCRjtBQUNaLFFBQUlGLE1BQU0sR0FBRyxLQUFLZixVQUFMLEVBQWI7O0FBQ0EsU0FBSy9CLE9BQUwsR0FBZSxLQUFLdUcsZ0JBQUwsQ0FBc0J6RCxNQUF0QixDQUFmOztBQUNBLFFBQUksQ0FBQyxLQUFLakQsY0FBVixFQUEwQjtBQUN0QixXQUFLQSxjQUFMLEdBQXNCMUIsRUFBRSxDQUFDdUIsSUFBSCxDQUFRQyxJQUE5QjtBQUNIOztBQUNELFNBQUtFLGNBQUwsQ0FBb0I0RCxDQUFwQixHQUF3QlgsTUFBTSxDQUFDMEIsTUFBL0I7QUFDQSxTQUFLM0UsY0FBTCxDQUFvQjZELENBQXBCLEdBQXdCWixNQUFNLENBQUMyQixNQUEvQjs7QUFFQSxTQUFLMkIsb0JBQUwsQ0FBMEJ0RCxNQUExQjtBQUNILEdBNWdCaUI7QUE4Z0JsQjtBQUNBMEMsRUFBQUEsYUEvZ0JrQix5QkErZ0JIbUIsS0EvZ0JHLEVBK2dCSTtBQUNsQixRQUFJLENBQUMsS0FBS25HLFlBQU4sSUFBc0IsQ0FBQyxLQUFLb0csa0JBQWhDLEVBQW9EO0FBRXBELFNBQUt6SCxRQUFMLEdBQWdCLElBQWhCOztBQUNBLFNBQUt5QixZQUFMOztBQUNBK0YsSUFBQUEsS0FBSyxDQUFDRSxlQUFOO0FBQ0gsR0FyaEJpQjtBQXVoQmxCbkIsRUFBQUEsWUF2aEJrQix3QkF1aEJKaUIsS0F2aEJJLEVBdWhCRztBQUNqQixRQUFJLENBQUMsS0FBS25HLFlBQU4sSUFBc0IsQ0FBQyxLQUFLb0csa0JBQTVCLElBQWtELENBQUMsS0FBS3pILFFBQTVELEVBQXNFLE9BRHJELENBRWpCO0FBQ0E7O0FBQ0EsUUFBSTJILEtBQUssR0FBR0gsS0FBSyxDQUFDRyxLQUFsQjs7QUFDQSxRQUFJQyxHQUFHLEdBQUcsS0FBSy9DLElBQUwsQ0FBVWdELFFBQVYsQ0FBbUJGLEtBQUssQ0FBQ0csV0FBTixFQUFuQixDQUFWOztBQUNBLFFBQUluRSxNQUFNLEdBQUcsS0FBS2YsVUFBTCxFQUFiOztBQUNBLFFBQUl1QixhQUFhLEdBQUcsS0FBS3pELGNBQXpCOztBQUVBLFFBQUksS0FBS3dCLFVBQUwsS0FBb0JuRCxVQUFVLENBQUNNLEtBQS9CLElBQXdDOEUsYUFBNUMsRUFBMkQ7QUFDdkQsVUFBSXlELEdBQUosRUFBUztBQUNMLGFBQUt0SCxVQUFMLENBQWdCZ0UsQ0FBaEIsR0FBb0JILGFBQWEsQ0FBQ0csQ0FBbEM7QUFDQSxhQUFLaEUsVUFBTCxDQUFnQmlFLENBQWhCLEdBQW9CSixhQUFhLENBQUNJLENBQWxDO0FBQ0EsYUFBSzlELFFBQUwsQ0FBYzZELENBQWQsR0FBa0JILGFBQWEsQ0FBQ0csQ0FBZCxHQUFrQixLQUFLakIsU0FBekM7QUFDQSxhQUFLNUMsUUFBTCxDQUFjOEQsQ0FBZCxHQUFrQkosYUFBYSxDQUFDSSxDQUFkLEdBQWtCLEtBQUtsQixTQUF6QztBQUNBLGFBQUtoRCxtQkFBTCxHQUEyQixLQUEzQjtBQUNILE9BTkQsTUFNTztBQUNILGFBQUt5RixJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUt6RixtQkFBTCxHQUEyQixJQUEzQjtBQUNBc0QsUUFBQUEsTUFBTSxDQUFDVSxRQUFQLENBQWdCRixhQUFhLENBQUNHLENBQTlCLEVBQWlDSCxhQUFhLENBQUNJLENBQS9DO0FBQ0g7QUFDSixLQVpELE1BWU87QUFDSCxVQUFJbUIsS0FBSjs7QUFDQSxVQUFJa0MsR0FBSixFQUFTO0FBQ0xsQyxRQUFBQSxLQUFLLEdBQUdwRyxLQUFLLENBQUNHLE9BQWQ7QUFDSCxPQUZELE1BRU87QUFDSGlHLFFBQUFBLEtBQUssR0FBR3BHLEtBQUssQ0FBQ0MsTUFBZDtBQUNIOztBQUNELFdBQUt3SSxnQkFBTCxDQUFzQnJDLEtBQXRCO0FBQ0g7O0FBQ0Q4QixJQUFBQSxLQUFLLENBQUNFLGVBQU47QUFDSCxHQXRqQmlCO0FBd2pCbEJqQixFQUFBQSxhQXhqQmtCLHlCQXdqQkhlLEtBeGpCRyxFQXdqQkk7QUFDbEIsUUFBSSxDQUFDLEtBQUtuRyxZQUFOLElBQXNCLENBQUMsS0FBS29HLGtCQUFoQyxFQUFvRDs7QUFFcEQsUUFBSSxLQUFLekgsUUFBVCxFQUFtQjtBQUNmaEIsTUFBQUEsRUFBRSxDQUFDSixTQUFILENBQWFvRixZQUFiLENBQTBCZ0UsVUFBMUIsQ0FBcUMsS0FBS2pFLFdBQTFDLEVBQXVEeUQsS0FBdkQ7QUFDQSxXQUFLM0MsSUFBTCxDQUFVb0QsSUFBVixDQUFlLE9BQWYsRUFBd0IsSUFBeEI7QUFDSDs7QUFDRCxTQUFLakksUUFBTCxHQUFnQixLQUFoQjs7QUFDQSxTQUFLeUIsWUFBTDs7QUFDQStGLElBQUFBLEtBQUssQ0FBQ0UsZUFBTjtBQUNILEdBbGtCaUI7QUFva0JsQmYsRUFBQUEsY0Fwa0JrQiw0QkFva0JBO0FBQ2QsUUFBSSxDQUFDLEtBQUt0RixZQUFOLElBQXNCLENBQUMsS0FBS29HLGtCQUFoQyxFQUFvRDtBQUVwRCxTQUFLekgsUUFBTCxHQUFnQixLQUFoQjs7QUFDQSxTQUFLeUIsWUFBTDtBQUNILEdBemtCaUI7QUEya0JsQm9GLEVBQUFBLGNBM2tCa0IsNEJBMmtCQTtBQUNkLFFBQUksS0FBSzdHLFFBQUwsSUFBaUIsQ0FBQyxLQUFLcUIsWUFBdkIsSUFBdUMsQ0FBQyxLQUFLb0csa0JBQWpELEVBQXFFO0FBQ3JFLFFBQUksS0FBS3ZGLFVBQUwsS0FBb0JuRCxVQUFVLENBQUNLLE1BQS9CLElBQXlDLENBQUMsS0FBS3FFLFdBQW5ELEVBQWdFOztBQUVoRSxRQUFJLENBQUMsS0FBS3hELFFBQVYsRUFBb0I7QUFDaEIsV0FBS0EsUUFBTCxHQUFnQixJQUFoQjs7QUFDQSxXQUFLd0IsWUFBTDtBQUNIO0FBQ0osR0FubEJpQjtBQXFsQmxCc0YsRUFBQUEsZUFybEJrQiw2QkFxbEJDO0FBQ2YsUUFBSSxLQUFLOUcsUUFBVCxFQUFtQjtBQUNmLFdBQUtBLFFBQUwsR0FBZ0IsS0FBaEI7O0FBQ0EsV0FBS3dCLFlBQUw7QUFDSDtBQUNKLEdBMWxCaUI7QUE0bEJsQjtBQUNBQSxFQUFBQSxZQTdsQmtCLDBCQTZsQkY7QUFDWixRQUFJaUUsS0FBSyxHQUFHLEtBQUsvQyxlQUFMLEVBQVo7O0FBQ0EsU0FBS29GLGdCQUFMLENBQXNCckMsS0FBdEI7O0FBQ0EsU0FBS3pELG9CQUFMO0FBQ0gsR0FqbUJpQjtBQW1tQmxCVSxFQUFBQSxlQW5tQmtCLDZCQW1tQkM7QUFDZixRQUFJK0MsS0FBSjs7QUFDQSxRQUFJLENBQUMsS0FBS3JFLFlBQVYsRUFBd0I7QUFDcEJxRSxNQUFBQSxLQUFLLEdBQUdwRyxLQUFLLENBQUNJLFFBQWQ7QUFDSCxLQUZELE1BR0ssSUFBSSxLQUFLTSxRQUFULEVBQW1CO0FBQ3BCMEYsTUFBQUEsS0FBSyxHQUFHcEcsS0FBSyxDQUFDRyxPQUFkO0FBQ0gsS0FGSSxNQUdBLElBQUksS0FBS1EsUUFBVCxFQUFtQjtBQUNwQnlGLE1BQUFBLEtBQUssR0FBR3BHLEtBQUssQ0FBQ0UsS0FBZDtBQUNILEtBRkksTUFHQTtBQUNEa0csTUFBQUEsS0FBSyxHQUFHcEcsS0FBSyxDQUFDQyxNQUFkO0FBQ0g7O0FBQ0QsV0FBT21HLEtBQVA7QUFDSCxHQWxuQmlCO0FBb25CbEJ3QyxFQUFBQSxpQ0FwbkJrQiw2Q0FvbkJpQnhDLEtBcG5CakIsRUFvbkJ3QjtBQUN0QyxRQUFJMUMsS0FBSyxHQUFHLEtBQUt5QyxjQUFMLENBQW9CQyxLQUFwQixDQUFaOztBQUNBLFNBQUt0QixlQUFMLENBQXFCcEIsS0FBckI7O0FBQ0EsU0FBSzlDLFVBQUwsR0FBa0I4QyxLQUFLLENBQUN3QyxLQUFOLEVBQWxCO0FBQ0EsU0FBS3JGLFFBQUwsR0FBZ0I2QyxLQUFoQjtBQUNILEdBem5CaUI7QUEybkJsQm1GLEVBQUFBLHNCQTNuQmtCLGtDQTJuQk16QyxLQTNuQk4sRUEybkJhO0FBQzNCLFFBQUkzRSxTQUFTLElBQUkyRSxLQUFLLEtBQUtwRyxLQUFLLENBQUNJLFFBQWpDLEVBQTJDO0FBQ3ZDLFdBQUt3SSxpQ0FBTCxDQUF1Q3hDLEtBQXZDO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsVUFBSS9CLE1BQU0sR0FBRyxLQUFLZixVQUFMLEVBQWI7O0FBQ0EsVUFBSUksS0FBSyxHQUFHLEtBQUt5QyxjQUFMLENBQW9CQyxLQUFwQixDQUFaOztBQUNBLFdBQUt4RixVQUFMLEdBQWtCeUQsTUFBTSxDQUFDWCxLQUFQLENBQWF3QyxLQUFiLEVBQWxCO0FBQ0EsV0FBS3JGLFFBQUwsR0FBZ0I2QyxLQUFoQjtBQUNBLFdBQUs4QyxJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUt6RixtQkFBTCxHQUEyQixLQUEzQjtBQUNIO0FBQ0osR0F0b0JpQjtBQXdvQmxCK0gsRUFBQUEsdUJBeG9Ca0IsbUNBd29CTzFDLEtBeG9CUCxFQXdvQmM7QUFDNUIsUUFBSTJCLE1BQU0sR0FBRyxLQUFLMUIsZUFBTCxDQUFxQkQsS0FBckIsQ0FBYjs7QUFDQSxRQUFJLEtBQUs3RSxPQUFMLElBQWdCd0csTUFBcEIsRUFBNEI7QUFDeEIsV0FBS3hHLE9BQUwsQ0FBYW9FLFdBQWIsR0FBMkJvQyxNQUEzQjtBQUNIO0FBQ0osR0E3b0JpQjtBQStvQmxCZ0IsRUFBQUEsc0JBL29Ca0Isa0NBK29CTTNDLEtBL29CTixFQStvQmE7QUFDM0IsUUFBSUEsS0FBSyxLQUFLcEcsS0FBSyxDQUFDRyxPQUFwQixFQUE2QjtBQUN6QixXQUFLNkksT0FBTDtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtDLFNBQUw7QUFDSDtBQUNKLEdBcnBCaUI7QUF1cEJsQkQsRUFBQUEsT0F2cEJrQixxQkF1cEJQO0FBQ1A7QUFDQSxRQUFJLENBQUMsS0FBSzVILGNBQVYsRUFBMEI7QUFDdEI7QUFDSDs7QUFFRCxTQUFLSixVQUFMLENBQWdCZ0UsQ0FBaEIsR0FBb0IsS0FBSzVELGNBQUwsQ0FBb0I0RCxDQUF4QztBQUNBLFNBQUtoRSxVQUFMLENBQWdCaUUsQ0FBaEIsR0FBb0IsS0FBSzdELGNBQUwsQ0FBb0I2RCxDQUF4QztBQUNBLFNBQUs5RCxRQUFMLENBQWM2RCxDQUFkLEdBQWtCLEtBQUs1RCxjQUFMLENBQW9CNEQsQ0FBcEIsR0FBd0IsS0FBS2pCLFNBQS9DO0FBQ0EsU0FBSzVDLFFBQUwsQ0FBYzhELENBQWQsR0FBa0IsS0FBSzdELGNBQUwsQ0FBb0I2RCxDQUFwQixHQUF3QixLQUFLbEIsU0FBL0M7QUFDQSxTQUFLeUMsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLekYsbUJBQUwsR0FBMkIsS0FBM0I7QUFDSCxHQW5xQmlCO0FBcXFCbEJrSSxFQUFBQSxTQXJxQmtCLHVCQXFxQkw7QUFDVDtBQUNBLFFBQUksQ0FBQyxLQUFLN0gsY0FBVixFQUEwQjtBQUN0QjtBQUNIOztBQUVELFFBQUlpRCxNQUFNLEdBQUcsS0FBS2YsVUFBTCxFQUFiOztBQUNBLFNBQUt0QyxVQUFMLENBQWdCZ0UsQ0FBaEIsR0FBb0JYLE1BQU0sQ0FBQzBCLE1BQTNCO0FBQ0EsU0FBSy9FLFVBQUwsQ0FBZ0JpRSxDQUFoQixHQUFvQlosTUFBTSxDQUFDMkIsTUFBM0I7QUFDQSxTQUFLN0UsUUFBTCxDQUFjNkQsQ0FBZCxHQUFrQixLQUFLNUQsY0FBTCxDQUFvQjRELENBQXRDO0FBQ0EsU0FBSzdELFFBQUwsQ0FBYzhELENBQWQsR0FBa0IsS0FBSzdELGNBQUwsQ0FBb0I2RCxDQUF0QztBQUNBLFNBQUt1QixJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUt6RixtQkFBTCxHQUEyQixLQUEzQjtBQUNILEdBbHJCaUI7QUFvckJsQmdDLEVBQUFBLGlCQXByQmtCLDZCQW9yQkNtRyxhQXByQkQsRUFvckJnQjtBQUM5QjtBQUNBLFFBQUlBLGFBQWEsS0FBS3pKLFVBQVUsQ0FBQ0ksS0FBakMsRUFBd0M7QUFDcEMsV0FBSytJLGlDQUFMLENBQXVDNUksS0FBSyxDQUFDQyxNQUE3QztBQUNILEtBRkQsTUFHSyxJQUFJaUosYUFBYSxLQUFLekosVUFBVSxDQUFDSyxNQUFqQyxFQUF5QztBQUMxQyxXQUFLZ0osdUJBQUwsQ0FBNkI5SSxLQUFLLENBQUNDLE1BQW5DO0FBQ0g7O0FBQ0QsU0FBS2tDLFlBQUw7QUFDSCxHQTdyQmlCO0FBK3JCbEJzRyxFQUFBQSxnQkEvckJrQiw0QkErckJBckMsS0EvckJBLEVBK3JCTztBQUNyQixRQUFJeEQsVUFBVSxHQUFHLEtBQUtBLFVBQXRCOztBQUNBLFFBQUlBLFVBQVUsS0FBS25ELFVBQVUsQ0FBQ0ksS0FBOUIsRUFBcUM7QUFDakMsV0FBS2dKLHNCQUFMLENBQTRCekMsS0FBNUI7QUFDSCxLQUZELE1BRU8sSUFBSXhELFVBQVUsS0FBS25ELFVBQVUsQ0FBQ0ssTUFBOUIsRUFBc0M7QUFDekMsV0FBS2dKLHVCQUFMLENBQTZCMUMsS0FBN0I7QUFDSCxLQUZNLE1BRUEsSUFBSXhELFVBQVUsS0FBS25ELFVBQVUsQ0FBQ00sS0FBOUIsRUFBcUM7QUFDeEMsV0FBS2dKLHNCQUFMLENBQTRCM0MsS0FBNUI7QUFDSDtBQUNKLEdBeHNCaUI7QUEwc0JsQjNELEVBQUFBLHVCQUF1QixFQUFFaEIsU0FBUyxJQUFJLFlBQVk7QUFDOUMsU0FBSzhELElBQUwsQ0FBVTRELGNBQVYsQ0FBeUIsS0FBSzdGLFVBQUwsR0FBa0I4RixjQUFsQixFQUF6QjtBQUNILEdBNXNCaUI7QUE4c0JsQnpHLEVBQUFBLG9CQTlzQmtCLGdDQThzQkkwRyxLQTlzQkosRUE4c0JXO0FBQ3pCLFFBQUksQ0FBQyxLQUFLOUgsT0FBVixFQUFtQjs7QUFFbkIsUUFBSSxLQUFLbUIsb0JBQUwsSUFBNkIyRyxLQUFqQyxFQUF3QztBQUNwQyxVQUFJQyxlQUFlLEdBQUcsS0FBdEI7O0FBRUEsVUFBSSxFQUFFLEtBQUsxRyxVQUFMLEtBQW9CbkQsVUFBVSxDQUFDSyxNQUEvQixJQUF5QyxLQUFLc0UsY0FBaEQsQ0FBSixFQUFxRTtBQUNqRWtGLFFBQUFBLGVBQWUsR0FBRyxLQUFLNUcsb0JBQUwsSUFBNkIsQ0FBQyxLQUFLWCxZQUFyRDtBQUNIOztBQUNELFdBQUt3SCxtQkFBTCxDQUF5QkQsZUFBekIsRUFBMEMsS0FBSy9ILE9BQS9DO0FBQ0g7QUFDSjtBQXp0QmlCLENBQVQsQ0FBYjtBQTR0QkE3QixFQUFFLENBQUNXLE1BQUgsR0FBWW1KLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBKLE1BQTdCO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKTtcbmNvbnN0IEdyYXlTcHJpdGVTdGF0ZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dyYXktc3ByaXRlLXN0YXRlJyk7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciB0cmFuc2l0aW9uIHR5cGUuXG4gKiAhI3poIOi/h+a4oeexu+Wei1xuICogQGVudW0gQnV0dG9uLlRyYW5zaXRpb25cbiAqL1xubGV0IFRyYW5zaXRpb24gPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBub25lIHR5cGUuXG4gICAgICogISN6aCDkuI3lgZrku7vkvZXov4fmuKFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTk9ORVxuICAgICAqL1xuICAgIE5PTkU6IDAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb2xvciB0eXBlLlxuICAgICAqICEjemgg6aKc6Imy6L+H5rihXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTE9SXG4gICAgICovXG4gICAgQ09MT1I6IDEsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzcHJpdGUgdHlwZS5cbiAgICAgKiAhI3poIOeyvueBtei/h+a4oVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUFJJVEVcbiAgICAgKi9cbiAgICBTUFJJVEU6IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2NhbGUgdHlwZVxuICAgICAqICEjemgg57yp5pS+6L+H5rihXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNDQUxFXG4gICAgICovXG4gICAgU0NBTEU6IDNcbn0pO1xuXG5jb25zdCBTdGF0ZSA9IGNjLkVudW0oe1xuICAgIE5PUk1BTDogMCxcbiAgICBIT1ZFUjogMSxcbiAgICBQUkVTU0VEOiAyLFxuICAgIERJU0FCTEVEOiAzLFxufSk7XG5cbi8qKlxuICogISNlblxuICogQnV0dG9uIGhhcyA0IFRyYW5zaXRpb24gdHlwZXM8YnIvPlxuICogV2hlbiBCdXR0b24gc3RhdGUgY2hhbmdlZDo8YnIvPlxuICogIElmIFRyYW5zaXRpb24gdHlwZSBpcyBCdXR0b24uVHJhbnNpdGlvbi5OT05FLCBCdXR0b24gd2lsbCBkbyBub3RoaW5nPGJyLz5cbiAqICBJZiBUcmFuc2l0aW9uIHR5cGUgaXMgQnV0dG9uLlRyYW5zaXRpb24uQ09MT1IsIEJ1dHRvbiB3aWxsIGNoYW5nZSB0YXJnZXQncyBjb2xvcjxici8+XG4gKiAgSWYgVHJhbnNpdGlvbiB0eXBlIGlzIEJ1dHRvbi5UcmFuc2l0aW9uLlNQUklURSwgQnV0dG9uIHdpbGwgY2hhbmdlIHRhcmdldCBTcHJpdGUncyBzcHJpdGU8YnIvPlxuICogIElmIFRyYW5zaXRpb24gdHlwZSBpcyBCdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgQnV0dG9uIHdpbGwgY2hhbmdlIHRhcmdldCBub2RlJ3Mgc2NhbGU8YnIvPlxuICpcbiAqIEJ1dHRvbiB3aWxsIHRyaWdnZXIgNSBldmVudHM6PGJyLz5cbiAqICBCdXR0b24uRVZFTlRfVE9VQ0hfRE9XTjxici8+XG4gKiAgQnV0dG9uLkVWRU5UX1RPVUNIX1VQPGJyLz5cbiAqICBCdXR0b24uRVZFTlRfSE9WRVJfSU48YnIvPlxuICogIEJ1dHRvbi5FVkVOVF9IT1ZFUl9NT1ZFPGJyLz5cbiAqICBCdXR0b24uRVZFTlRfSE9WRVJfT1VUPGJyLz5cbiAqICBVc2VyIGNhbiBnZXQgdGhlIGN1cnJlbnQgY2xpY2tlZCBub2RlIHdpdGggJ2V2ZW50LnRhcmdldCcgZnJvbSBldmVudCBvYmplY3Qgd2hpY2ggaXMgcGFzc2VkIGFzIHBhcmFtZXRlciBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb2YgY2xpY2sgZXZlbnQuXG4gKlxuICogISN6aFxuICog5oyJ6ZKu57uE5Lu244CC5Y+v5Lul6KKr5oyJ5LiL77yM5oiW6ICF54K55Ye744CCXG4gKlxuICog5oyJ6ZKu5Y+v5Lul6YCa6L+H5L+u5pS5IFRyYW5zaXRpb24g5p2l6K6+572u5oyJ6ZKu54q25oCB6L+H5rih55qE5pa55byP77yaXG4gKiBcbiAqICAgLSBCdXR0b24uVHJhbnNpdGlvbi5OT05FICAgLy8g5LiN5YGa5Lu75L2V6L+H5rihXG4gKiAgIC0gQnV0dG9uLlRyYW5zaXRpb24uQ09MT1IgIC8vIOi/m+ihjOminOiJsuS5i+mXtOi/h+a4oVxuICogICAtIEJ1dHRvbi5UcmFuc2l0aW9uLlNQUklURSAvLyDov5vooYznsr7ngbXkuYvpl7Tov4fmuKFcbiAqICAgLSBCdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSAvLyDov5vooYznvKnmlL7ov4fmuKFcbiAqXG4gKiDmjInpkq7lj6/ku6Xnu5Hlrprkuovku7bvvIjkvYbmmK/lv4XpobvopoHlnKjmjInpkq7nmoQgTm9kZSDkuIrmiY3og73nu5Hlrprkuovku7bvvInvvJo8YnIvPlxuICog5Lul5LiL5LqL5Lu25Y+v5Lul5Zyo5YWo5bmz5Y+w5LiK6YO96Kem5Y+R77yaXG4gKiBcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCAgLy8g5oyJ5LiL5pe25LqL5Lu2XG4gKiAgIC0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTW92ZSAgIC8vIOaMieS9j+enu+WKqOWQjuS6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCAgICAvLyDmjInkuIvlkI7mnb7lvIDlkI7kuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwgLy8g5oyJ5LiL5Y+W5raI5LqL5Lu2XG4gKiBcbiAqIOS7peS4i+S6i+S7tuWPquWcqCBQQyDlubPlj7DkuIrop6blj5HvvJpcbiAqIFxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0RPV04gIC8vIOm8oOagh+aMieS4i+aXtuS6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX01PVkUgIC8vIOm8oOagh+aMieS9j+enu+WKqOWQjuS6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSIC8vIOm8oOagh+i/m+WFpeebruagh+S6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFIC8vIOm8oOagh+emu+W8gOebruagh+S6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1VQICAgIC8vIOm8oOagh+advuW8gOS6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1dIRUVMIC8vIOm8oOagh+a7mui9ruS6i+S7tlxuICogXG4gKiDnlKjmiLflj6/ku6XpgJrov4fojrflj5YgX1/ngrnlh7vkuovku7ZfXyDlm57osIPlh73mlbDnmoTlj4LmlbAgZXZlbnQg55qEIHRhcmdldCDlsZ7mgKfojrflj5blvZPliY3ngrnlh7vlr7nosaHjgIJcbiAqIEBjbGFzcyBCdXR0b25cbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICogQHVzZXMgR3JheVNwcml0ZVN0YXRlXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEFkZCBhbiBldmVudCB0byB0aGUgYnV0dG9uLlxuICogYnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uIChldmVudCkge1xuICogICAgIGNjLmxvZyhcIlRoaXMgaXMgYSBjYWxsYmFjayBhZnRlciB0aGUgdHJpZ2dlciBldmVudFwiKTtcbiAqIH0pO1xuXG4gKiAvLyBZb3UgY291bGQgYWxzbyBhZGQgYSBjbGljayBldmVudFxuICogLy9Ob3RlOiBJbiB0aGlzIHdheSwgeW91IGNhbid0IGdldCB0aGUgdG91Y2ggZXZlbnQgaW5mbywgc28gdXNlIGl0IHdpc2VseS5cbiAqIGJ1dHRvbi5ub2RlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChidXR0b24pIHtcbiAqICAgIC8vVGhlIGV2ZW50IGlzIGEgY3VzdG9tIGV2ZW50LCB5b3UgY291bGQgZ2V0IHRoZSBCdXR0b24gY29tcG9uZW50IHZpYSBmaXJzdCBhcmd1bWVudFxuICogfSlcbiAqXG4gKi9cbmxldCBCdXR0b24gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkJ1dHRvbicsXG4gICAgZXh0ZW5kczogQ29tcG9uZW50LFxuICAgIG1peGluczogW0dyYXlTcHJpdGVTdGF0ZV0sXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9ob3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Zyb21Db2xvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RvQ29sb3IgPSBudWxsO1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gaW5pdCBfb3JpZ2luYWxTY2FsZSBpbiBfX3ByZWxvYWQoKVxuICAgICAgICB0aGlzLl9mcm9tU2NhbGUgPSBjYy5WZWMyLlpFUk87XG4gICAgICAgIHRoaXMuX3RvU2NhbGUgPSBjYy5WZWMyLlpFUk87XG4gICAgICAgIHRoaXMuX29yaWdpbmFsU2NhbGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2dyYXlTcHJpdGVNYXRlcmlhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nwcml0ZU1hdGVyaWFsID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zcHJpdGUgPSBudWxsO1xuICAgIH0sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvQnV0dG9uJyxcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLmJ1dHRvbicsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvYnV0dG9uLmpzJyxcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWVcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBCdXR0b24gaXMgZGlzYWJsZWQuXG4gICAgICAgICAqIElmIHRydWUsIHRoZSBCdXR0b24gd2lsbCB0cmlnZ2VyIGV2ZW50IGFuZCBkbyB0cmFuc2l0aW9uLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaMiemSruS6i+S7tuaYr+WQpuiiq+WTjeW6lO+8jOWmguaenOS4uiBmYWxzZe+8jOWImeaMiemSruWwhuiiq+emgeeUqOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGludGVyYWN0YWJsZVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBpbnRlcmFjdGFibGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmJ1dHRvbi5pbnRlcmFjdGFibGUnLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmludGVyYWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3Jlc2l6ZVRvVGFyZ2V0OiB7XG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplTm9kZVRvVGFyZ2V0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGVuIHRoaXMgZmxhZyBpcyB0cnVlLCBCdXR0b24gdGFyZ2V0IHNwcml0ZSB3aWxsIHR1cm4gZ3JheSB3aGVuIGludGVyYWN0YWJsZSBpcyBmYWxzZS5cbiAgICAgICAgICogISN6aCDlpoLmnpzov5nkuKrmoIforrDkuLogdHJ1Ze+8jOW9kyBidXR0b24g55qEIGludGVyYWN0YWJsZSDlsZ7mgKfkuLogZmFsc2Ug55qE5pe25YCZ77yM5Lya5L2/55So5YaF572uIHNoYWRlciDorqkgYnV0dG9uIOeahCB0YXJnZXQg6IqC54K555qEIHNwcml0ZSDnu4Tku7blj5jngbBcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVBdXRvR3JheUVmZmVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlQXV0b0dyYXlFZmZlY3Q6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uYXV0b19ncmF5X2VmZmVjdCcsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVHJhbnNpdGlvbiB0eXBlXG4gICAgICAgICAqICEjemgg5oyJ6ZKu54q25oCB5pS55Y+Y5pe26L+H5rih5pa55byP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QnV0dG9uLlRyYW5zaXRpb259IHRyYW5zaXRpb25cbiAgICAgICAgICogQGRlZmF1bHQgQnV0dG9uLlRyYW5zaXRpb24uTm9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogVHJhbnNpdGlvbi5OT05FLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24udHJhbnNpdGlvbicsXG4gICAgICAgICAgICB0eXBlOiBUcmFuc2l0aW9uLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVHJhbnNpdGlvbihvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICd0cmFuc2l0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNvbG9yIHRyYW5zaXRpb25cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBOb3JtYWwgc3RhdGUgY29sb3IuXG4gICAgICAgICAqICEjemgg5pmu6YCa54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qE6aKc6Imy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IG5vcm1hbENvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxDb2xvcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ05vcm1hbCcsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmJ1dHRvbi5ub3JtYWxfY29sb3InLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLkNvbG9yICYmIHRoaXMuX2dldEJ1dHRvblN0YXRlKCkgPT09IFN0YXRlLk5PUk1BTCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRUYXJnZXQoKS5vcGFjaXR5ID0gdGhpcy5ub3JtYWxDb2xvci5hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFByZXNzZWQgc3RhdGUgY29sb3JcbiAgICAgICAgICogISN6aCDmjInkuIvnirbmgIHml7bmjInpkq7miYDmmL7npLrnmoTpopzoibLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gcHJlc3NlZENvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBwcmVzc2VkQ29sb3I6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLmNvbG9yKDIxMSwgMjExLCAyMTEpLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmVzc2VkJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLnByZXNzZWRfY29sb3InLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLkNvbG9yICYmIHRoaXMuX2dldEJ1dHRvblN0YXRlKCkgPT09IFN0YXRlLlBSRVNTRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGFyZ2V0KCkub3BhY2l0eSA9IHRoaXMucHJlc3NlZENvbG9yLmE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdwcmVzc2VkQ29sb3InXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSG92ZXIgc3RhdGUgY29sb3JcbiAgICAgICAgICogISN6aCDmgqzlgZznirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoTpopzoibLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gaG92ZXJDb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgaG92ZXJDb2xvcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0hvdmVyJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLmhvdmVyX2NvbG9yJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5Db2xvciAmJiB0aGlzLl9nZXRCdXR0b25TdGF0ZSgpID09PSBTdGF0ZS5IT1ZFUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRUYXJnZXQoKS5vcGFjaXR5ID0gdGhpcy5ob3ZlckNvbG9yLmE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdob3ZlckNvbG9yJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIERpc2FibGVkIHN0YXRlIGNvbG9yXG4gICAgICAgICAqICEjemgg56aB55So54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qE6aKc6Imy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGRpc2FibGVkQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVkQ29sb3I6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLmNvbG9yKDEyNCwgMTI0LCAxMjQpLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdEaXNhYmxlZCcsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmJ1dHRvbi5kaXNhYmxlZF9jb2xvcicsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uQ29sb3IgJiYgdGhpcy5fZ2V0QnV0dG9uU3RhdGUoKSA9PT0gU3RhdGUuRElTQUJMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGFyZ2V0KCkub3BhY2l0eSA9IHRoaXMuZGlzYWJsZWRDb2xvci5hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENvbG9yIGFuZCBTY2FsZSB0cmFuc2l0aW9uIGR1cmF0aW9uXG4gICAgICAgICAqICEjemgg6aKc6Imy6L+H5rih5ZKM57yp5pS+6L+H5rih5pe25omA6ZyA5pe26Ze0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkdXJhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuMSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTBdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uZHVyYXRpb24nLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuICBXaGVuIHVzZXIgcHJlc3MgdGhlIGJ1dHRvbiwgdGhlIGJ1dHRvbiB3aWxsIHpvb20gdG8gYSBzY2FsZS5cbiAgICAgICAgICogVGhlIGZpbmFsIHNjYWxlIG9mIHRoZSBidXR0b24gIGVxdWFscyAoYnV0dG9uIG9yaWdpbmFsIHNjYWxlICogem9vbVNjYWxlKVxuICAgICAgICAgKiAhI3poIOW9k+eUqOaIt+eCueWHu+aMiemSruWQju+8jOaMiemSruS8mue8qeaUvuWIsOS4gOS4quWAvO+8jOi/meS4quWAvOetieS6jiBCdXR0b24g5Y6f5aeLIHNjYWxlICogem9vbVNjYWxlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB6b29tU2NhbGVcbiAgICAgICAgICovXG4gICAgICAgIHpvb21TY2FsZToge1xuICAgICAgICAgICAgZGVmYXVsdDogMS4yLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uem9vbV9zY2FsZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBzcHJpdGUgdHJhbnNpdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBOb3JtYWwgc3RhdGUgc3ByaXRlXG4gICAgICAgICAqICEjemgg5pmu6YCa54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZSDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gbm9ybWFsU3ByaXRlXG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxTcHJpdGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnTm9ybWFsJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLm5vcm1hbF9zcHJpdGUnLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFByZXNzZWQgc3RhdGUgc3ByaXRlXG4gICAgICAgICAqICEjemgg5oyJ5LiL54q25oCB5pe25oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZSDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gcHJlc3NlZFNwcml0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcHJlc3NlZFNwcml0ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmVzc2VkJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLnByZXNzZWRfc3ByaXRlJyxcbiAgICAgICAgICAgIGZvcm1lcmx5U2VyaWFsaXplZEFzOiAncHJlc3NlZFNwcml0ZScsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSG92ZXIgc3RhdGUgc3ByaXRlXG4gICAgICAgICAqICEjemgg5oKs5YGc54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZSDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gaG92ZXJTcHJpdGVcbiAgICAgICAgICovXG4gICAgICAgIGhvdmVyU3ByaXRlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0hvdmVyJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLmhvdmVyX3Nwcml0ZScsXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ2hvdmVyU3ByaXRlJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBEaXNhYmxlZCBzdGF0ZSBzcHJpdGVcbiAgICAgICAgICogISN6aCDnpoHnlKjnirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlIOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1Nwcml0ZUZyYW1lfSBkaXNhYmxlZFNwcml0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZWRTcHJpdGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRGlzYWJsZWQnLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uZGlzYWJsZWRfc3ByaXRlJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUcmFuc2l0aW9uIHRhcmdldC5cbiAgICAgICAgICogV2hlbiBCdXR0b24gc3RhdGUgY2hhbmdlZDpcbiAgICAgICAgICogIElmIFRyYW5zaXRpb24gdHlwZSBpcyBCdXR0b24uVHJhbnNpdGlvbi5OT05FLCBCdXR0b24gd2lsbCBkbyBub3RoaW5nXG4gICAgICAgICAqICBJZiBUcmFuc2l0aW9uIHR5cGUgaXMgQnV0dG9uLlRyYW5zaXRpb24uQ09MT1IsIEJ1dHRvbiB3aWxsIGNoYW5nZSB0YXJnZXQncyBjb2xvclxuICAgICAgICAgKiAgSWYgVHJhbnNpdGlvbiB0eXBlIGlzIEJ1dHRvbi5UcmFuc2l0aW9uLlNQUklURSwgQnV0dG9uIHdpbGwgY2hhbmdlIHRhcmdldCBTcHJpdGUncyBzcHJpdGVcbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDpnIDopoHov4fmuKHnmoTnm67moIfjgIJcbiAgICAgICAgICog5b2T5YmN5oyJ6ZKu54q25oCB5pS55Y+Y6KeE5YiZ77yaXG4gICAgICAgICAqIC3lpoLmnpwgVHJhbnNpdGlvbiB0eXBlIOmAieaLqSBCdXR0b24uVHJhbnNpdGlvbi5OT05F77yM5oyJ6ZKu5LiN5YGa5Lu75L2V6L+H5rih44CCXG4gICAgICAgICAqIC3lpoLmnpwgVHJhbnNpdGlvbiB0eXBlIOmAieaLqSBCdXR0b24uVHJhbnNpdGlvbi5DT0xPUu+8jOaMiemSruS8muWvueebruagh+minOiJsui/m+ihjOminOiJsuS5i+mXtOeahOi/h+a4oeOAglxuICAgICAgICAgKiAt5aaC5p6cIFRyYW5zaXRpb24gdHlwZSDpgInmi6kgQnV0dG9uLlRyYW5zaXRpb24uU3ByaXRl77yM5oyJ6ZKu5Lya5a+555uu5qCHIFNwcml0ZSDov5vooYwgU3ByaXRlIOS5i+mXtOeahOi/h+a4oeOAglxuICAgICAgICAgKiBAcHJvcGVydHkge05vZGV9IHRhcmdldFxuICAgICAgICAgKi9cbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcImkxOG46Q09NUE9ORU5ULmJ1dHRvbi50YXJnZXRcIixcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVRhcmdldCgpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSAmJiB0aGlzLnRhcmdldCAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3RlclRhcmdldEV2ZW50KG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSWYgQnV0dG9uIGlzIGNsaWNrZWQsIGl0IHdpbGwgdHJpZ2dlciBldmVudCdzIGhhbmRsZXJcbiAgICAgICAgICogISN6aCDmjInpkq7nmoTngrnlh7vkuovku7bliJfooajjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGNsaWNrRXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICBjbGlja0V2ZW50czoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uY2xpY2tfZXZlbnRzJyxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIFRyYW5zaXRpb246IFRyYW5zaXRpb24sXG4gICAgfSxcblxuICAgIF9fcHJlbG9hZCAoKSB7XG4gICAgICAgIHRoaXMuX2FwcGx5VGFyZ2V0KCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcbiAgICB9LFxuXG4gICAgX3Jlc2V0U3RhdGUgKCkge1xuICAgICAgICB0aGlzLl9wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gLy8gUmVzdG9yZSBidXR0b24gc3RhdHVzXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgbGV0IHRyYW5zaXRpb24gPSB0aGlzLnRyYW5zaXRpb247XG4gICAgICAgIGxldCBvcmlnaW5hbFNjYWxlID0gdGhpcy5fb3JpZ2luYWxTY2FsZTtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5DT0xPUiAmJiB0aGlzLmludGVyYWN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0VGFyZ2V0Q29sb3IodGhpcy5ub3JtYWxDb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TQ0FMRSAmJiBvcmlnaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICB0YXJnZXQuc2V0U2NhbGUob3JpZ2luYWxTY2FsZS54LCBvcmlnaW5hbFNjYWxlLnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgLy8gY2hlY2sgc3ByaXRlIGZyYW1lc1xuICAgICAgICBpZiAodGhpcy5ub3JtYWxTcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsU3ByaXRlLmVuc3VyZUxvYWRUZXh0dXJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaG92ZXJTcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJTcHJpdGUuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmVzc2VkU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWRTcHJpdGUuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZFNwcml0ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZFNwcml0ZS5lbnN1cmVMb2FkVGV4dHVyZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJOb2RlRXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcblxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3Rlck5vZGVFdmVudCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRUYXJnZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgPyB0aGlzLnRhcmdldCA6IHRoaXMubm9kZTtcbiAgICB9LFxuXG4gICAgX29uVGFyZ2V0U3ByaXRlRnJhbWVDaGFuZ2VkIChjb21wKSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uU1BSSVRFKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRDdXJyZW50U3RhdGVTcHJpdGUoY29tcC5zcHJpdGVGcmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uVGFyZ2V0Q29sb3JDaGFuZ2VkIChjb2xvcikge1xuICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLkNPTE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRDdXJyZW50U3RhdGVDb2xvcihjb2xvcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uVGFyZ2V0U2NhbGVDaGFuZ2VkICgpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICAvLyB1cGRhdGUgX29yaWdpbmFsU2NhbGUgaWYgdGFyZ2V0IHNjYWxlIGNoYW5nZWRcbiAgICAgICAgaWYgKHRoaXMuX29yaWdpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gIT09IFRyYW5zaXRpb24uU0NBTEUgfHwgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTY2FsZS54ID0gdGFyZ2V0LnNjYWxlWDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFNjYWxlLnkgPSB0YXJnZXQuc2NhbGVZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXRUYXJnZXRDb2xvciAoY29sb3IpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICBsZXQgY2xvbmVDb2xvciA9IGNvbG9yLmNsb25lKCk7XG4gICAgICAgIHRhcmdldC5vcGFjaXR5ID0gY2xvbmVDb2xvci5hO1xuICAgICAgICBjbG9uZUNvbG9yLmEgPSAyNTU7ICAvLyBkb24ndCBzZXQgbm9kZSBvcGFjaXR5IHZpYSBub2RlLmNvbG9yLmFcbiAgICAgICAgdGFyZ2V0LmNvbG9yID0gY2xvbmVDb2xvcjtcbiAgICB9LFxuXG4gICAgX2dldFN0YXRlQ29sb3IgKHN0YXRlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuTk9STUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbENvbG9yO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5IT1ZFUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ob3ZlckNvbG9yO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5QUkVTU0VEOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXNzZWRDb2xvcjtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuRElTQUJMRUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRDb2xvcjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0U3RhdGVTcHJpdGUgKHN0YXRlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuTk9STUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbFNwcml0ZTtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuSE9WRVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaG92ZXJTcHJpdGU7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLlBSRVNTRUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlc3NlZFNwcml0ZTtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuRElTQUJMRUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRTcHJpdGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldEN1cnJlbnRTdGF0ZUNvbG9yIChjb2xvcikge1xuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9nZXRCdXR0b25TdGF0ZSgpICkge1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5OT1JNQUw6XG4gICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5IT1ZFUjpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdmVyQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuUFJFU1NFRDpcbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzZWRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5ESVNBQkxFRDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc2V0Q3VycmVudFN0YXRlU3ByaXRlIChzcHJpdGVGcmFtZSkge1xuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9nZXRCdXR0b25TdGF0ZSgpICkge1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5OT1JNQUw6XG4gICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxTcHJpdGUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuSE9WRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3ZlclNwcml0ZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5QUkVTU0VEOlxuICAgICAgICAgICAgICAgIHRoaXMucHJlc3NlZFNwcml0ZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5ESVNBQkxFRDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkU3ByaXRlID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5fZ2V0VGFyZ2V0KCk7XG4gICAgICAgIGlmICh0aGlzLl90cmFuc2l0aW9uRmluaXNoZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiAhPT0gVHJhbnNpdGlvbi5DT0xPUiAmJiB0aGlzLnRyYW5zaXRpb24gIT09IFRyYW5zaXRpb24uU0NBTEUpIHJldHVybjtcblxuICAgICAgICB0aGlzLnRpbWUgKz0gZHQ7XG4gICAgICAgIGxldCByYXRpbyA9IDEuMDtcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb24gPiAwKSB7XG4gICAgICAgICAgICByYXRpbyA9IHRoaXMudGltZSAvIHRoaXMuZHVyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGFtcCByYXRpb1xuICAgICAgICBpZiAocmF0aW8gPj0gMSkge1xuICAgICAgICAgICAgcmF0aW8gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5DT0xPUikge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fZnJvbUNvbG9yLmxlcnAodGhpcy5fdG9Db2xvciwgcmF0aW8pO1xuICAgICAgICAgICAgdGhpcy5fc2V0VGFyZ2V0Q29sb3IoY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgaWYgX29yaWdpbmFsU2NhbGUgaXMgaW52YWxpZFxuICAgICAgICBlbHNlIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uU0NBTEUgJiYgdGhpcy5fb3JpZ2luYWxTY2FsZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnNjYWxlID0gdGhpcy5fZnJvbVNjYWxlLmxlcnAodGhpcy5fdG9TY2FsZSwgcmF0aW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhdGlvID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgX3JlZ2lzdGVyTm9kZUV2ZW50ICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5fb25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoQ2FuY2VsLCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMuX29uTW91c2VNb3ZlSW4sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMuX29uTW91c2VNb3ZlT3V0LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3VucmVnaXN0ZXJOb2RlRXZlbnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoQ2FuY2VsLCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLl9vbk1vdXNlTW92ZUluLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5fb25Nb3VzZU1vdmVPdXQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfcmVnaXN0ZXJUYXJnZXRFdmVudCAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRhcmdldC5vbignc3ByaXRlZnJhbWUtY2hhbmdlZCcsIHRoaXMuX29uVGFyZ2V0U3ByaXRlRnJhbWVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIHRhcmdldC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DT0xPUl9DSEFOR0VELCB0aGlzLl9vblRhcmdldENvbG9yQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQsIHRoaXMuX29uVGFyZ2V0U2NhbGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3VucmVnaXN0ZXJUYXJnZXRFdmVudCAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRhcmdldC5vZmYoJ3Nwcml0ZWZyYW1lLWNoYW5nZWQnLCB0aGlzLl9vblRhcmdldFNwcml0ZUZyYW1lQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICB0YXJnZXQub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLkNPTE9SX0NIQU5HRUQsIHRoaXMuX29uVGFyZ2V0Q29sb3JDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQsIHRoaXMuX29uVGFyZ2V0U2NhbGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX2dldFRhcmdldFNwcml0ZSAodGFyZ2V0KSB7XG4gICAgICAgIGxldCBzcHJpdGUgPSBudWxsO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBzcHJpdGUgPSB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwcml0ZTtcbiAgICB9LFxuXG4gICAgX2FwcGx5VGFyZ2V0ICgpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLl9nZXRUYXJnZXRTcHJpdGUodGFyZ2V0KTtcbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFNjYWxlID0gY2MuVmVjMi5aRVJPO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29yaWdpbmFsU2NhbGUueCA9IHRhcmdldC5zY2FsZVg7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsU2NhbGUueSA9IHRhcmdldC5zY2FsZVk7XG5cbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJUYXJnZXRFdmVudCh0YXJnZXQpO1xuICAgIH0sXG5cbiAgICAvLyB0b3VjaCBldmVudCBoYW5kbGVyXG4gICAgX29uVG91Y2hCZWdhbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmludGVyYWN0YWJsZSB8fCAhdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSxcblxuICAgIF9vblRvdWNoTW92ZSAoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmludGVyYWN0YWJsZSB8fCAhdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkgfHwgIXRoaXMuX3ByZXNzZWQpIHJldHVybjtcbiAgICAgICAgLy8gbW9iaWxlIHBob25lIHdpbGwgbm90IGVtaXQgX29uTW91c2VNb3ZlT3V0LFxuICAgICAgICAvLyBzbyB3ZSBoYXZlIHRvIGRvIGhpdCB0ZXN0IHdoZW4gdG91Y2ggbW92aW5nXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoO1xuICAgICAgICBsZXQgaGl0ID0gdGhpcy5ub2RlLl9oaXRUZXN0KHRvdWNoLmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5fZ2V0VGFyZ2V0KCk7XG4gICAgICAgIGxldCBvcmlnaW5hbFNjYWxlID0gdGhpcy5fb3JpZ2luYWxTY2FsZTtcblxuICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLlNDQUxFICYmIG9yaWdpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9tU2NhbGUueCA9IG9yaWdpbmFsU2NhbGUueDtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9tU2NhbGUueSA9IG9yaWdpbmFsU2NhbGUueTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b1NjYWxlLnggPSBvcmlnaW5hbFNjYWxlLnggKiB0aGlzLnpvb21TY2FsZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b1NjYWxlLnkgPSBvcmlnaW5hbFNjYWxlLnkgKiB0aGlzLnpvb21TY2FsZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRTY2FsZShvcmlnaW5hbFNjYWxlLngsIG9yaWdpbmFsU2NhbGUueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3RhdGU7XG4gICAgICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBTdGF0ZS5QUkVTU0VEO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFN0YXRlLk5PUk1BTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGx5VHJhbnNpdGlvbihzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSxcblxuICAgIF9vblRvdWNoRW5kZWQgKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGFibGUgfHwgIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuX3ByZXNzZWQpIHtcbiAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmNsaWNrRXZlbnRzLCBldmVudCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZW1pdCgnY2xpY2snLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0sXG5cbiAgICBfb25Ub3VjaENhbmNlbCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGFibGUgfHwgIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICBfb25Nb3VzZU1vdmVJbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcmVzc2VkIHx8ICF0aGlzLmludGVyYWN0YWJsZSB8fCAhdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TUFJJVEUgJiYgIXRoaXMuaG92ZXJTcHJpdGUpIHJldHVybjtcblxuICAgICAgICBpZiAoIXRoaXMuX2hvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25Nb3VzZU1vdmVPdXQgKCkge1xuICAgICAgICBpZiAodGhpcy5faG92ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5faG92ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBzdGF0ZSBoYW5kbGVyXG4gICAgX3VwZGF0ZVN0YXRlICgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fZ2V0QnV0dG9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5fYXBwbHlUcmFuc2l0aW9uKHN0YXRlKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICBfZ2V0QnV0dG9uU3RhdGUgKCkge1xuICAgICAgICBsZXQgc3RhdGU7XG4gICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGFibGUpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU3RhdGUuRElTQUJMRUQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fcHJlc3NlZCkge1xuICAgICAgICAgICAgc3RhdGUgPSBTdGF0ZS5QUkVTU0VEO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2hvdmVyZWQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU3RhdGUuSE9WRVI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFN0YXRlLk5PUk1BTDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIF91cGRhdGVDb2xvclRyYW5zaXRpb25JbW1lZGlhdGVseSAoc3RhdGUpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fZ2V0U3RhdGVDb2xvcihzdGF0ZSk7XG4gICAgICAgIHRoaXMuX3NldFRhcmdldENvbG9yKGNvbG9yKTtcbiAgICAgICAgdGhpcy5fZnJvbUNvbG9yID0gY29sb3IuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fdG9Db2xvciA9IGNvbG9yO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlQ29sb3JUcmFuc2l0aW9uIChzdGF0ZSkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IHN0YXRlID09PSBTdGF0ZS5ESVNBQkxFRCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29sb3JUcmFuc2l0aW9uSW1tZWRpYXRlbHkoc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fZ2V0U3RhdGVDb2xvcihzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLl9mcm9tQ29sb3IgPSB0YXJnZXQuY29sb3IuY2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3RvQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlU3ByaXRlVHJhbnNpdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX2dldFN0YXRlU3ByaXRlKHN0YXRlKTtcbiAgICAgICAgaWYgKHRoaXMuX3Nwcml0ZSAmJiBzcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlU2NhbGVUcmFuc2l0aW9uIChzdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUgPT09IFN0YXRlLlBSRVNTRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvb21VcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fem9vbUJhY2soKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfem9vbVVwICgpIHtcbiAgICAgICAgLy8gc2tpcCBiZWZvcmUgX19wcmVsb2FkKClcbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9mcm9tU2NhbGUueCA9IHRoaXMuX29yaWdpbmFsU2NhbGUueDtcbiAgICAgICAgdGhpcy5fZnJvbVNjYWxlLnkgPSB0aGlzLl9vcmlnaW5hbFNjYWxlLnk7XG4gICAgICAgIHRoaXMuX3RvU2NhbGUueCA9IHRoaXMuX29yaWdpbmFsU2NhbGUueCAqIHRoaXMuem9vbVNjYWxlO1xuICAgICAgICB0aGlzLl90b1NjYWxlLnkgPSB0aGlzLl9vcmlnaW5hbFNjYWxlLnkgKiB0aGlzLnpvb21TY2FsZTtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gZmFsc2U7XG4gICAgfSxcblxuICAgIF96b29tQmFjayAoKSB7XG4gICAgICAgIC8vIHNraXAgYmVmb3JlIF9fcHJlbG9hZCgpXG4gICAgICAgIGlmICghdGhpcy5fb3JpZ2luYWxTY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICB0aGlzLl9mcm9tU2NhbGUueCA9IHRhcmdldC5zY2FsZVg7XG4gICAgICAgIHRoaXMuX2Zyb21TY2FsZS55ID0gdGFyZ2V0LnNjYWxlWTtcbiAgICAgICAgdGhpcy5fdG9TY2FsZS54ID0gdGhpcy5fb3JpZ2luYWxTY2FsZS54O1xuICAgICAgICB0aGlzLl90b1NjYWxlLnkgPSB0aGlzLl9vcmlnaW5hbFNjYWxlLnk7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlVHJhbnNpdGlvbiAob2xkVHJhbnNpdGlvbikge1xuICAgICAgICAvLyBSZXNldCB0byBub3JtYWwgZGF0YSB3aGVuIGNoYW5nZSB0cmFuc2l0aW9uLlxuICAgICAgICBpZiAob2xkVHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5DT0xPUikge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29sb3JUcmFuc2l0aW9uSW1tZWRpYXRlbHkoU3RhdGUuTk9STUFMKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRUcmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLlNQUklURSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3ByaXRlVHJhbnNpdGlvbihTdGF0ZS5OT1JNQUwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgfSxcblxuICAgIF9hcHBseVRyYW5zaXRpb24gKHN0YXRlKSB7XG4gICAgICAgIGxldCB0cmFuc2l0aW9uID0gdGhpcy50cmFuc2l0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5DT0xPUikge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29sb3JUcmFuc2l0aW9uKHN0YXRlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLlNQUklURSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3ByaXRlVHJhbnNpdGlvbihzdGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TQ0FMRSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2NhbGVUcmFuc2l0aW9uKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVzaXplTm9kZVRvVGFyZ2V0Tm9kZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2dldFRhcmdldCgpLmdldENvbnRlbnRTaXplKCkpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlRGlzYWJsZWRTdGF0ZSAoZm9yY2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zcHJpdGUpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVBdXRvR3JheUVmZmVjdCB8fCBmb3JjZSkge1xuICAgICAgICAgICAgbGV0IHVzZUdyYXlNYXRlcmlhbCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoISh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uU1BSSVRFICYmIHRoaXMuZGlzYWJsZWRTcHJpdGUpKSB7XG4gICAgICAgICAgICAgICAgdXNlR3JheU1hdGVyaWFsID0gdGhpcy5lbmFibGVBdXRvR3JheUVmZmVjdCAmJiAhdGhpcy5pbnRlcmFjdGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2hHcmF5TWF0ZXJpYWwodXNlR3JheU1hdGVyaWFsLCB0aGlzLl9zcHJpdGUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLkJ1dHRvbiA9IG1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IGNsaWNrXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtCdXR0b259IGJ1dHRvbiAtIFRoZSBCdXR0b24gY29tcG9uZW50LlxuICovXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==