'use strict';

const { remote, ipcRenderer } = require('electron');
const Mousetrap = require('mousetrap');
const QRCode = require('../../../../page/qrcode');

const settingsProfile = Editor.Profile.load('global://settings.json');

/**
 * 重新编译引擎
 */
exports.compile = function () {
    return new Promise((resolve, reject) => {
        Editor.Ipc.sendToMain('app:rebuild-editor-engine', (error) => {
            error ? reject(error) : resolve();
        }, -1);
    });
};

/**
 * 初始化 pace
 */
exports.pace = function () {
    return new Promise((resolve) => {
        const $script = document.createElement('script');
        $script.src = 'app://node_modules/pace-js-amd-fix/pace.js';
        //因为pace默认重写了websocket，如果socket断开pace就会开始reload，所以屏蔽掉他websocket的重写
        //详见文档设置 https://github.hubspot.com/pace/
        $script.setAttribute('data-pace-options','{ "ajax": false }');
        document.head.appendChild($script);
        $script.addEventListener('load', () => {
            Pace.ignore(function () { });
            Pace.once('hide', function () {
                resolve();
            });
        });
    });
};

exports.initProfile = function () {
    try {
        // TODO 后续合并编辑器需要重新调整
        let uiColorPicker = window.localStorage.getItem('ui-color-picker');
        if (uiColorPicker) {
            uiColorPicker = JSON.parse(uiColorPicker);
            let editorProfile = Editor.Profile.load('global://settings.json');
            let tempColor = editorProfile.get('ui-color-picker');
            tempColor.colors = tempColor.colors.concat(uiColorPicker.colors);
            editorProfile.set('ui-color-picker', uiColorPicker);
            editorProfile.save();
            window.localStorage.removeItem('ui-color-picker');
        }
    }
    catch (e) {
        console.error(e);
    }
};

/**
 * 初始化 scene
 * todo 场景不应该初始化到全局
 */
exports.scene = function () {
    Editor.require('app://editor/page/index').init(true);
    Editor.require('app://editor/page/scene-utils');
};

/**
 * 初始化 dock
 */
exports.dock = function () {
    const $dock = document.createElement('ui-main-dock');
    $dock.setAttribute('class', 'main-dock');
    document.querySelector('section').appendChild($dock);
};

/**
 * 初始化 header
 */
