'use strict';
const fs = require('fire-fs');
const path = require('fire-path');
const url = require('fire-url');
const {promisify} = require('util');
const {spawn} = require('child_process');
const dialog = require('electron').remote.dialog;

const network = require('./network');

let phone = require(Editor.url('packages://runtime-dev-tools/utils/phone'));
let log = require(Editor.url('packages://runtime-dev-tools/utils/log'));
let info = require(Editor.url('packages://runtime-dev-tools/utils/info'));
let base = require(Editor.url('packages://runtime-dev-tools/utils/base'));

//华为runtime下载路径
let RUNTIME_DOWNLOAD_PATH = Editor.url(`profile://global/download/runtime/huawei/`);

//华为runtime版本请求地址
const RUNTIME_REQUEST_URL = 'https://deveco.huawei.com/FastIDE/update/api/update/engineVersion/';
//rpk 推送的默认路径
const RUNTIME_RPK_PATH = '/data/local/tmp/';
//runtime的包名
const RUNTIME_PACKAGE_NAME = 'com.huawei.fastapp.dev';

const RUNTIME_STATE = {
    free: 0,//空闲
    downloading: 1,//下载runtime
    installing: 2,//安装runtime
    pushing: 3,//推数据到手机
    launching: 4//apk启动中
};

function t(...params) {
    return Editor.T(...params);
}

let _compareVersion = function (src, dest) {
    let large = false;
    let srcArr = src.split('.');
    let destArr = dest.split('.');
    for (let i = 0; i < srcArr.length; i++) {
        let sptSrc = srcArr[i];
        let sptDest = destArr[i];
        if (i === srcArr.length - 1) {
            let isSrcDev = false;
            let isDestDev = false;
            if (srcArr[i].split("_").length > 1) {
                sptSrc = srcArr[i].split("_")[0];
                isSrcDev = true;
            }

            if (destArr[i] && destArr[i].split("_").length > 1) {
                sptDest = destArr[i].split("_")[0];
                isDestDev = true;
            }

            if (sptSrc === sptDest) {
                large = !isSrcDev && isDestDev;
                break;
            }
        }

        if (sptSrc > sptDest) {
            large = true;
            break;
        } else if (sptSrc < sptDest) {
            large = false;
            break;
        }
    }
    return large;
};

/**
 * 用来放跟华为相关的一些操作
 */
class huawei extends base {

    constructor() {
        super();
        this.RUNTIME_STATE = RUNTIME_STATE;
        this.state = RUNTIME_STATE.free;
        this.runtimeApkPath = null;
        this.logList = {};
    }

    get rpkPath() {

    }

    async getRpkPath() {
        let hwConfig = await promisify(Editor.Profile.load.bind(Editor.Profile))('profile://project/huawei-runtime.json');
        return path.join(phone.options.buildPath, 'huawei', 'dist', `${hwConfig.data.package}.rpk`);
    }

    /**
     * 请求runtime的版本
     * @returns {Promise.<T>}
     */
    requestRuntimeVersion() {
        info.log(t('runtime-dev-tools.check_runtime_version'));
        return network.get(RUNTIME_REQUEST_URL).then((ret) => {
            ret = ret.toString();
            return JSON.parse(ret);
        }).catch((e) => {
            console.error('requestRuntimeVersion error', e);
        });
    }

    /**
     * 判断本地版本的runtime，如果没有，那么就下载
     * @returns {Promise.<void>}
     */
    async checkRuntimeVersion() {
        let version = await this.requestRuntimeVersion();
        let urlParam = version.url.split('/');
        let runtimeVersion = urlParam[urlParam.length - 1];
        this.runtimeVersion = version.version;
        log.debug(t('runtime-dev-tools.latest_runtime_version', {version: version.version}));

        let filePath = path.join(RUNTIME_DOWNLOAD_PATH, runtimeVersion);
        if (!fs.existsSync(filePath)) {
            info.log(t('runtime-dev-tools.runtime_not_exists', {version: version}));
            fs.ensureDirSync(RUNTIME_DOWNLOAD_PATH);
            this._downloadRuntimeApk(version.url, filePath);
        }
        this.runtimeApkPath = filePath;
    }

    /**
     * 下载runtime的apk
     * @param url
     * @param path
     * @private
     */
    _downloadRuntimeApk(url, path) {
        this.state = RUNTIME_STATE.downloading;
        network.download(url, path, (progress) => {
            info.log(t('runtime-dev-tools.runtime_downloading', {progress: progress.toFixed(2) * 100}));
        }, (result) => {
            this.state = RUNTIME_STATE.free;
            info.log(t('runtime-dev-tools.download_finish'));
        });
    }

    /**
     * 检测手机的runtime版本
     */
    async checkPhoneRuntimeVersion() {
        if (!this._checkPhoneConnect()) {
            return;
        }

        let version = await phone.shell(phone.currentPhone.id, `dumpsys package ${RUNTIME_PACKAGE_NAME} | grep versionName`);
        version = version.split("=");

        if (version.length <= 0) {
            info.warn(t('runtime-dev-tools.can_not_find_runtime'));
            return
        }

        version = version[1];
        log.debug(t('runtime-dev-tools.now_runtime_version', {version: version}));
        return this.compareRuntime(version);
    }

    /**
     * 比较下version和本机记录的版本哪个比较新
     * @param version
     * @returns {boolean}
     */
    compareRuntime(version) {
        return _compareVersion(this.runtimeVersion, version);
    }

