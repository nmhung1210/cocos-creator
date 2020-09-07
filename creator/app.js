'use strict';

const EditorFramework = require('./editor-framework');
const Path = require('fire-path');
const Electron = require('electron');

//启动的时候加上系统环境变量到process.env.PATH
require('fix-path')();

// 设置程序名
if (process.platform === 'win32') {
    Electron.app.setAppUserModelId('com.cocos.cocoscreator.CocosCreator');
}

// switch off Chromium blacklist for better graphic card compatibility
Electron.app.commandLine.appendSwitch('ignore-gpu-blacklist');
// expose gc to global.gc for manually gc memory
Electron.app.commandLine.appendSwitch('js-flags', '--expose-gc');
// https://github.com/cocos-creator/2d-tasks/issues/2200
Electron.app.commandLine.appendSwitch('--disable-gpu-process-crash-limit');
Electron.app.disableDomainBlockingFor3DAPIs();

// 从 Editor-framework 启动
EditorFramework.App.extend({

    /**
     * 初始化之前，解析传入参数
     * @param {*} yargs 
     */
    beforeInit (yargs) {
        yargs.usage('cocos-creator <path> [options]').options({
            path: { type: 'string', desc: 'Open a project by path' },
            nologin: { type: 'boolean', desc: 'Do not require login in dev mode' },
            internal: { type: 'boolean', desc: 'Show internal mount' },
            testing: { type: 'boolean', desc: 'Use test update feed' },
            mount: { type: 'string', array: true, desc: 'Mount external resources' },
            writable: {
                type: 'boolean',
                desc:
                'Specify the external resources are writable. Default is readonly.'
            },
            build: { type: 'string', desc: 'Build options' },
            compile: { type: 'string', desc: 'Compile options' },
            force: {type: 'boolean', desc: 'Skip version detection tips'},
        });
    },

    /**
     * 初始化程序
     * @param {*} options 
     * @param {*} callback 
     */
    init (options, callback) {
        let args = EditorFramework.argv;

        if (args._command === 'test' || args._command === 'build') {
            const Editor = require('./editor');
            Editor.startup(options, callback);
            return;
        }

        // 从配置内取出项目路径
        let project = null;
        if (options._.length > 0) {
            project = Path.resolve(options._[0]);
        } else if (options.path) {
            project = Path.resolve(options.path);
        }

        // 如果有传入 project 路径，则启动 editor
        if (project) {
            const Editor = require('./editor');
            Editor.startup(options, callback);
            return;
        }

        const Dashboard = require('./dashboard');
        // 如果没有传入 project，则启动 dashboard
        Dashboard.startup(options, callback);
    }
});
