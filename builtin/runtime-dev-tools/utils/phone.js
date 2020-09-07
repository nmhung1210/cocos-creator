const base = require('./base');
const adbKit = require('adbkit');
const path = require('fire-path');
const log = require('./log');

const ANDROID_SDK_PATH = Editor.remote.App._profile.data['android-sdk-root'];
class phone extends base {
    constructor() {
        super();
        if (!ANDROID_SDK_PATH) {
            let error = '找不到 Android SDK 路径，请到 偏好设置 -> 原生开发环境 中设置';
            Editor.error(error);
            log.error(error);
            return;
        }
        this.adb = adbKit.createClient({
            bin: this.adbPath,
            port:process.env.ANDROID_ADB_SERVER_PORT || 5037
        });
        this.list = [];
        this.currentPhone = null;
        this.platform = null;
        //用来接收builder传递过来的参数
        this.options = null;
        this.init();
    }

    init() {
        return Promise.resolve().then(async() => {
            await this._initTracker();
        }).catch((e) => {
            log.error(e);
        });
    }

    /**
     * 获取 adb 的路径
     * @returns {string}
     */
    get adbPath() {
        return path.join(ANDROID_SDK_PATH, 'platform-tools', 'adb');
    }

    /**
     * 安装apk
     * @param id
     * @param apkPath
     * @returns {Promise.<void>}
     */
    async install(id, apkPath) {
        try {
            await this.adb.install(id, apkPath);
        } catch (e) {

        }
    }

    /**
     * 执行adb shell 命令
     * @param id
     * @param command
     * @returns {Promise.<void>}
     */
    async shell(id, command) {
        try {
            log.debug('exec shell command =>', command);
            return await this.adb.shell(id, command).then(adbKit.util.readAll).then((buf) => {
                return buf.toString('utf-8').trim();
            });
        } catch (e) {
            log.error(e);
        }
    }

    /**
     * 执行adb push 命令
     * @param id
     * @param srcPath
     * @param destPath
     * @returns {Promise.<void>}
     */
    async push(id, srcPath, destPath) {
        try {
            return this.adb.push(id, srcPath, destPath);
        } catch (e) {
            log.error(e);
        }
    }

    /**
     * 启动手机插入拔出的监听
     * @private
     */
    async _initTracker() {
        try {
            let tracker = await this.adb.trackDevices();

            tracker.on('add', async(device) => {
                //延迟发送，因为手机链接有一个授权过程
                setTimeout(async() => {
                    await this._addPhone(device);
                }, 500);
            });
            tracker.on('remove', (device) => {
                this._removePhone(device);
                setTimeout(() => {
                    this.emit('remove_device', device.id);
                }, 500);
            });
            tracker.on('end', () => {
            });
        } catch (e) {
            log.error(e);
        }
    }

    /**
     * 获取手机列表
     * @returns {Promise.<Array>}
     */
    async getPhoneList() {
        try {
            let list = await this.adb.listDevices();
            for (let i = 0; i < list.length; i++) {
                await this._addPhone(list[i]);
            }
            this.currentPhone = list[0];
            return this.list;
        } catch (e) {
            log.error(e);
        }
    }

    /**
     * 获取手机型号
     * @param id
     * @returns {Promise.<void>}
     */
    async getDeviceName(id) {
        let grepName = await this.shell(id, `getprop ro.product.model`);
        if (!grepName) {
            log.warn('获取不到设备型号');
        }

        return grepName;
    }

    /**
     * 获取手机的制造商
     * @param id
     * @returns {Promise.<void>}
     */
    async getDeviceManufacturer(id) {
        let grepManu = await this.shell(id, `getprop ro.product.brand`);
        if (!grepManu) {
            log.warn('获取不到设备制造商');
        }

        return grepManu;
    }

    /**
     * 根据包名判断某个apk是否安装
     * @param id
     * @param pkg
     * @returns {Promise.<boolean>}
     */
    async isInstalled(id, pkg) {
        try {
            return await this.adb.isInstalled(id, pkg);
        } catch (e) {
            log.error(e);
        }
    }

    async _addPhone(item) {

        let same = this.list.find((ph) => {
            return ph.id === item.id;
        });
        if (!same) {
            item.name = await this.getDeviceName(item.id);
            item.cp = await this.getDeviceManufacturer(item.id);
            this.list.push(item);

            if (this.list.length === 1) {
                this.currentPhone = this.list[0];
            }

            this.emit('add_device', item.id);
        }

    }

    _removePhone(item) {
        let rph = this.list.find((ph) => {
            return ph.id === item.id;
        });

        if (rph) {
            this.list.splice(this.list.indexOf(rph), 1);
            if (this.list.indexOf(this.currentPhone) === -1) {
                this.currentPhone = null;
            }
        }

    }
}

module.exports = new phone();