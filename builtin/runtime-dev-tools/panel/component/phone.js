'use strict';

/**
 * 显示记录的文件详细信息
 */
const fs = require('fs');
const ps = require('path'); // path system
const phone = require('../../utils/phone');
const Dialog = require('electron').remote.dialog;

exports.template = fs.readFileSync(ps.join(__dirname, '../template/phone.html'), 'utf-8');

exports.props = [];

exports.data = function () {
    return {
        list: phone.list,
        curSel: phone.currentPhone,
    };
};

exports.watch = {};

exports.computed = {};

exports.methods = {
    t (key) {
        return Editor.T(key);
    },

    phoneClick(item){
        phone.currentPhone = item;
        this.curSel = phone.currentPhone;
    },

    isSelect(item){
        return item === this.curSel;
    },

    updateSelPhone(){
        this.curSel = phone.currentPhone;
    },

    getPhoneName(item){
        let name = item.id;
        if (item.cp && item.name) {
            name = item.cp + " " + item.name
        }
        return name;
    },

    registerEvent(){
        phone.on('add_device', (device) => {
            this.updateSelPhone();
        });

        phone.on('remove_device', (device) => {
            this.updateSelPhone();
        });
    }
};

exports.created = async function () {
    this.registerEvent();
    await phone.getPhoneList();

    this.curSel = phone.currentPhone;
};

exports.directives = {};