'use strict';

/**
 * 显示记录的文件详细信息
 */
const fs = require('fire-fs');
const ps = require('fire-path'); // path system
const console = require('../../utils/log'); // path system

const Dialog = require('electron').remote.dialog;

exports.template = fs.readFileSync(ps.join(__dirname, '../template/console.html'), 'utf-8');

exports.props = [];

exports.data = function () {
    return {
        logs: console.logs
    };
};

exports.watch = {
    logs: function (val) {
        this.$el.scrollTop = this.$el.scrollHeight;
    }
};

exports.computed = {};

exports.methods = {
    t (key) {
        return Editor.T(key);
    },
};

exports.created = function () {
};

exports.directives = {};