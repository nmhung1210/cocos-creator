'use strict';
const Path = require('fire-path');
const Fs = require('fire-fs');
const Globby = require('globby');
const xml2js = require('xml2js');
const {android, ios} = Editor.require('app://editor/core/native-packer');

const REMOTE_ASSETS_PATH = 'remote_assets';

/**
 * 添加 facebook audience network 的 sdk 到 android 工程
 * @param options
 * @returns {Promise}
 */
async function _handleAndroid(options) {
    Editor.log('Android Instant--> adding Android Instant support');

    _genFirstPackage(options);

    //修改build.gradle文件
    let config = options['android-instant'];
    let androidPacker = new android(options);

    //拷贝脚本文件
    let srcJsPath = Editor.url('packages://google-play-instant/libs/js');
    let destJsPath = Path.join(options.dest, 'src');
    Fs.copySync(srcJsPath, destJsPath);

    //读取android-instant-downloader.js 然后添加 INSTANT_REMOTE_SERVER 字段
    let dlPath = Path.join(destJsPath, 'android-instant-downloader.js');
    let dl = Fs.readFileSync(dlPath, 'utf-8');
    dl = dl.replace(/INSTANT_REMOTE_SERVER\s=\s''/g, `INSTANT_REMOTE_SERVER = '${config.REMOTE_SERVER_ROOT}'`);
    Fs.writeFileSync(dlPath, dl);

    //在main.js中添加引用
    androidPacker.addRequireToMainJs("src/android-instant-downloader.js");
    androidPacker.addRequireToMainJs("src/android-instant-helper.js");

    let isUrlValid = !!(config.scheme && config.host && config.pathPattern);

    //添加 instant 启动配置
    let gradlePropertyPath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/gradle.properties');
    if (Fs.existsSync(gradlePropertyPath)) {
        let content = Fs.readFileSync(gradlePropertyPath, 'utf-8');
        if (isUrlValid && content.indexOf('INSTANT_GAME_SCHEME') === -1) {
            let appPath = ['\n', '# google play instant config', `INSTANT_GAME_HOST=${config.host}`, `INSTANT_GAME_PATHPATTERN=${config.pathPattern}`];
            content += appPath.join('\n');
            Fs.writeFileSync(gradlePropertyPath, content);
        }
    }

    //添加 build.gradle 配置
    let buildGradlePath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/game/build.gradle');
    if (Fs.existsSync(buildGradlePath)) {
        let buildGradle = Fs.readFileSync(buildGradlePath, 'utf-8');
        if (isUrlValid && buildGradle.indexOf('android.defaultConfig.manifestPlaceholders') === -1) {
            buildGradle += '\n';
            buildGradle += 'android.defaultConfig.manifestPlaceholders = [host:INSTANT_GAME_HOST,pathPattern:INSTANT_GAME_PATHPATTERN]';
            Fs.writeFileSync(buildGradlePath, buildGradle);
        }
    }

    //修改包名，在 gradle 配置无效，所以直接在 androidManifest.xml 中修改
    let xmlPath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/game/androidManifest.xml');
    do {
        if (!Fs.existsSync(xmlPath)) {
            break;
        }

        let xml = await androidPacker.readXML(xmlPath);

        if (!xml || !xml.manifest || !xml.manifest || typeof xml.manifest.$.package === "undefined") {
            Editor.error('Android Instant--> can\'t find package attribute at androidManifest.xml');
            break;
        }

        //已经有过修改，就不要修改了，如果要修改，用户手动去 android studio 修改
        if (xml.manifest.$.package !== 'org.cocos2dx.javascript') {
            break;
        }

        xml.manifest.$.package = options.packageName;
        Fs.writeFileSync(xmlPath, new xml2js.Builder().buildObject(xml));
    } while (false);

    //判断下url是否配置，没有的话就删掉intent-filter
    if (isUrlValid) {
        await _addFilterDataIfNotExist(androidPacker, options);
    } else {
        await _removeFilterDataIfExist(androidPacker, options);
    }

    _startPreviewServer(options);
}

