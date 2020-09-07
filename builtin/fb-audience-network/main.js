'use strict';
const Path = require('fire-path');
const Fs = require('fire-fs');
const {android, ios} = Editor.require('app://editor/core/native-packer');
/**
 * 添加 facebook audience network 的 sdk 到 android 工程
 * @param options
 * @returns {Promise}
 */
async function _handleAndroid(options) {
    Editor.log('Audience Network--> adding Audience Network Android support');

    //修改build.gradle文件
    let androidPacker = new android(options);
    if (!androidPacker.addDependence('com.facebook.android:audience-network-sdk', '4.99.0')) {
        return Promise.reject();
    }

    //拷贝android文件
    let srcAndroidPath = Editor.url('packages://fb-audience-network/libs/android');
    let destAndroidPath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/app/src/org/cocos2dx/javascript');

    let fileList = ['FacebookAN.java'];
    fileList.forEach((file) => {
        androidPacker.ensureFile(Path.join(srcAndroidPath, file), Path.join(destAndroidPath, file));
    });

    _copyFsupportFile(options, androidPacker);
}

/**
 * android 和 iOS 共用的资源拷贝
 * @param options
 * @param packer
 * @private
 */
function _copyFsupportFile(options, packer) {
    //拷贝脚本文件
    let srcJsPath = Editor.url('packages://fb-audience-network/libs/js');
    let destJsPath = Path.join(options.dest, 'src');
    Fs.copySync(srcJsPath, destJsPath);

    //在main.js中添加引用
    packer.addRequireToMainJs("src/CCAds.js");
}

/**
 * 添加 facebook live stream 的 sdk 到 iOS 工程，并完成配置
 * @param options
 * @returns {Promise}
 */
async function _handleIOS(options) {
    Editor.log('Audience Network--> adding Audience Network iOS support');
    //第一步，判断是否安装pod 命令
    let iosPacker = new ios(options);
    if (!iosPacker.checkPodEnvironment()) {
        return Promise.reject();
    }
    //第二步：拷贝必要的文件
    _copyFsupportFile(options, iosPacker);

    //第三步：复制FacebookAN的代码到工程，并加入引用
    let srcSupportPath = Editor.url('packages://fb-audience-network/libs/ios/support');
    let destSupportPath = Path.join(options.dest, 'frameworks/runtime-src/proj.ios_mac/ios');
    let fileList = ['FacebookAN.mm', 'FacebookAN.h'];
    fileList.forEach((file) => {
        iosPacker.ensureFile(Path.join(srcSupportPath, file), Path.join(destSupportPath, file));
    });

    //加入Facebook文件的引用
    let targetName = `${options.projectName}-mobile`;
    iosPacker.addFileToProject('ios/FacebookAN.h', 'ios');
    iosPacker.addFileToCompileSource('ios/FacebookAN.mm', targetName, 'ios');

    //第四步，创建Podfile依赖，如果依赖已经存在，那么不进行修改和更新
    let dependence = "FBAudienceNetwork";
    let target = `${options.projectName}-mobile`;
    if (!iosPacker.isDependenceExist(dependence, target)) {
        iosPacker.addPodDependenceForTarget(dependence, target);
        await iosPacker.executePodFile();
    }

    //往 UserConfigIOS.debug.xcconfig 添加 pod include
    _addIncludeToUserConfig(Path.join(options.dest, `frameworks/runtime-src/proj.ios_mac/ios/UserConfigIOS.debug.xcconfig`), options.projectName, 'debug');
    _addIncludeToUserConfig(Path.join(options.dest, `frameworks/runtime-src/proj.ios_mac/ios/UserConfigIOS.release.xcconfig`), options.projectName, 'release');
}

/**
 * UserConfigIOS.xxxx.xcconfig 添加 pod 的 include
 * @param path
 * @param projectName
 * @param mode debug or release
 * @private
 */
function _addIncludeToUserConfig(path, projectName, mode) {

    if (!Fs.existsSync(path)) {
        Editor.warn('file not found ', path);
        return;
    }
    let str = `#include "Pods/Target Support Files/Pods-${projectName}-mobile/Pods-${projectName}-mobile.${mode}.xcconfig"`;
    let content = Fs.readFileSync(path, 'utf8');

    if (content.indexOf(str) !== -1) {
        return;
    }

    content += str + "\n";
    Fs.writeFileSync(path, content);

}

async function handleEvent(options, cb) {
    let config = Editor._projectProfile.get('facebook');

    if (!config || !config.enable || !config.audience.enable) {
        cb && cb();
        return;
    }

    try {
        if (options.actualPlatform.toLowerCase() === 'android') {
            //开始构建的时候，先发个事件
            trackBuildEvent();

            await _handleAndroid(options);
        } else if (options.actualPlatform.toLowerCase() === "ios") {
            //开始构建的时候，先发个事件
            trackBuildEvent();

            await _handleIOS(options);
        }
        cb && cb();
    } catch (e) {
        cb && cb(e);
    }
}

function trackBuildEvent() {
    Editor.Metrics.trackEvent({
        category: 'Facebook',
        action: 'Facebook Audience Network',
        label: 'Build'
    });
}

module.exports = {
    load() {
        Editor.Builder.on('before-change-files', handleEvent);
    },

    unload() {
        Editor.Builder.removeListener('before-change-files', handleEvent);
    },

    messages: {}
};