exports.header = function () {

    function getUrl () {
        let url = Editor.T('EDITOR_MAIN.preview_offline');
        if (!Editor.isOffline) {
            const index = settingsProfile.get('local-ip') || 1;
            let ip = Editor.remote.Network.ip;
            if (index > 1) {
                // -2 的原因是存储 IP 的下标是从 2 开始的。
                ip = Editor.remote.Network.ipList[index - 2];
            }

            url = `${ip}:${Editor.remote.PreviewServer.previewPort}`;
        }
        return url;
    }

    let vm = new Vue({
        el: '#toolbar',
        data: {
            transform: 0,
            layout: 0,
            gizmo: 0,
            is2DEditMode: true,

            platform: settingsProfile.get('preview-platform') || 'browser',
            platforms: [
                {value: 'simulator', text: Editor.T('EDITOR_MAIN.preview.simulator')},
                {value: 'browser', text: Editor.T('EDITOR_MAIN.preview.browser')},
            ],

            url: getUrl(),
            connected: 0,
            qr: false,
            imHtml: '',
        },

        watch: {
            transform () {
                const types = ['position', 'rotation', 'scale', 'rect'];
                _Scene.setTransformTool(types[this.transform]);
            },
            layout () {
                const types = ['pivot', 'center'];
                _Scene.setPivot(types[this.layout]);
            },
            gizmo () {
                const types = ['local', 'global'];
                _Scene.setCoordinate(types[this.gizmo]);
            },
            platform () {
                if (settingsProfile.get('preview-platform') === this.platform) {
                    return;
                }
                settingsProfile.set('preview-platform', this.platform);
                settingsProfile.save();
            },
            url () {
                this.qrcode.makeCode("http://" + this.url);
            }
        },

        methods: {
            /**
             * 翻译
             */
            _t (key) {
                return Editor.T(key);
            },

            /**
             * 切换 transform tools
             */
            _onChangeTransform (event, num) {
                // todo 由于 Rect 工具还是使用 SVG 来画的，所以无法直接适配到 3D 视图模式下
                if (!this.is2DEditMode && 3 === num) {
                    return;
                }
                this.transform = num;
            },

            /**
             * 切换 layout 模式
             */
            _onChangeLayout (event, num) {
                this.layout = num;
            },

            /**
             * 切换 gizmo 工具
             */
            _onChangeGizmo (event, num) {
                this.gizmo = num;
            },

            /**
             * 切换场景 2D/3D 编辑模式
             */
            _onChangeEditMode () {
                this.is2DEditMode = !this.is2DEditMode;

                // todo 由于 Rect 工具还是使用 SVG 来画的，所以无法直接适配到 3D 视图模式下，如果在 transform 为 rect 状态下点击了 3d 模式，会切换为 position
                if (!this.is2DEditMode && 3 === this.transform) {
                    this.transform = 0;
                    return;
                }

                const CameraTool = Editor.require('packages://scene/panel/tools/camera');
                CameraTool.is2D = this.is2DEditMode;
            },

            /**
             * 打开预览
             */
            _onPreviewStart () {
                event.stopPropagation();
                Editor.Ipc.sendToWins('scene:play-on-device');
                Editor.Ipc.sendToMain('metrics:track-event', {
                    category: 'Project',
                    action: 'Preview Game',
                    label: this.platform
                });
            },

            /**
             * 预览刷新
             */
            _onPreviewRefresh () {
                // 禁用刷新模拟器
                if (this.platform === 'simulator') {
                    return;
                }
                event.stopPropagation();
                Editor.Ipc.sendToWins('scene:reload-on-device');
                Editor.Ipc.sendToMain('metrics:track-event', {
                    category: 'Project',
                    action: 'Preview Game',
                    label: this.platform
                });
            },

            /**
             * 数据更改后的回流
             */
            _onValueChange (event, key) {
                event.stopPropagation();
                this[key] = event.target.value;
            },

            /**
             * 打开项目目录
             */
            _onOpenProject () {
                Editor.Ipc.sendToMain('app:explore-project');
            },

            /**
             * 打开 App 目录
             */
            _onOpenApp () {
                Editor.Ipc.sendToMain('app:explore-app');
            },

            /**
             * 显示 / 隐藏 QR
             */
            _onSwitchQR (event, bool) {
                this.qr = !!bool;
            },
            
        },

        ready () {
            this.qrcode = new QRCode(this.$els.qrcode, {
                width: 150,
                height: 150
            });
            this.qrcode.makeCode("http://" + this.url);
        }
    });

    ipcRenderer.on('compiler:state-changed', (event, state) => {
        if (state === 'compiling' || state === 'failed') {
            vm.disabled = true;
        } else {
            vm.disabled = false;
        }
    });

    ipcRenderer.on('preview-server:preview-port-changed', () => {
        vm.url = getUrl();
    });

    ipcRenderer.on( 'preview-server:connects-changed', (event, count) => {
        vm.connected = count;
    });

    //im 接收 html 的接口
    ipcRenderer.on('im-plugin:update-im-html', (event, html) => {
        vm.imHtml = html
    });

    // 绑定一些快捷键
    let mousetrap = new Mousetrap();
    mousetrap.bind('w', (event) => {
        let target = event.path[0];
        if (target && target.tagName === 'INPUT' || _Scene.isGizmoToolLocked()) {
            return;
        }
        vm.transform = 0;
    });
    mousetrap.bind('e', (event) => {
        let target = event.path[0];
        if (target && target.tagName === 'INPUT' || _Scene.isGizmoToolLocked()) {
            return;
        }
        vm.transform = 1;
    });
    mousetrap.bind('r', (event) => {
        let target = event.path[0];
        if (target && target.tagName === 'INPUT' || _Scene.isGizmoToolLocked()) {
            return;
        }
        vm.transform = 2;
    });
    mousetrap.bind('t', (event) => {
        let target = event.path[0];
        if (target && target.tagName === 'INPUT' || _Scene.isGizmoToolLocked()) {
            return;
        }
        vm.transform = 3;
    });
};

