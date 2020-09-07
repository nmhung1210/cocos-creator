'use strict';

/**
 * 显示记录的文件详细信息
 */
const fs = require('fire-fs');
const ps = require('fire-path'); // path system
const info = require('../../utils/info');

const Dialog = require('electron').remote.dialog;

exports.template = fs.readFileSync(ps.join(__dirname, '../template/info.html'), 'utf-8');

exports.props = [];

exports.data = function () {
    return {
        infoType: info.LOG,
        content: "",
    };
};

exports.watch = {};

exports.computed = {};

exports.methods = {
    t (key) {
        return Editor.T(key);
    },

    register_handler(){
        info.on('log', (type, ...str) => {
            this.infoType = type;
            this.content = str.join(' ');
        });
    }
};

exports.created = function () {
    this.register_handler();
};

exports.directives = {};