    /**
     * 判断runtime是否安装
     * @returns {Promise.<*>}
     */
    async isRuntimeInstalled() {
        if (!this._checkPhoneConnect()) {
            return;
        }
        return await phone.isInstalled(phone.currentPhone.id, RUNTIME_PACKAGE_NAME);
    }

    /**
     * 安装runtime
     * @returns {Promise.<void>}
     */
    async installRuntime() {
        if (!this.runtimeApkPath) {
            info.error(t('runtime-dev-tools.can_not_find_apk'));
            return;
        }

        this.state = RUNTIME_STATE.installing;
        info.log(t('runtime-dev-tools.runtime_installing'));
        await phone.install(phone.currentPhone.id, this.runtimeApkPath);
        this.state = RUNTIME_STATE.free;
        info.log(t('runtime-dev-tools.runtime_installed',));
    }

    /**
     * 检查runtime的一套逻辑
     * 1.先检查看看有没有安装，没有安装就直接安装
     * 2.如果安装了，那么检查下版本有没有更新，没有就安装新版本
     * @returns {Promise.<void>}
     */
    async checkRuntime() {
        if (!this._checkPhoneConnect()) {
            return;
        }

        if (!await this.isRuntimeInstalled()) {
            await this.installRuntime();
            return;
        }

        info.log(t('runtime-dev-tools.check_installed_runtime_version'));
        if (await this.checkPhoneRuntimeVersion()) {
            dialog.showMessageBox({
                type: 'info',
                title: t('runtime-dev-tools.runtime_update'),
                message: t('runtime-dev-tools.dialog_msg'),
                buttons: [t('runtime-dev-tools.confirm'), t('runtime-dev-tools.cancel')]
            }, async(response) => {
                if (0 == response) {
                    await this.installRuntime();
                } else {
                    log.warn(t('runtime-dev-tools.cancel_runtime_tips'));
                    info.warn(t('runtime-dev-tools.cancel_runtime_tips'));
                }
            });
        } else {
            info.log(t('runtime-dev-tools.check_latest_runtime_version'));
        }
    }

    _checkPhoneConnect() {
        if (!phone.currentPhone) {
            info.warn(t('runtime-dev-tools.lose_phone_connect'));
            return false;
        }
        return true;
    }

    async pushRpkToPhone(rpkPath) {
        if (!this._checkPhoneConnect()) {
            return Promise.reject();
        }
        this.state = RUNTIME_STATE.pushing;
        return new Promise(async(resolve, reject) => {
            info.log(t('runtime-dev-tools.begin_push'));
            let destPath = RUNTIME_RPK_PATH + path.basename(rpkPath);
            let size = fs.statSync(rpkPath).size;
            //todo:不能用path.join 因为在windows上面，destPath只能是 /data/local/tmp/ 不能是\data\local\tmp\
            let transfer = await phone.push(phone.currentPhone.id, rpkPath, destPath);
            transfer.on('progress', function (stats) {
                info.log(t('runtime-dev-tools.runtime_update', {progress: parseInt(100 * stats.bytesTransferred / size)}));
            });
            transfer.on('end', function () {
                resolve();
                this.state = RUNTIME_STATE.free;
                info.log(t('runtime-dev-tools.push_finish'));
            });
            transfer.on('error', (data) => {
                reject();
                this.state = RUNTIME_STATE.free;
                info.error(t('runtime-dev-tools.push_error'));
            });
        });
    }

    /**
     * 启动runtime
     * @param rpkName
     * @param param
     * @returns {Promise.<void>}
     */
    async startRuntimeWithRpk(rpkName, param) {
        if (!this._checkPhoneConnect()) {
            return;
        }
        info.log(t('runtime-dev-tools.start_runtime'));
        this.state = RUNTIME_STATE.launching;
        //todo:不能用 path.join 因为在 windows 上面，destPath只能是 /data/local/tmp/ 不能是\data\local\tmp\
        let rpkPath = "file://" + RUNTIME_RPK_PATH + rpkName;
        let shellCmd = `am start --es rpkpath ${rpkPath} ${param} --activity-clear-top com.huawei.fastapp.dev/com.huawei.fastapp.app.RpkRunnerActivity`;
        await phone.shell(phone.currentPhone.id, shellCmd);
        info.log(t('runtime-dev-tools.start_runtime_finish'));
        this.state = RUNTIME_STATE.free;
    }

    /**
     * 打开logcat记录日志
     */
    openLogcat(id) {
        //不延迟启动的话，可能手机还在授权中，有概率报错无法启动
        setTimeout(() => {
            if (!this._checkPhoneConnect()) {
                return;
            }
            const proc = spawn(phone.adbPath, ['-s', id, 'shell', 'logcat', '-s', 'jsLog']);
            this.logList[phone.currentPhone.id] = proc;
            proc.stdout.on('data', (msg) => {
                log.log(msg.toString('utf-8'));
            });

            proc.on('close', (code) => {
                log.log(`logcat exit with code: ${code}`);
                for (let k in this.logList) {
                    let item = this.logList[k];
                    if (item = proc) {
                        delete this.logList[k];
                    }
                }
            })
        }, 600);
    }

    /**
     * 判断是否需要启动logcat进程
     * @param id
     * @returns {boolean}
     */
    needToCreatLogcat(id) {
        return !this.logList[id];
    }

    /**
     * 停止runtime
     * @returns {Promise.<void>}
     */
    async stopRuntime() {
        if (!this._checkPhoneConnect()) {
            return;
        }
        info.log(t('runtime-dev-tools.stop_runtime'));
        await phone.shell(phone.currentPhone.id, ' am force-stop com.huawei.fastapp.dev');
    }

}

module.exports = new huawei();