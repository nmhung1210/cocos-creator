'use strict';

/**
 * 显示记录的文件详细信息
 */
const fs = require('fire-fs');
const phone = require('../../utils/phone');
const path = require('fire-path'); // path system

const Dialog = require('electron').remote.dialog;

exports.template = fs.readFileSync(path.join(__dirname, '../template/main.html'), 'utf-8');

exports.props = [
    "platform"
];

exports.data = function () {
    return {};
};

exports.watch = {};

exports.computed = {};

exports.methods = {
    t (key) {
        return Editor.T(key);
    },


};

exports.created = function () {
};

exports.directives = {};

exports.components = {};

(function () {
    let dirs = fs.readdirSync(Editor.url('packages://runtime-dev-tools/plugins/'));
    dirs.forEach((name) => {
        let dirPath = path.join(Editor.url('packages://runtime-dev-tools/plugins/'), name);
        let uiEntry = path.join(Editor.url('packages://runtime-dev-tools/plugins/'), name, 'ui.js');
        if (fs.isDirSync(dirPath) && fs.existsSync(uiEntry)) {
            exports.components[name] = require(uiEntry);
        } else {
            Editor.warn(`load ${name} runtime dev plugin fail`);
        }
    })

})();