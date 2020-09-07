window.fb = window.fb || {};

let LIVE_STATUS = {
    UNKNOWN: 0,
    INITIALIZING: 1,
    RUNNING: 2,
    PAUSED: 3,
    STOPPED: 4,
    COMPLETED: 5,
};

class FBLiveSteam {
    constructor() {
        this._useMic = true;
        this._useCamera = true;
        this._eventHandler = new cc.EventTarget();

        this.LIVE_STATUS = LIVE_STATUS;
    }

    set useMic(val) {
        this._useMic = !!val;
        //call to native
        if (!cc.sys.isNative) return;
        if (cc.sys.os == cc.sys.OS_ANDROID) {//android is not support now
            // let methodName = "destroyAd";
            // let className = "org.cocos2dx.javascript/FacebookLive";
            // let methodSignature = "(Ljava/lang/String;)V";
            // jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.id);
        } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
            jsb.reflection.callStaticMethod("FacebookLive", "setMicStatus:", this._useMic);
        }
    }

    get useMic() {
        return this._useMic;
    }

    set useCamera(val) {
        this._useCamera = !!val;
        //call to native
        if (!cc.sys.isNative) return;
        if (cc.sys.os == cc.sys.OS_ANDROID) {//android is not support now
            // let methodName = "destroyAd";
            // let className = "org.cocos2dx.javascript/FacebookLive";
            // let methodSignature = "(Ljava/lang/String;)V";
            // jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.id);
        } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
            jsb.reflection.callStaticMethod("FacebookLive", "setCameraStatus:", this._useCamera);
        }
    }

    get useCamrea() {
        return this._useCamera;
    }

    startLive() {
        this._invoke_native_method("start");
    }

    stopLive() {
        this._invoke_native_method("stop");
    }

    pauseLive() {
        this._invoke_native_method("pause");
    }

    resumeLive() {
        this._invoke_native_method("resume");
    }

    on(event_name, cb, node) {
        this._eventHandler.on(event_name, (data) => {
            cb && cb(data);
        }, node);
    }

    once(event_name, cb, node) {
        this._eventHandler.once(event_name, (data) => {
            cb && cb(data);
        }, node);
    }

    emit(event_name, ...params) {
        this._eventHandler.emit(event_name, ...params);
    }

    off(target_node) {
        this._eventHandler.targetOff(target_node);
    }

    _live_error_received(code) {
        this.emit("onError", parseInt(code));
    }

    _live_status_changed(code) {
        this.emit("onStatusChanged", parseInt(code));
    }

    _invoke_native_method(name) {
        if (cc.sys.isNative) {
            let methodName = `${name}Live`;
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let className = "org.cocos2dx.javascript/FacebookLive";
                let methodSignature = "()V";
                jsb.reflection.callStaticMethod(className, methodName, methodSignature);
            } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
                jsb.reflection.callStaticMethod("FacebookLive", methodName);
            }
        } else {
            cc.warn("facebook live stream is only support on native now");
        }
    }
}
fb.liveStream = fb.liveStream || new FBLiveSteam();
