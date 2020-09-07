"use strict";
const e = require("fire-path"),
    r = require("fire-fs"),
    o = require("lodash"),
    n = require("semver"),
    {
        shell: i
    } = require("electron"),
    t = require("node-uuid"),
    s = Editor.Profile.load("global://settings.json");
let c = {};
module.exports = c, c.create = function (o, n, i) {
    let s = Editor.dev ? Editor.url("app://") : e.join(Editor.url("app://"), "..", "..");
    if (Editor.log("install path: " + s), e.contains(s, o)) return i && i(new Error(Editor.T("DASHBOARD.error_project_in_install"))), void 0;
    if (r.existsSync(o)) return i && i(new Error("The path " + o + " already exists.")), void 0;

    function c(n) {
        let i;
        try {
            let n = Editor.url("unpack://utils"),
                t = e.join(o, "jsconfig.json"),
                s = e.join(o, "tsconfig.json"),
                c = e.join(o, ".gitignore");
            r.copySync(e.join(n, "api/creator.d.ts"), e.join(o, "creator.d.ts")), r.existsSync(t) || r.copySync(e.join(n, "vscode-extension/jsconfig.json"), t), r.existsSync(s) || r.copySync(e.join(n, "vscode-extension/tsconfig.json"), s), r.existsSync(c) || r.copySync(Editor.url("unpack://static/git-workflow/gitignore"), c)
        } catch (e) {
            i = e
        }
        n(i)
    }
    let a = e.join(o, "project.json");
    if (n) process.env.checkedVersion = !0, r.copy(n, o, e => {
        e && console.log(e);
        try {
            let e = r.readFileSync(a, "utf8");
            (e = JSON.parse(e)).id = t.v4(), e.isNew = !0, r.writeFileSync(a, JSON.stringify(e, null, 2))
        } catch (e) {
            console.error(e)
        }
        c(i)
    });
    else {
        r.mkdirsSync(o), r.mkdirSync(e.join(o, "settings")), r.mkdirSync(e.join(o, "local")), r.mkdirSync(e.join(o, "packages")), r.mkdirSync(e.join(o, "assets")), r.mkdirSync(e.join(o, "library"));
        let n = {
            engine: "cocos-creator-js",
            packages: "packages",
            version: Editor.versions.CocosCreator,
            id: t.v4(),
            isNew: !0
        };
        r.writeFileSync(a, JSON.stringify(n, null, 2)), c(i)
    }
}, c.add = async function (e) {
    await s.reset();
    let r = s.get("recently-opened"),
        o = r.indexOf(e); - 1 !== o && r.splice(o, 1), r.unshift(e), s.set("recently-opened", r), s.save()
}, c.delete = function (e) {
    c.remove(e), i.moveItemToTrash(e)
}, c.remove = async function (e) {
    await s.reset();
    let r = s.get("recently-opened");
    o.remove(r, function (r) {
        return r === e
    }), s.set("recently-opened", r), s.save()
}, c.check = function (o, i) {
    if (!1 === r.existsSync(o)) return i && i(new Error("Project not exists!")), void 0;
    let t = Editor.dev ? Editor.url("app://") : e.join(Editor.url("app://"), "..", "..");
    // if (e.contains(t, o)) return i && i(new Error(Editor.T("DASHBOARD.error_project_in_install_open"))), void 0;
    c.getInfo(o, function (t) {
        if (!t) return i && i(new Error("Can not find project.json")), void 0;
        if (t.error) return i && i(new Error(t.error)), void 0;
        let s = t.project;
        if (s && (!process.env.checkedVersion || "false" === process.env.checkedVersion) && !Editor.argv.force) {
            let e = s.version,
                r = !e,
                c = r || n.satisfies(e, "<" + Editor.versions.CocosCreator, {
                    includePrerelease: !0
                }),
                a = e && n.satisfies(e, ">" + Editor.versions.CocosCreator, {
                    includePrerelease: !0
                });
            if (c || a) {
                let n = "MESSAGE.check_project_version.degrade";
                if (c && (n = r ? "MESSAGE.check_project_version.upgrade_before_v2_1_2" : "MESSAGE.check_project_version.upgrade"), 1 === Editor.Dialog.messageBox({
                        type: "question",
                        buttons: [Editor.T("MESSAGE.confirm"), Editor.T("SHARED.exit")],
                        message: Editor.T(n, {
                            projectVer: e,
                            editorVer: Editor.versions.CocosCreator,
                            projectPath: o
                        }),
                        defaultId: 1,
                        cancelId: 1,
                        noLink: !0
                    })) return t.abort = !0, i && i(null, t), void 0
            }
        }
        process.env.checkedVersion = !0;
        let c = e.join(o, "settings");
        r.existsSync(c) || r.mkdirSync(c), c = e.join(o, "local"), r.existsSync(c) || r.mkdirSync(c), c = e.join(o, "packages"), r.existsSync(c) || r.mkdirSync(c), c = e.join(o, "assets"), r.existsSync(c) || r.mkdirSync(c), c = e.join(o, "library"), r.existsSync(c) || r.mkdirSync(c), i && i(null, t)
    })
}, c.getInfo = function (o, n) {
    let i, t = e.join(o, "project.json");
    if (!1 === r.existsSync(t)) return n && n(), void 0;
    try {
        i = JSON.parse(r.readFileSync(t, "utf8"))
    } catch (r) {
        return n && n({
            path: o,
            name: e.basename(o),
            engine: "unknown",
            project: i,
            error: "project.json broken: " + r.message,
            abort: !1
        }), void 0
    }
    n && n({
        id: i.id || "",
        path: o,
        name: e.basename(o),
        project: i,
        abort: !1
    })
};