/**
 * 初始化底部状态栏
 */
exports.footer = function () {
    return new Promise((resolve) => {
        let vm = new Vue({
            el: '#status',
            data: {
                version: `Cocos Creator v${remote.app.getVersion()}`,
                log: null,

                state: {
                    db: 'idle', // idle | busy
                    watch: 'off', // on | off | starting | stopping
                    compile: 'idle', // idle | failed | compiling
                },
            },
            methods: {
                /**
                 * 跳转到 console
                 */
                _onDumpConsole() {
                    event.stopPropagation();
                    Editor.Panel.open('console');
                },
            },
        });

        ipcRenderer.on('asset-db:state-changed', (event, state) => {
            vm.state.db = state;
        });

        ipcRenderer.on('asset-db:watch-state-changed', (event, state) => {
            vm.state.watch = state;
        });

        ipcRenderer.on('compiler:state-changed', (event, state) => {
            vm.state.compile = state;
        });

        ipcRenderer.on('editor:console-failed', (event, message) => {
            vm.log = {
                type: 'failed',
                text: message,
            };
        });

        ipcRenderer.on('editor:console-warn', (event, message) => {
            vm.log = {
                type: 'warn',
                text: message,
            };
        });

        ipcRenderer.on('editor:console-error', (event, message) => {
            vm.log = {
                type: 'error',
                text: message,
            };
        });

        ipcRenderer.on('editor:console-clear', () => {
            vm.log = null;
        });

        resolve();
    });
};

/**
 * 注册一些全局事件
 */
exports.golbal = async function () {

    window.addEventListener('paste', event => {
        // the element can handle the copy event
        if (event.target !== document.body) {
            return;
        }

        // get current focused panel
    });

    const ProjectScripts = require(Editor.url('app://editor/page/project-scripts'));

    window.onerror = function (message, filename, lineno, colno, err) {
        if (Editor) {
            if (Editor.error) {
                Editor.error(err);
                // 检测当插件脚本中出现报错信息时，需要存储报错信息与 uuid，等编译成功后在进行清除
                // fix https://github.com/cocos-creator/2d-tasks/issues/1929
                let uuid = ProjectScripts.getPluginScriptUuidByPath(filename);
                if (uuid) {
                    Editor.remote.ProjectCompiler.singleScriptCompileFailed({
                        uuid: uuid,
                        error: err.stack,
                    });
                }
            } else if (Editor.Ipc.sendToMain) {
                Editor.Ipc.sendToMain('editor:renderer-console-error', err.stack || err);
                Editor.Ipc.sendToMain('metrics:track-exception', (err.stack || err));
            }
        } else {
            console.error(err.stack || err);
        }
        // Just let default handler run.
        return false;
    };

    // 检查是否登录
    const $login = document.getElementById('login');
    if (!Editor.User.enable()) {
        $login.hidden = true;
        return;
    }


    $login.loading = true;
    let bool = await Editor.User.isLoggedIn();
    $login.hidden = bool;
    $login.loading = false;

    Editor.User.on('waiting', () => {
        $login.hidden = false;
        $login.loading = true;
    });

    Editor.User.on('login', () => {
        $login.hidden = true;
        $login.loading = false;
    });

    Editor.User.on('logout', () => {
        $login.hidden = false;
        $login.loading = false;
    });

    Editor.User.on('exception', (data) => {
        if (!data || typeof data !== 'object' || data.source !== 'login') {
            return;
        }

        Editor.warn(data.msg);

        // 如果不是下列几个错误代码，则跳过登陆流程，直接隐藏登陆窗口
        if (
            data.code === 301 ||
            data.code === 302 ||
            data.code === 420 ||
            data.code === 421
        ) {
            return;
        }

        $login.hidden = true;
        $login.loading = false;
    });   
}