async function _removeFilterDataIfExist(androidPacker, options) {
    let xmlPath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/game/androidManifest.xml');
    let xml = await androidPacker.readXML(xmlPath);
    do {
        if (!xml || !xml.manifest || !xml.manifest || !xml.manifest.application || !xml.manifest.application.activity || !xml.manifest.application.activity['intent-filter']) {
            break;
        }

        let intentFilter = xml.manifest.application.activity['intent-filter'];

        if (!Array.isArray(intentFilter)) {
            intentFilter = [intentFilter];
        }

        let ft = intentFilter.find(item => {
            return item.$ && item.$['android:order']
        });

        if (!ft || !ft.$) {
            break;
        }

        delete ft.$['android:autoVerify'];

        if (ft.data) {
            delete ft.data;
        }

        Fs.writeFileSync(xmlPath, new xml2js.Builder().buildObject(xml))
    } while (false);
}

async function _addFilterDataIfNotExist(androidPacker, options) {
    let xmlPath = Path.join(options.dest, 'frameworks/runtime-src/proj.android-studio/game/androidManifest.xml');
    let xml = await androidPacker.readXML(xmlPath);
    do {
        if (!xml || !xml.manifest || !xml.manifest || !xml.manifest.application || !xml.manifest.application.activity || !xml.manifest.application.activity['intent-filter']) {
            break;
        }

        let intentFilter = xml.manifest.application.activity['intent-filter'];

        if (!Array.isArray(intentFilter)) {
            intentFilter = [intentFilter];
        }

        let ft = intentFilter.find(item => {
            return item.$ && item.$['android:order']
        });

        ft.$['android:autoVerify'] = true;

        if (!ft || ft.data) {
            break;
        }

        ft.data = [
            {
                "$": {
                    "android:host": "${host}",
                    "android:pathPattern": "${pathPattern}",
                    "android:scheme": "https"
                }
            },
            {
                "$": {"android:scheme": "http"}
            }
        ];

        Fs.writeFileSync(xmlPath, new xml2js.Builder().buildObject(xml))
    } while (false);
}

/**
 * 生成首包的资源
 * @private
 */
function _genFirstPackage(options) {

    //先拷贝第一个包，剩余的资源放入别的文件夹后续备用
    let srcDirPath = Path.join(options.dest, "assets");

    let remoteDirPath = Path.join(options.dest, REMOTE_ASSETS_PATH);
    Fs.removeSync(remoteDirPath);

    if (options['android-instant'].skipRecord) {
        Fs.copySync(srcDirPath, remoteDirPath);
        return
    }

    Editor.log("moving first package files");
    let pkgInfo = Fs.readFileSync(Path.join(options['android-instant'].recordPath, "packageInfo.json"), 'utf-8');
    if (!pkgInfo) return;
    pkgInfo = JSON.parse(pkgInfo);

    //selectCount 有可能因为手动拖拽资源进来而导致比totalCount多
    if (pkgInfo.totalCount <= pkgInfo.selectCount) {
        Fs.copySync(srcDirPath, remoteDirPath);
        return;
    }

    Fs.copySync(srcDirPath, remoteDirPath);

    let paths = Globby.sync([Path.join(srcDirPath, "**"), '!' + Path.join(srcDirPath, "**", "config.*"), '!' + Path.join(srcDirPath, "**", "index.*")], {nodir: true});
    let first_package_list = pkgInfo.first.items.concat(options.scenes);

    paths.forEach(path => {
        let id = Path.basenameNoExt(path);
        let inFirstPackage = first_package_list.find(uuid => {
            return id.indexOf(uuid) !== -1;
        });
        if (!inFirstPackage) {
            Fs.unlinkSync(path);
        }
    });
}

/**
 * 启动测试服务器
 * @param options
 * @private
 */
function _startPreviewServer(options) {
    Editor.Ipc.sendToMain('app:update-android-instant-preview-path', options.dest);
}

async function handleEvent(options, cb) {
    if (options.actualPlatform.toLowerCase() === 'android-instant') {
        await _handleAndroid(options).catch((e) => {
            Editor.log("Some error have occurred while adding Android Instant Android SDK ", e);
        });
    }
    cb && cb();
}

module.exports = {
    load() {
        Editor.Builder.on('build-finished', handleEvent);
    },

    unload() {
        Editor.Builder.removeListener('build-finished', handleEvent);
    },

    messages: {}
};
