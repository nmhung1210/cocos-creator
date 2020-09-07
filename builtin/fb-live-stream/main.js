'use strict';
const Path = require('fire-path');
const Fs = require('fire-fs');
const xml2js = require("xml2js");
const xcode = require('xcode');
const plist = require('plist');
const {android, ios} = Editor.require('app://editor/core/native-packer');
/**
 * 添加 facebook live stream 的 sdk 到 android 工程
 * @param options
 * @returns {Promise}
 */
async function _handleAndroid(options) {
    Editor.log('Facebook Live Stream --> adding ALive Stream Android support');
    let config = Editor._projectProfile.get('facebook');

    let androidPacker = new android(options);

    //修改build.gradle文件
    androidPacker.addDependence('com.facebook.android:facebook-login', '4.+');

    //添加aar文件
    let srcLibPath = Editor.url('packages://fb-live-stream/libs/android/facebook-livestream.aar');
    androidPacker.addLib(srcLibPath);

    //拷贝android文件
    let srcAndroidPath = Editor.url('packages://fb-live-stream/libs/android');
    let destAndroidPath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/app/src/org/cocos2dx/javascript');
    let fileList = ['FacebookLive.java'];
    fileList.forEach((file) => {
        androidPacker.ensureFile(Path.join(srcAndroidPath, file), Path.join(destAndroidPath, file));
    });

    //添加AndroidManifest.xml的一些字段
    await androidPacker.addManifestApplicationConfig('meta-data', {
        "$": {"android:name": "com.facebook.sdk.ApplicationId", "android:value": "@string/facebook_app_id"}
    });
    await androidPacker.addManifestApplicationConfig('receiver', {
        "$": {
            "android:name": "com.facebook.livestreaming.LiveStreamBroadcastReceiver",
            "android:exported": true
        },
        "intent-filter": {
            "action": [
                {"$": {"android:name": "com.facebook.livestreaming.status"}},
                {"$": {"android:name": "com.facebook.livestreaming.error"}}]
        }
    });

    //添加两个字段到strings.xml
    await androidPacker.addStringToStringXML({
        "$": {
            name: "facebook_app_id",
            translatable: "false"
        },
        "_": config.appID
    });

    await androidPacker.addStringToStringXML({
        "$": {
            name: "fb_login_protocol_scheme",
            translatable: "false"
        },
        "_": `fb${config.appID}`
    });

    //拷贝js资源，并加入require
    _copyFsupportFile(options, androidPacker);
}

/**
 * android 和iOS 共用的资源拷贝
 * @param options
 * @param packer
 * @private
 */
function _copyFsupportFile(options, packer) {
    //拷贝脚本文件
    let srcJsPath = Editor.url('packages://fb-live-stream/libs/js');
    let destJsPath = Path.join(options.dest, 'src');
    Fs.copySync(srcJsPath, destJsPath);

    packer.addRequireToMainJs("src/fb-live-stream.js");
}

/**
 * 添加 facebook live stream 的 sdk 到 iOS 工程
 * @param options
 * @returns {Promise}
 */
