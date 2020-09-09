
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/types.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
 * !#en Enum for keyboard return types
 * !#zh 键盘的返回键类型
 * @readonly
 * @enum EditBox.KeyboardReturnType
 */
var KeyboardReturnType = cc.Enum({
  /**
   * !#en TODO
   * !#zh 默认
   * @property {Number} DEFAULT
   */
  DEFAULT: 0,

  /**
   * !#en TODO
   * !#zh 完成类型
   * @property {Number} DONE
   */
  DONE: 1,

  /**
   * !#en TODO
   * !#zh 发送类型
   * @property {Number} SEND
   */
  SEND: 2,

  /**
   * !#en TODO
   * !#zh 搜索类型
   * @property {Number} SEARCH
   */
  SEARCH: 3,

  /**
   * !#en TODO
   * !#zh 跳转类型
   * @property {Number} GO
   */
  GO: 4,

  /**
   * !#en TODO
   * !#zh 下一个类型
   * @property {Number} NEXT
   */
  NEXT: 5
});
/**
 * !#en The EditBox's InputMode defines the type of text that the user is allowed to enter.
 * !#zh 输入模式
 * @readonly
 * @enum EditBox.InputMode
 */

var InputMode = cc.Enum({
  /**
   * !#en TODO
   * !#zh 用户可以输入任何文本，包括换行符。
   * @property {Number} ANY
   */
  ANY: 0,

  /**
   * !#en The user is allowed to enter an e-mail address.
   * !#zh 允许用户输入一个电子邮件地址。
   * @property {Number} EMAIL_ADDR
   */
  EMAIL_ADDR: 1,

  /**
   * !#en The user is allowed to enter an integer value.
   * !#zh 允许用户输入一个整数值。
   * @property {Number} NUMERIC
   */
  NUMERIC: 2,

  /**
   * !#en The user is allowed to enter a phone number.
   * !#zh 允许用户输入一个电话号码。
   * @property {Number} PHONE_NUMBER
   */
  PHONE_NUMBER: 3,

  /**
   * !#en The user is allowed to enter a URL.
   * !#zh 允许用户输入一个 URL。
   * @property {Number} URL
   */
  URL: 4,

  /**
   * !#en
   * The user is allowed to enter a real number value.
   * This extends kEditBoxInputModeNumeric by allowing a decimal point.
   * !#zh
   * 允许用户输入一个实数。
   * @property {Number} DECIMAL
   */
  DECIMAL: 5,

  /**
   * !#en The user is allowed to enter any text, except for line breaks.
   * !#zh 除了换行符以外，用户可以输入任何文本。
   * @property {Number} SINGLE_LINE
   */
  SINGLE_LINE: 6
});
/**
 * !#en Enum for the EditBox's input flags
 * !#zh 定义了一些用于设置文本显示和文本格式化的标志位。
 * @readonly
 * @enum EditBox.InputFlag
 */

