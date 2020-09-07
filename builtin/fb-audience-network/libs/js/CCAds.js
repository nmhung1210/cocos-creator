cc.Ads = cc.Ads || {};
cc.Ads.ADS_TYPE = {
    BANNER: 1,
    REWARDEDVIDEO: 2,
    INTERSTITIAL: 3,
};

cc.Ads.BANNER_POSITION = {
    ALIGN_PARENT_TOP: 1,
    ALIGN_PARENT_BOTTOM: 2,
};

cc.Ads.BANNER_SIZE = {
    AD_INTERSTITIAL: 1,
    BANNER_HEIGHT_50: 2,
    BANNER_HEIGHT_90: 3,
    RECTANGLE_HEIGHT_250: 4,
};

cc.Ads.ERROR_CODE = {
    NO_FILL: 1,
    NETWORK_ERROR: 2,
};

let _AD_STATUS = {
    NO_FILL: -1,
    INIT: 0,
    CREATED: 1,
    LOADED: 2,
};

let AD_LIST = {};

cc.Ads._eventReceiver = function (eventName, placementId, code) {
    let item = AD_LIST[placementId];
    if (!item) {
        cc.warn('Ads not found ', placementId);
        return;
    }
    item.emit(eventName, code);
};

class _baseAds {
    constructor(id, type) {
        this._eventHandler = new cc.EventTarget();
        this.id = id;
        this.type = type;
        this.status = _AD_STATUS.INIT;
        AD_LIST[id] = this;
    }

    _createAd() {
        this._register_handler();

        if (cc.sys.isNative) {
            let methodName = 'createAd';
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let className = "org.cocos2dx.javascript/FacebookAN";
                let methodSignature;
                if (this.type === cc.Ads.ADS_TYPE.BANNER) {
                    methodSignature = "(Ljava/lang/String;II)V";
                    jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.id, this.size, this.position);
                } else {
                    methodSignature = "(ILjava/lang/String;)V";
                    jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.type, this.id);
                }

            } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
                if (this.type === cc.Ads.ADS_TYPE.BANNER) {
                    jsb.reflection.callStaticMethod("FacebookAN", "createAd:withSize:andPosition:", this.id, this.size + "", this.position + "");
                } else if (this.type === cc.Ads.ADS_TYPE.INTERSTITIAL || this.type === cc.Ads.ADS_TYPE.REWARDEDVIDEO) {
                    jsb.reflection.callStaticMethod("FacebookAN", "createAd:withId:", this.type, this.id);
                }
            }
        }
    }

    _register_handler() {
        this.on("onCreated", () => {
            this.status = _AD_STATUS.CREATED;
        }, this);

        this.on("onAdLoaded", () => {
            this.status = _AD_STATUS.LOADED;
        }, this);

        this.on("onError", (code) => {
            this.status = _AD_STATUS.NO_FILL;
        }, this);
    }

    loadAd() {
        if (!cc.sys.isNative) {
            return Promise.reject();
        }

        let createdPromise = new Promise((resolve, reject) => {
            if (this.status > _AD_STATUS.INIT) {
                resolve();
            } else if (this.status === _AD_STATUS.NO_FILL) {
                throw _AD_STATUS.NO_FILL;
            } else {
                this.once("onCreated", () => {
                    resolve();
                });
            }
        });

        return createdPromise.then(() => {
            return new Promise((resolve, reject) => {
                if (this.status >= _AD_STATUS.LOADED) {
                    resolve();
                    return;
                } else if (this.sataus === _AD_STATUS.NO_FILL) {
                    cc.log("ad no fill");
                    reject();
                }

                this.once("onAdLoaded", () => {
                    resolve();
                });

                this.once("onError", (e) => {
                    reject(e);
                });

                let methodName = "loadAd";
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    let className = "org.cocos2dx.javascript/FacebookAN";
                    let methodSignature = "(Ljava/lang/String;)V";
                    jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.id);
                } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
                    methodName = "loadAd:";
                    jsb.reflection.callStaticMethod("FacebookAN", methodName, this.id);
                }
            });
        }).catch((e) => {
            cc.error("load ads error", e);
        });
    }

    show() {
        if (!cc.sys.isNative) {
            return Promise.reject();
        }

        return this.loadAd().then(() => {
            if (this.status < _AD_STATUS.LOADED) {
                throw this.status;
            }

            let methodName = "showAd";
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let className = "org.cocos2dx.javascript/FacebookAN";
                let methodSignature = "(Ljava/lang/String;)V";
                jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.id);
            } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
                methodName = "showAd:";
                jsb.reflection.callStaticMethod("FacebookAN", methodName, this.id);
            }
        }).catch((e) => {
            cc.error("show ads error", e);
        });
    }

    destroy() {
        delete AD_LIST[this.id];
        this._eventHandler._callbackTable = {};

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            let methodName = "destroyAd";
            let className = "org.cocos2dx.javascript/FacebookAN";
            let methodSignature = "(Ljava/lang/String;)V";
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, this.id);
        } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
            jsb.reflection.callStaticMethod("FacebookAN", "destroyAd:", this.id);
        }
    }

    getPlacementId() {
        return this.id;
    }

    isAdInvalidated() {

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
}

class Banner extends _baseAds {
    constructor(id, position, size) {
        super(id, cc.Ads.ADS_TYPE.BANNER);
        this.position = position || cc.Ads.BANNER_POSITION.ALIGN_PARENT_TOP;
        this.size = size || cc.Ads.BANNER_SIZE.BANNER_HEIGHT_50;
        this._createAd();
    }
}

class RewardedVideo extends _baseAds {
    constructor(id) {
        super(id, cc.Ads.ADS_TYPE.REWARDEDVIDEO);
        this._createAd();
    }
}

class Interstitial extends _baseAds {
    constructor(id) {
        super(id, cc.Ads.ADS_TYPE.INTERSTITIAL);
        this._createAd();
    }
}

cc.Ads.Banner = Banner;
cc.Ads.RewardedVideo = RewardedVideo;
cc.Ads.Interstitial = Interstitial;