async function _handleIOS(options) {
    Editor.log('Facebook Live Stream --> adding ALive Stream iOS support');
    let config = Editor._projectProfile.get('facebook');

    let iosPacker = new ios(options);

    //第一步，拷贝framework
    let libPath = Path.join(options.dest, 'frameworks/runtime-src/proj.ios_mac/frameworks');
    let srcLibPath = Editor.url('packages://fb-live-stream/libs/ios/framework');
    iosPacker.ensureFile(srcLibPath, libPath);

    //第二步，为工程添加framework索引
    let projectPath = Path.join(options.dest, `frameworks/runtime-src/proj.ios_mac/${options.projectName}.xcodeproj/project.pbxproj`);
    if (!Fs.existsSync(projectPath)) {
        Editor.error('Can\'t find xcodeproj file at path: ', projectPath);
        return Promise.reject();
    }

    let targetName = `${options.projectName}-mobile`;

    iosPacker.addFramework('frameworks/Bolts.framework', targetName);
    iosPacker.addFramework('frameworks/FBSDKCoreKit.framework', targetName);
    iosPacker.addFramework('frameworks/FBSDKLiveStreamingKit.framework', targetName);


    //第三步，修改info.plist加入fbid
    let infoListPath = Path.join(options.dest, 'frameworks/runtime-src/proj.ios_mac/ios/Info.plist');
    if (!Fs.existsSync(infoListPath)) {
        Editor.error('Can\'t find Info.plist file at path: ', infoListPath);
        return Promise.reject();
    }

    let data = Fs.readFileSync(infoListPath, 'utf-8');
    let parseData = plist.parse(data);
    parseData.FacebookAppID = config.appID;

    if (!parseData.FacebookDisplayName) {
        parseData.FacebookDisplayName = options.projectName;
    }

    if (!parseData.NSCameraUsageDescription) {
        parseData.NSCameraUsageDescription = 'The camera will show the player during the live stream.';
    }

    if (!parseData.NSMicrophoneUsageDescription) {
        parseData.NSMicrophoneUsageDescription = 'The microphone will record the player\'s voice during the live stream.';
    }

    if (!parseData.LSApplicationQueriesSchemes) {
        parseData.LSApplicationQueriesSchemes = ["fbapi", "fb-messenger-share-api", "fbauth2", "fbshareextension", "fb-broadcastextension"];
    }

    let urlTemplate = {
        "CFBundleTypeRole": "Editor",
        "CFBundleURLName": "",
        "CFBundleURLSchemes": [`fb${config.appID}`]
    };

    if (!parseData.CFBundleURLTypes) {
        parseData.CFBundleURLTypes = [urlTemplate];
    } else if (JSON.stringify(parseData.CFBundleURLTypes).indexOf(`fb${config.appID}`) == -1) {
        parseData.CFBundleURLTypes.push(urlTemplate);
    }

    Fs.writeFileSync(infoListPath, plist.build(parseData));

    //第四步，修改 添加FacebookLive.mm ，加入 Live Stream 的引用
    let srcSupportPath = Editor.url('packages://fb-live-stream/libs/ios/support');
    let destSupportPath = Path.join(options.dest, 'frameworks/runtime-src/proj.ios_mac/ios');
    let fileList = ['FacebookLive.mm', 'FacebookLive.h'];
    fileList.forEach((file) => {
        iosPacker.ensureFile(Path.join(srcSupportPath, file), Path.join(destSupportPath, file));
    });

    //加入Facebook文件的引用
    iosPacker.addFileToProject('ios/FacebookLive.h', 'ios');
    iosPacker.addFileToCompileSource('ios/FacebookLive.mm', `${options.projectName}-mobile`, 'ios');

    //第五步，修改AppController.mm的代码，添加一个初始化参数
    let contentPath = Path.join(options.dest, 'frameworks/runtime-src/proj.ios_mac/ios/AppController.mm');
    let command = '[[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];';
    let head = '#import <FBSDKCoreKit/FBSDKCoreKit.h>';

    let content = Fs.readFileSync(contentPath, 'utf-8');
    if (content) {
        content = _addStringIfNotExist(content, head, new RegExp('using namespace cocos2d;'), 0);
        content = _addStringIfNotExist(content, command, new RegExp('app->start\\(\\);'), 1);
        Fs.writeFileSync(contentPath, content);
    }

    //第六步，拷贝js资源，并加入require
    _copyFsupportFile(options, iosPacker);
}
/**
 * 增加一些代码，如果代码不存在的话
 * @param content 要查找的内容
 * @param str 要添加的字符串
 * @param reg 用来匹配字符串的正则
 * @param tabNum 要多少个缩进，只是让代码美观
 * @returns {*}
 * @private
 */
function _addStringIfNotExist(content, str, reg, tabNum) {
    let result = content;
    tabNum = tabNum || 0;
    if (result.indexOf(str) === -1) {
        let tab = "";
        for (let i = 0; i < tabNum; i++) {
            tab += "    ";
        }
        result = result.replace(reg, (sub) => {
            return str + "\n\n" + tab + sub;
        });
    }
    return result;
}

function trackEvent() {
    let config = Editor._projectProfile.get('facebook');
    if (!config.appID) return;
    Editor.Metrics.trackEvent({
        category: 'Facebook',
        action: 'Facebook Live Stream APPID',
        label: config.appID,
    });
}

function trackBuildEvent() {
    Editor.Metrics.trackEvent({
        category: 'Facebook',
        action: 'Facebook Live Stream',
        label: 'Build'
    });
}

async function handleFiles(options, cb) {
    let config = Editor._projectProfile.get('facebook');
    if (!config || !config.enable || !config.live.enable) {
        cb && cb();
        return;
    }


    try {
        if (options.actualPlatform.toLowerCase() === 'android') {
            //事件统计
            trackBuildEvent();
            trackEvent();

            await _handleAndroid(options);
        } else if (options.actualPlatform.toLowerCase() === "ios") {
            //事件统计
            trackBuildEvent();
            trackEvent();

            await _handleIOS(options);
        }
        cb && cb();
    } catch (e) {
        cb && cb(e);
    }
}

module.exports = {
    load() {
        Editor.Builder.on('before-change-files', handleFiles);
    },

    unload() {
        Editor.Builder.removeListener('before-change-files', handleFiles);
    },

    messages: {}
};
