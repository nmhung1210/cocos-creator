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

cc.androidInstant = cc.androidInstant || {};

let _callInstantHelper = function (method, signature, param) {
    if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
        let className = "org.cocos2dx.javascript/InstantHelper";
        if (typeof param !== "undefined") {
            return jsb.reflection.callStaticMethod(className, method, signature, param);
        } else {
            return jsb.reflection.callStaticMethod(className, method, signature);
        }
    } else {
        cc.error('cc.androidInstant can only call on android instant');
    }
};


cc.androidInstant.showInstallPrompt = function () {
    _callInstantHelper("showInstallPrompt", "()V");
};

/**
 * check if the app is instantapp
 * see more detail: https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat.html#isInstantApp()
 * @returns {boolean}
 */
cc.androidInstant.isInstantApp = function () {
    return _callInstantHelper("isInstantApp", "()Z");
};

/**
 * get cookie for instantapp
 * see more detail:https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat.html#getInstantAppCookie()
 * @returns {string}
 */
cc.androidInstant.getInstantAppCookie = function () {
    //fixme:因为jni传回null会报错，js传null过去会变成null字符串，所以要先做这个兼容，看后续是否修复callStaticMethod方法
    let result = _callInstantHelper("getInstantAppCookie", "()Ljava/lang/String;");
    if(result === "null"){
        result = null;
    }
    return result;
    // return _callInstantHelper("getInstantAppCookie", "()Ljava/lang/String;");
};
/**
 * save a cookie into instantapp
 * see more detail: https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat#setInstantAppCookie(byte%5B%5D)
 * @param ck cookie you want to save
 * @returns {boolean}
 */
cc.androidInstant.setInstantAppCookie = function (ck) {
    return _callInstantHelper("setInstantAppCookie", "(Ljava/lang/String;)Z", ck);
};

/**
 * clear cookie from instantapp
 * see more detail: https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat#setInstantAppCookie(byte%5B%5D)
 * @returns {boolean}
 */
cc.androidInstant.clearInstantAppCookie = function () {
    return _callInstantHelper("clearInstantAppCookie", "()Z");
};

/**
 * get max cookie size from instantapp
 * see more detail: https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat.html#getInstantAppCookieMaxSize()
 * @returns {number}
 */
cc.androidInstant.getInstantAppCookieMaxSize = function () {
    return _callInstantHelper("getInstantAppCookieMaxSize", "()I");
};