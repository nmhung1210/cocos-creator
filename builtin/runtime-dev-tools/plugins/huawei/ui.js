'use strict';

/**
 * 显示记录的文件详细信息
 */
const fs = require('fire-fs');
const path = require('fire-path'); // path system
const dialog = require('electron').remote.dialog;
const huawei = require('./lib/huawei');

let phone = require(Editor.url('packages://runtime-dev-tools/utils/phone'));
let log = require(Editor.url('packages://runtime-dev-tools/utils/log'));
let info = require(Editor.url('packages://runtime-dev-tools/utils/info'));

exports.template = fs.readFileSync(Editor.url('packages://runtime-dev-tools/plugins/huawei/ui.html'), 'utf-8');

exports.name = "huawei-runtime";
exports.props = [];

exports.data = function () {
    return {
        rpkPath: "",
        params: "",
        huawePlugin: huawei,
    };
};

exports.watch = {};

exports.computed = {
    runDisabled: function () {
        return this.huawePlugin.state !== huawei.RUNTIME_STATE.free;
    },

    cancelDisabled: function () {
        return this.huawePlugin.state !== huawei.RUNTIME_STATE.free;
    },
};

exports.methods = {
    t (key) {
        return Editor.T(key);
    },
    register_handler(){
        phone.on('add_device', async(id) => {
            if (huawei.needToCreatLogcat(id)) {
                await huawei.checkRuntime();
                huawei.openLogcat(id);
            }
        });

        phone.on('remove_device', (id) => {

        });
    },

    async installApk(){
        await huawei.installRuntime();
    },

    onChooseRpkPath (event) {
        event.stopPropagation();
        let res = Editor.Dialog.openFile({
            defaultPath: path.join(Editor.Project && Editor.Project.path ? Editor.Project.path : Editor.projectInfo.path, '/build/huawei/dist'),
            properties: ['openFile'],
            filters: [
                {name: `${this.t('runtime-dev-tools.huawei')} runtime rpk`, extensions: ['rpk']}
            ],
        });

        if (res && res[0]) {
            this.rpkPath = res[0];
        }
    },

    getLaunchParams(){
        let params = ['--ei', 'debugmode', "1"];
        if (this.uri) {
            params.push('--es');
            params.push('uri');
            params.push(encodeURIComponent(this.uri));
        }

        if (this.params) {

            let str = "";
            try {
                str = JSON.parse(this.params);
                params.push('--es');
                params.push('params');
                params.push(encodeURIComponent(this.params));
            } catch (e) {
                log.warn(this.t('runtime-dev-tools.error_params'));
            }
        }

        return params.join(" ");
    },

    async launch(){
        if (!fs.existsSync(this.rpkPath)) {
            log.error(this.t('runtime-dev-tools.can_not_find_rpk'), this.rpkPath);
            info.error(this.t('runtime-dev-tools.can_not_find_rpk'), this.rpkPath);
            return;
        }
        await huawei.stopRuntime();
        await huawei.pushRpkToPhone(this.rpkPath);
        await huawei.startRuntimeWithRpk(path.basename(this.rpkPath), this.getLaunchParams());
    },

    async stop(){
        await huawei.stopRuntime();
    }
};

exports.created = async function () {
    this.register_handler();
    await huawei.checkRuntimeVersion();
    this.rpkPath = await huawei.getRpkPath();

};

exports.directives = {};