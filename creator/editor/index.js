"use strict";
const {
    promisify: i
} = require("util"), t = require("path"), e = require("electron"), o = require("fire-fs"), r = require("semver"), n = e.ipcMain;

function a(i, t) {
    if (!Editor.dev) try {
        let r = o.readJsonSync(i),
            n = r.windows && r.windows.main.layout || r;

        function e(i, t) {
            let o = i.children;
            if ("panel" !== i.type) {
                for (let r = 0, n = o.length; r < n; r++)
                    if (i = e(o[r], t)) return i;
                return null
            }
            return o.includes(t) ? i : null
        }
        let a = e(n, "cloud-function");
        if (t && a || !t && !a) return;
        let s = r.windows && r.windows.main.panels;
        if (t) {
            let i = e(n, "assets");
            i && i.children.push("cloud-function"), s && s.push("cloud-function")
        } else a.children.splice(a.children.indexOf("cloud-function"), 1), s && s.splice(s.indexOf("cloud-function"), 1);
        o.writeFileSync(i, JSON.stringify(r, null, 2))
    } catch (i) {}
}

function s(i) {
    try {
        let e = (i || o.readJsonSync(t.join(Editor.Project.path, "project.json"))).version;
        return !e || r.satisfies(e, "< " + Editor.versions.CocosCreator, {
            includePrerelease: !0
        })
    } catch (i) {
        return console.error(i)
    }
}
process.on("unhandledRejection", i => {
    console.error(i)
}), exports.startup = async function (r, u) {
    require("./init"), global.Editor = require("./lib/editor"), await Editor.Network.update(), Editor.Network.isOnline && !Editor.argv.nologin || Editor.User.enable(!1);
    let E = !1;
    if (!Editor.argv._command) try {
        let i = await Editor.Project.check();
        if (i && i.abort) return e.app.quit(), void 0;
        E = i.isNew, await Editor.Project.init()
    } catch (i) {
        return u(i), void 0
    }
    Editor._buildCommand || Editor._compileCommand || Editor.PreviewServer.start(i => {
        Editor.stashedScene ? i() : (n.once("app:preview-server-scene-stashed", i), Editor.Ipc.sendToWins("scene:preview-server-scene-stashed"))
    }), await c(), await async function () {
        try {
            const i = t.join(Editor.Project.path, "local");
            let e = t.join(i, "layout.windows.json"),
                r = t.join(i, "layout.editor.json");
            o.renameSync(e, r)
        } catch (i) {}
        const i = [t.join(Editor.Project.path, "local", "layout.editor.json"), Editor.url("unpack://static/layout/classical.json"), Editor.url("unpack://static/layout/landscape.json"), Editor.url("unpack://static/layout/portrait.json")];
        let e;
        try {
            e = o.readJsonSync(t.join(Editor.Project.path, "project.json"))
        } catch (i) {}
        await new Promise(i => {
            setTimeout(i, 10)
        });
        try {
            const t = Editor.Profile.load("project://project.json");
            let o = t.get("migrate-history");
            const r = Editor.Profile.load("global://features.json").get("cloud-function");
            r && !o.includes("cloud-function") && (e && e.isNew || s()) ? (i.forEach(i => {
                a(i, !0)
            }), o.push("cloud-function"), t.set("migrate-history", o), t.save()) : r || i.forEach(i => {
                a(i, !1)
            })
        } catch (i) {
            console.log(i)
        }
    }(), "string" != typeof Editor._buildCommand && "string" != typeof Editor._compileCommand && await i(d)();
    try {
        await Editor.Engine.build()
    } catch (i) {
        await Editor.Engine.revertEngineDialog(i), await Editor.Engine.build()
    }
    try {
        await Editor.Engine.init(), await Editor.Engine.initExtends()
    } catch (i) {
        return await Editor.Engine.revertEngineDialog(i, Editor.T("EDITOR_MAIN.init_engine_extends_failed"), Editor.T("EDITOR_MAIN.init_engine_extends_failed_detail")), u(i)
    }(function () {
        const i = Editor.url(`unpack://engine/editor/i18n/${Editor.lang}/localization`);
        try {
            const t = require("lodash/merge");
            let e = require(`../share/i18n/${Editor.lang}/localization`);
            t(e, require(i)), Editor.i18n.extend(e)
        } catch (t) {
            Editor.error("Failed to merge module " + i), Editor.error(t)
        }
    })(),
    function () {
        try {
            const i = Editor.Profile.load("global://settings.json");
            if (!i.get("simulator-customsize-resolution")) {
                const t = require("../share/engine-utils"),
                    e = i.get("use-default-cpp-engine"),
                    o = t.getSimulatorConfigAt(!e && i.get("cpp-engine-path")).init_cfg;
                i.set("simulator-customsize-resolution", {
                    width: o.width,
                    height: o.height
                }), i.save()
            }
        } catch (i) {
            console.error(i)
        }
    }(),
    function () {
        try {
            let i = t.join(Editor.Project.path, "project.json"),
                e = o.readJsonSync(i);
            if (s(e) && (console.log("migrating project from " + (e.version || "< 2.1.2")), Editor.Ipc.sendToMain("migrate-project", e.version)), e.version = Editor.versions.CocosCreator, !e.id) {
                const i = require("node-uuid");
                e.id = i.v4()
            }
            e.isNew = !1, o.writeFileSync(i, JSON.stringify(e, null, 2))
        } catch (i) {
            console.error(i)
        }
    }();
    try {
        await l()
    } catch (i) {
        return await Editor.Engine.revertEngineDialog(i, Editor.T("EDITOR_MAIN.register_builtin_assets_failed"), Editor.T("EDITOR_MAIN.register_builtin_assets_failed_detail")), u(i)
    }
    try {
        Editor.AssetDB.loading = !0, await Editor.AssetDB.mountInternal(), await Editor.AssetDB.mountExternal(), await Editor.AssetDB.mountMain(), await Editor.AssetDB.init(), Editor.AssetDB.loading = !1
    } catch (i) {
        return Editor.AssetDB.loading = !1, u(i)
    }
    let p = require("../share/engine-utils");
    Editor.builtinCocosRoot = p.getEnginePath();
    try {
        await Editor.Engine.initSceneList()
    } catch (i) {
        return u(i)
    }
    const g = require("./share/build-jsb-adapter");
    return await g.prebuild({
        rootPath: Editor.url("packages://jsb-adapter"),
        dstPath: Editor.url("packages://jsb-adapter/bin")
    }), await Editor.ProjectCompiler.init(), "string" == typeof Editor._buildCommand ? (await new Promise((i, t) => {
        Editor.Builder.buildCommand(Editor._buildCommand, o => {
            if (o) return Editor.error(o), e.app.exit(1), t(o), void 0;
            e.app.quit(), i()
        })
    }), void 0) : "string" == typeof Editor._compileCommand ? (await new Promise((i, t) => {
        Editor.Builder.compileCommand(Editor._compileCommand, o => {
            if (o) return Editor.error(o), e.app.exit(1), t(o), void 0;
            e.app.quit(), i()
        })
    }), void 0) : (u(), void 0)
};
let d = function (i) {
        Editor.Window.initWindowStates("local://layout.editor.json", "default://layout.editor.json"), Editor.run("app://editor/index.html", {
            title: "Cocos Creator",
            width: 1280,
            height: 720,
            minWidth: 100,
            minHeight: 100,
            show: !1,
            resizable: !0
        });
        var t = Editor.Window.main;
        t.nativeWin.on("close", function () {
            t.closing = !0
        }), n.on("app:is-main-window-attemp-to-close", i => {
            i.returnValue = !!t.closing, t.closing = !1
        }), t.nativeWin.webContents.once("did-finish-load", function () {
            i && i()
        })
    },
    c = async function () {
        Editor.argv._command || await i(Editor.loadAllPackages)()
    }, l = function () {
        Editor.argv._command || (require("./share/register-builtin-assets"), require("./core/init-builtin-assets"))
    };