var InputFlag = cc.Enum({
  /**
   * !#en
   * Indicates that the text entered is confidential data that should be
   * obscured whenever possible. This implies EDIT_BOX_INPUT_FLAG_SENSITIVE.
   * !#zh
   * 表明输入的文本是保密的数据，任何时候都应该隐藏起来，它隐含了 EDIT_BOX_INPUT_FLAG_SENSITIVE。
   * @property {Number} PASSWORD
   */
  PASSWORD: 0,

  /**
   * !#en
   * Indicates that the text entered is sensitive data that the
   * implementation must never store into a dictionary or table for use
   * in predictive, auto-completing, or other accelerated input schemes.
   * A credit card number is an example of sensitive data.
   * !#zh
   * 表明输入的文本是敏感数据，它禁止存储到字典或表里面，也不能用来自动补全和提示用户输入。
   * 一个信用卡号码就是一个敏感数据的例子。
   * @property {Number} SENSITIVE
   */
  SENSITIVE: 1,

  /**
   * !#en
   * This flag is a hint to the implementation that during text editing,
   * the initial letter of each word should be capitalized.
   * !#zh
   *  这个标志用来指定在文本编辑的时候，是否把每一个单词的首字母大写。
   * @property {Number} INITIAL_CAPS_WORD
   */
  INITIAL_CAPS_WORD: 2,

  /**
   * !#en
   * This flag is a hint to the implementation that during text editing,
   * the initial letter of each sentence should be capitalized.
   * !#zh
   * 这个标志用来指定在文本编辑是否每个句子的首字母大写。
   * @property {Number} INITIAL_CAPS_SENTENCE
   */
  INITIAL_CAPS_SENTENCE: 3,

  /**
   * !#en Capitalize all characters automatically.
   * !#zh 自动把输入的所有字符大写。
   * @property {Number} INITIAL_CAPS_ALL_CHARACTERS
   */
  INITIAL_CAPS_ALL_CHARACTERS: 4,

  /**
   * Don't do anything with the input text.
   * @property {Number} DEFAULT
   */
  DEFAULT: 5
});
module.exports = {
  KeyboardReturnType: KeyboardReturnType,
  InputMode: InputMode,
  InputFlag: InputFlag
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvZWRpdGJveC90eXBlcy5qcyJdLCJuYW1lcyI6WyJLZXlib2FyZFJldHVyblR5cGUiLCJjYyIsIkVudW0iLCJERUZBVUxUIiwiRE9ORSIsIlNFTkQiLCJTRUFSQ0giLCJHTyIsIk5FWFQiLCJJbnB1dE1vZGUiLCJBTlkiLCJFTUFJTF9BRERSIiwiTlVNRVJJQyIsIlBIT05FX05VTUJFUiIsIlVSTCIsIkRFQ0lNQUwiLCJTSU5HTEVfTElORSIsIklucHV0RmxhZyIsIlBBU1NXT1JEIiwiU0VOU0lUSVZFIiwiSU5JVElBTF9DQVBTX1dPUkQiLCJJTklUSUFMX0NBUFNfU0VOVEVOQ0UiLCJJTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7OztBQU1BLElBQUlBLGtCQUFrQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3Qjs7Ozs7QUFLQUMsRUFBQUEsT0FBTyxFQUFFLENBTm9COztBQU83Qjs7Ozs7QUFLQUMsRUFBQUEsSUFBSSxFQUFFLENBWnVCOztBQWE3Qjs7Ozs7QUFLQUMsRUFBQUEsSUFBSSxFQUFFLENBbEJ1Qjs7QUFtQjdCOzs7OztBQUtBQyxFQUFBQSxNQUFNLEVBQUUsQ0F4QnFCOztBQXlCN0I7Ozs7O0FBS0FDLEVBQUFBLEVBQUUsRUFBRSxDQTlCeUI7O0FBK0I3Qjs7Ozs7QUFLQUMsRUFBQUEsSUFBSSxFQUFFO0FBcEN1QixDQUFSLENBQXpCO0FBdUNBOzs7Ozs7O0FBTUEsSUFBSUMsU0FBUyxHQUFHUixFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNwQjs7Ozs7QUFLQVEsRUFBQUEsR0FBRyxFQUFFLENBTmU7O0FBT3BCOzs7OztBQUtBQyxFQUFBQSxVQUFVLEVBQUUsQ0FaUTs7QUFhcEI7Ozs7O0FBS0FDLEVBQUFBLE9BQU8sRUFBRSxDQWxCVzs7QUFtQnBCOzs7OztBQUtBQyxFQUFBQSxZQUFZLEVBQUUsQ0F4Qk07O0FBeUJwQjs7Ozs7QUFLQUMsRUFBQUEsR0FBRyxFQUFFLENBOUJlOztBQStCcEI7Ozs7Ozs7O0FBUUFDLEVBQUFBLE9BQU8sRUFBRSxDQXZDVzs7QUF3Q3BCOzs7OztBQUtBQyxFQUFBQSxXQUFXLEVBQUU7QUE3Q08sQ0FBUixDQUFoQjtBQWdEQTs7Ozs7OztBQU1BLElBQUlDLFNBQVMsR0FBR2hCLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3BCOzs7Ozs7OztBQVFBZ0IsRUFBQUEsUUFBUSxFQUFFLENBVFU7O0FBVXBCOzs7Ozs7Ozs7OztBQVdBQyxFQUFBQSxTQUFTLEVBQUUsQ0FyQlM7O0FBc0JwQjs7Ozs7Ozs7QUFRQUMsRUFBQUEsaUJBQWlCLEVBQUUsQ0E5QkM7O0FBK0JwQjs7Ozs7Ozs7QUFRQUMsRUFBQUEscUJBQXFCLEVBQUUsQ0F2Q0g7O0FBd0NwQjs7Ozs7QUFLQUMsRUFBQUEsMkJBQTJCLEVBQUUsQ0E3Q1Q7O0FBOENwQjs7OztBQUlBbkIsRUFBQUEsT0FBTyxFQUFFO0FBbERXLENBQVIsQ0FBaEI7QUFxREFvQixNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYnhCLEVBQUFBLGtCQUFrQixFQUFFQSxrQkFEUDtBQUViUyxFQUFBQSxTQUFTLEVBQUVBLFNBRkU7QUFHYlEsRUFBQUEsU0FBUyxFQUFFQTtBQUhFLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogISNlbiBFbnVtIGZvciBrZXlib2FyZCByZXR1cm4gdHlwZXNcbiAqICEjemgg6ZSu55uY55qE6L+U5Zue6ZSu57G75Z6LXG4gKiBAcmVhZG9ubHlcbiAqIEBlbnVtIEVkaXRCb3guS2V5Ym9hcmRSZXR1cm5UeXBlXG4gKi9cbmxldCBLZXlib2FyZFJldHVyblR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOm7mOiupFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBERUZBVUxUXG4gICAgICovXG4gICAgREVGQVVMVDogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOWujOaIkOexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBET05FXG4gICAgICovXG4gICAgRE9ORTogMSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOWPkemAgeexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTRU5EXG4gICAgICovXG4gICAgU0VORDogMixcbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOaQnOe0ouexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTRUFSQ0hcbiAgICAgKi9cbiAgICBTRUFSQ0g6IDMsXG4gICAgLyoqXG4gICAgICogISNlbiBUT0RPXG4gICAgICogISN6aCDot7PovaznsbvlnotcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gR09cbiAgICAgKi9cbiAgICBHTzogNCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOS4i+S4gOS4quexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBORVhUXG4gICAgICovXG4gICAgTkVYVDogNVxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgRWRpdEJveCdzIElucHV0TW9kZSBkZWZpbmVzIHRoZSB0eXBlIG9mIHRleHQgdGhhdCB0aGUgdXNlciBpcyBhbGxvd2VkIHRvIGVudGVyLlxuICogISN6aCDovpPlhaXmqKHlvI9cbiAqIEByZWFkb25seVxuICogQGVudW0gRWRpdEJveC5JbnB1dE1vZGVcbiAqL1xubGV0IElucHV0TW9kZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVE9ET1xuICAgICAqICEjemgg55So5oi35Y+v5Lul6L6T5YWl5Lu75L2V5paH5pys77yM5YyF5ous5o2i6KGM56ym44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFOWVxuICAgICAqL1xuICAgIEFOWTogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gZW50ZXIgYW4gZS1tYWlsIGFkZHJlc3MuXG4gICAgICogISN6aCDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKrnlLXlrZDpgq7ku7blnLDlnYDjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRU1BSUxfQUREUlxuICAgICAqL1xuICAgIEVNQUlMX0FERFI6IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdXNlciBpcyBhbGxvd2VkIHRvIGVudGVyIGFuIGludGVnZXIgdmFsdWUuXG4gICAgICogISN6aCDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKrmlbTmlbDlgLzjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTlVNRVJJQ1xuICAgICAqL1xuICAgIE5VTUVSSUM6IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdXNlciBpcyBhbGxvd2VkIHRvIGVudGVyIGEgcGhvbmUgbnVtYmVyLlxuICAgICAqICEjemgg5YWB6K6455So5oi36L6T5YWl5LiA5Liq55S16K+d5Y+356CB44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIT05FX05VTUJFUlxuICAgICAqL1xuICAgIFBIT05FX05VTUJFUjogMyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gZW50ZXIgYSBVUkwuXG4gICAgICogISN6aCDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKogVVJM44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFVSTFxuICAgICAqL1xuICAgIFVSTDogNCxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIHVzZXIgaXMgYWxsb3dlZCB0byBlbnRlciBhIHJlYWwgbnVtYmVyIHZhbHVlLlxuICAgICAqIFRoaXMgZXh0ZW5kcyBrRWRpdEJveElucHV0TW9kZU51bWVyaWMgYnkgYWxsb3dpbmcgYSBkZWNpbWFsIHBvaW50LlxuICAgICAqICEjemhcbiAgICAgKiDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKrlrp7mlbDjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gREVDSU1BTFxuICAgICAqL1xuICAgIERFQ0lNQUw6IDUsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdXNlciBpcyBhbGxvd2VkIHRvIGVudGVyIGFueSB0ZXh0LCBleGNlcHQgZm9yIGxpbmUgYnJlYWtzLlxuICAgICAqICEjemgg6Zmk5LqG5o2i6KGM56ym5Lul5aSW77yM55So5oi35Y+v5Lul6L6T5YWl5Lu75L2V5paH5pys44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNJTkdMRV9MSU5FXG4gICAgICovXG4gICAgU0lOR0xFX0xJTkU6IDZcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgdGhlIEVkaXRCb3gncyBpbnB1dCBmbGFnc1xuICogISN6aCDlrprkuYnkuobkuIDkupvnlKjkuo7orr7nva7mlofmnKzmmL7npLrlkozmlofmnKzmoLzlvI/ljJbnmoTmoIflv5fkvY3jgIJcbiAqIEByZWFkb25seVxuICogQGVudW0gRWRpdEJveC5JbnB1dEZsYWdcbiAqL1xubGV0IElucHV0RmxhZyA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCBlbnRlcmVkIGlzIGNvbmZpZGVudGlhbCBkYXRhIHRoYXQgc2hvdWxkIGJlXG4gICAgICogb2JzY3VyZWQgd2hlbmV2ZXIgcG9zc2libGUuIFRoaXMgaW1wbGllcyBFRElUX0JPWF9JTlBVVF9GTEFHX1NFTlNJVElWRS5cbiAgICAgKiAhI3poXG4gICAgICog6KGo5piO6L6T5YWl55qE5paH5pys5piv5L+d5a+G55qE5pWw5o2u77yM5Lu75L2V5pe25YCZ6YO95bqU6K+l6ZqQ6JeP6LW35p2l77yM5a6D6ZqQ5ZCr5LqGIEVESVRfQk9YX0lOUFVUX0ZMQUdfU0VOU0lUSVZF44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBBU1NXT1JEXG4gICAgICovXG4gICAgUEFTU1dPUkQ6IDAsXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IGVudGVyZWQgaXMgc2Vuc2l0aXZlIGRhdGEgdGhhdCB0aGVcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiBtdXN0IG5ldmVyIHN0b3JlIGludG8gYSBkaWN0aW9uYXJ5IG9yIHRhYmxlIGZvciB1c2VcbiAgICAgKiBpbiBwcmVkaWN0aXZlLCBhdXRvLWNvbXBsZXRpbmcsIG9yIG90aGVyIGFjY2VsZXJhdGVkIGlucHV0IHNjaGVtZXMuXG4gICAgICogQSBjcmVkaXQgY2FyZCBudW1iZXIgaXMgYW4gZXhhbXBsZSBvZiBzZW5zaXRpdmUgZGF0YS5cbiAgICAgKiAhI3poXG4gICAgICog6KGo5piO6L6T5YWl55qE5paH5pys5piv5pWP5oSf5pWw5o2u77yM5a6D56aB5q2i5a2Y5YKo5Yiw5a2X5YW45oiW6KGo6YeM6Z2i77yM5Lmf5LiN6IO955So5p2l6Ieq5Yqo6KGl5YWo5ZKM5o+Q56S655So5oi36L6T5YWl44CCXG4gICAgICog5LiA5Liq5L+h55So5Y2h5Y+356CB5bCx5piv5LiA5Liq5pWP5oSf5pWw5o2u55qE5L6L5a2Q44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNFTlNJVElWRVxuICAgICAqL1xuICAgIFNFTlNJVElWRTogMSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhpcyBmbGFnIGlzIGEgaGludCB0byB0aGUgaW1wbGVtZW50YXRpb24gdGhhdCBkdXJpbmcgdGV4dCBlZGl0aW5nLFxuICAgICAqIHRoZSBpbml0aWFsIGxldHRlciBvZiBlYWNoIHdvcmQgc2hvdWxkIGJlIGNhcGl0YWxpemVkLlxuICAgICAqICEjemhcbiAgICAgKiAg6L+Z5Liq5qCH5b+X55So5p2l5oyH5a6a5Zyo5paH5pys57yW6L6R55qE5pe25YCZ77yM5piv5ZCm5oqK5q+P5LiA5Liq5Y2V6K+N55qE6aaW5a2X5q+N5aSn5YaZ44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElOSVRJQUxfQ0FQU19XT1JEXG4gICAgICovXG4gICAgSU5JVElBTF9DQVBTX1dPUkQ6IDIsXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoaXMgZmxhZyBpcyBhIGhpbnQgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRoYXQgZHVyaW5nIHRleHQgZWRpdGluZyxcbiAgICAgKiB0aGUgaW5pdGlhbCBsZXR0ZXIgb2YgZWFjaCBzZW50ZW5jZSBzaG91bGQgYmUgY2FwaXRhbGl6ZWQuXG4gICAgICogISN6aFxuICAgICAqIOi/meS4quagh+W/l+eUqOadpeaMh+WumuWcqOaWh+acrOe8lui+keaYr+WQpuavj+S4quWPpeWtkOeahOmmluWtl+avjeWkp+WGmeOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBJTklUSUFMX0NBUFNfU0VOVEVOQ0VcbiAgICAgKi9cbiAgICBJTklUSUFMX0NBUFNfU0VOVEVOQ0U6IDMsXG4gICAgLyoqXG4gICAgICogISNlbiBDYXBpdGFsaXplIGFsbCBjaGFyYWN0ZXJzIGF1dG9tYXRpY2FsbHkuXG4gICAgICogISN6aCDoh6rliqjmiorovpPlhaXnmoTmiYDmnInlrZfnrKblpKflhpnjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTXG4gICAgICovXG4gICAgSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTOiA0LFxuICAgIC8qKlxuICAgICAqIERvbid0IGRvIGFueXRoaW5nIHdpdGggdGhlIGlucHV0IHRleHQuXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERFRkFVTFRcbiAgICAgKi9cbiAgICBERUZBVUxUOiA1XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgS2V5Ym9hcmRSZXR1cm5UeXBlOiBLZXlib2FyZFJldHVyblR5cGUsXG4gICAgSW5wdXRNb2RlOiBJbnB1dE1vZGUsXG4gICAgSW5wdXRGbGFnOiBJbnB1dEZsYWdcbn07XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==