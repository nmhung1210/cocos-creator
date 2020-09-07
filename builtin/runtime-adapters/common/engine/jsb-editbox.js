/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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

(function () {
	if (!(cc && cc.EditBox)) {
		return;
	}

	const EditBox = cc.EditBox;
	const js = cc.js;
	const KeyboardReturnType = EditBox.KeyboardReturnType;
	const MAX_VALUE = 65535;
	let _currentEditBoxImpl = null;

	function getKeyboardReturnType(type) {
		switch (type) {
			case KeyboardReturnType.DEFAULT:
			case KeyboardReturnType.DONE:
				return 'done';
			case KeyboardReturnType.SEND:
				return 'send';
			case KeyboardReturnType.SEARCH:
				return 'search';
			case KeyboardReturnType.GO:
				return 'go';
			case KeyboardReturnType.NEXT:
				return 'next';
		}
		return 'done';
	}

	const BaseClass = EditBox._ImplClass;
	function MiniGameEditBoxImpl() {
		BaseClass.call(this);

		this._eventListeners = {
			onKeyboardInput: null,
			onKeyboardConfirm: null,
			onKeyboardComplete: null,
		};
	}

	js.extend(MiniGameEditBoxImpl, BaseClass);
	EditBox._ImplClass = MiniGameEditBoxImpl;

	Object.assign(MiniGameEditBoxImpl.prototype, {
		init(delegate) {
			if (!delegate) {
				cc.error('EditBox init failed');
				return;
			}
			this._delegate = delegate;
		},

		beginEditing() {
			// In case multiply register events
			if (_currentEditBoxImpl === this) {
				return;
			}
			let delegate = this._delegate;
			// handle the old keyboard
			if (_currentEditBoxImpl) {
				let currentImplCbs = _currentEditBoxImpl._eventListeners;
				currentImplCbs.onKeyboardComplete();

				__globalAdapter.updateKeyboard && __globalAdapter.updateKeyboard({
					value: delegate._string,
				});
			}
			else {
				this._showKeyboard();
			}

			this._registerKeyboardEvent();

			this._editing = true;
			_currentEditBoxImpl = this;
			delegate.editBoxEditingDidBegan();
		},

		endEditing() {
			this._hideKeyboard();
			let cbs = this._eventListeners;
			cbs.onKeyboardComplete && cbs.onKeyboardComplete();
		},

		_registerKeyboardEvent() {
			let self = this;
			let delegate = this._delegate;
			let cbs = this._eventListeners;

			cbs.onKeyboardInput = function (res) {
				if (delegate._string !== res.value) {
					delegate.editBoxTextChanged(res.value);
				}
			}

			cbs.onKeyboardConfirm = function (res) {
				delegate.editBoxEditingReturn();
				let cbs = self._eventListeners;
				cbs.onKeyboardComplete && cbs.onKeyboardComplete();
			}

			cbs.onKeyboardComplete = function () {
				self._editing = false;
				_currentEditBoxImpl = null;
				self._unregisterKeyboardEvent();
				delegate.editBoxEditingDidEnded();
			}

			__globalAdapter.onKeyboardInput(cbs.onKeyboardInput);
			__globalAdapter.onKeyboardConfirm(cbs.onKeyboardConfirm);
			__globalAdapter.onKeyboardComplete(cbs.onKeyboardComplete);
		},

		_unregisterKeyboardEvent() {
			let cbs = this._eventListeners;

			if (cbs.onKeyboardInput) {
				__globalAdapter.offKeyboardInput(cbs.onKeyboardInput);
				cbs.onKeyboardInput = null;
			}
			if (cbs.onKeyboardConfirm) {
				__globalAdapter.offKeyboardConfirm(cbs.onKeyboardConfirm);
				cbs.onKeyboardConfirm = null;
			}
			if (cbs.onKeyboardComplete) {
				__globalAdapter.offKeyboardComplete(cbs.onKeyboardComplete);
				cbs.onKeyboardComplete = null;
			}
		},

		_showKeyboard() {
			let delegate = this._delegate;
			let multiline = (delegate.inputMode === EditBox.InputMode.ANY);
			let maxLength = (delegate.maxLength < 0 ? MAX_VALUE : delegate.maxLength);

			__globalAdapter.showKeyboard({
				defaultValue: delegate._string,
				maxLength: maxLength,
				multiple: multiline,
				confirmHold: false,
				confirmType: getKeyboardReturnType(delegate.returnType),
				success(res) {

				},
				fail(res) {
					cc.warn(res.errMsg);
				}
			});
		},

		_hideKeyboard() {
			__globalAdapter.hideKeyboard({
				success(res) {

				},
				fail(res) {
					cc.warn(res.errMsg);
				},
			});
		},
	});
})();

