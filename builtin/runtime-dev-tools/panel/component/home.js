'use strict';

const fs = require('fire-fs');
const phone = require('../../utils/phone');
const path = require('fire-path'); // path system

const Dialog = require('electron').remote.dialog;

exports.components = {
    main: require('./main'),
    console: require('./console'),
    phone: require('./phone'),
    info: require('./info'),
};

exports.template = fs.readFileSync(path.join(__dirname, '../template/home.html'), 'utf-8');

exports.props = [];

exports.data = function () {
    return {
        width: 0, // panel 的宽度
        loading: false,
        platform: phone.options.actualPlatform,
    };
};

exports.watch = {

};

exports.methods = {
    t (key) {
        return Editor.T(key);
    },
};

exports.computed = {};

exports.created = function () {

};