"use strict";
const e = require("fire-path"),
    t = require("fire-url"),
    r = require("fire-fs");
if (Editor.isMainProcess) {
    const e = require("electron").protocol;
    e.registerFileProtocol("unpack", (e, r) => {
        let i = decodeURIComponent(e.url),
            o = s(t.parse(i));
        r(o ? {
            path: o
        } : -6)
    }, e => {
        if (e) return Editor.failed("Failed to register protocol unpack, %s", e.message), void 0;
        Editor.success("protocol unpack registerred")
    }), e.registerStringProtocol("disable-commonjs", (e, i) => {
        let o, s = t.parse(e.url);
        if (!s.slashes) return Editor.error('Please use "disable-commonjs://" + fspath.'), i(-6);
        let n = decodeURIComponent(s.hostname),
            a = decodeURIComponent(s.pathname);
        console.log(`Parsing disable-commonjs protocol, url: "${e.url}", hostname: "${n}", pathname: "${a}"`), (o = Editor.isWin32 ? n + ":" + a : a) ? r.readFile(o, "utf8", (e, t) => {
            if (e) return Editor.error(`Failed to read ${o}, ${e}`), i(-6);
            i({
                data: function (e) {
                    const t = "(function(){var require = undefined;var module = undefined; ";
                    let r = e.lastIndexOf("\n");
                    if (-1 !== r) {
                        let i = e.slice(r).trimLeft();
                        if (i || (r = e.lastIndexOf("\n", r - 1), i = e.slice(r).trimLeft()), i.startsWith("//")) return t + e.slice(0, r) + "\n})();\n" + i
                    }
                    return t + e + "\n})();\n"
                }(t),
                charset: "utf-8"
            })
        }) : i(-6)
    }, e => {
        if (e) return Editor.failed("Failed to register protocol disable-commonjs, %s", e.message), void 0;
        Editor.success("protocol disable-commonjs registerred")
    })
}
let i = {
        engine: {
            dev: "engine",
            release: "../engine"
        },
        "engine-dev": {
            dev: "engine/bin/.cache/dev",
            release: "../engine/bin/.cache/dev"
        },
        simulator: {
            dev: "simulator",
            release: "simulator"
        },
        static: {
            dev: "editor/static",
            release: "editor/static"
        },
        templates: {
            dev: "templates",
            release: "templates"
        },
        utils: {
            dev: "utils",
            release: "utils"
        },
        editor: {
            dev: "editor",
            release: "editor"
        },
        node_modules: {
            dev: "",
            release: ""
        }
    },
    o = e.relative(i.engine.release, i["engine-dev"].release);

function s(t) {
    let r = t.hostname,
        s = t.pathname || "",
        n = i[r];
    if (!n) return Editor.error("Unrecognized unpack host! Please validate your url."), null;
    let a = Editor.isMainProcess ? Editor.Profile : Editor.remote.Profile,
        l = a.load("local://settings.json");
    l && !1 === l.get("use-global-engine-setting") || (l = a.load("global://settings.json"));
    let d = Editor.isMainProcess ? Editor.App.path : Editor.appPath,
        c = Editor.dev ? n.dev : n.release;
    if (!c) return s.replace(/^[/\\]/, "");
    switch (r) {
        case "simulator":
            d = l.get("use-default-cpp-engine") ? Editor.builtinCocosRoot || Editor.remote.builtinCocosRoot || "" : l.get("cpp-engine-path") || "";
            break;
        case "engine-dev":
        case "engine":
            !l.get("use-default-js-engine") && l.get("js-engine-path") && (d = l.get("js-engine-path"), c = "engine-dev" === r ? o : "")
    }
    return e.join(d, c, s)
}
Editor.Protocol.register("unpack", s);