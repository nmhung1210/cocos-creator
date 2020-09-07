'use strict';

const fs = require('fs');
const phone = Editor.require('packages://runtime-dev-tools/utils/phone');

const home = Editor.require('packages://runtime-dev-tools/panel/component/home');

Editor.Panel.extend({

    listeners: {
        'panel-resize'() {
            if (!this.vm) {
                return;
            }

            this.vm.width = event.target.clientWidth;
            this.vm.height = event.target.clientHeight;
        },
    },

    style: fs.readFileSync(Editor.url('packages://runtime-dev-tools/panel/style/index.css')),

    template: home.template,

    messages: {},

    run (options) {
        phone.options = options;
    },

    ready () {
        //todo:因为有时候需要传入参数，但是run又在ready后面执行,而且如果没有参数就不执行run回调，所以只能做这个兼容
        process.nextTick(() => {
            if (!phone.options || !phone.options.actualPlatform) {
                Editor.error('快游戏工具找不到 runtime 组件信息，请从构建发布面板打开');
                return;
            }
            this.vm = new Vue({
                el: this.shadowRoot,
                data: home.data(),
                components: home.components,
                created: home.created,
                methods: home.methods,
                watch: home.watch,
            });
            this.vm.width = this.clientWidth;
            this.vm.platform = phone.options.actualPlatform;
        });
    },

    close () {

    },

    save (event) {

    }

});