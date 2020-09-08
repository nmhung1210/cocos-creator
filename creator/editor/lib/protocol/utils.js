"use strict";
const e = require("path"),
  t = {
    engine: {
      dev: "engine",
      release: "../engine"
    },
    "engine-dev": {
      dev: "engine/bin/.cache/dev",
      release: "../engine/dev"
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
  };
let i = e.relative(t.engine.release, t["engine-dev"].release);
exports.unpackUrl2path = function (n) {
  let a = n.hostname,
    s = n.pathname || "",
    r = t[a];
  if (!r) return Editor.error(`Unrecognized unpack host '${a}'! Please validate your url.`), null;
  let o = Editor.isMainProcess ? Editor.Profile : Editor.remote.Profile,
    l = o.load("local://settings.json");
  l ? !1 !== l.get("use-global-engine-setting") && (l = o.load("global://settings.json")) : l = o.load("global://settings.json");
  let d = Editor.isMainProcess ? Editor.App.path : Editor.appPath,
    g = Editor.dev ? r.dev : r.release;
  if (!g) return s.replace(/^[/\\]/, "");
  switch (a) {
    case "simulator":
      d = l.get("use-default-cpp-engine") ? Editor.builtinCocosRoot || Editor.remote.builtinCocosRoot || "" : l.get("cpp-engine-path") || "";
      break;
    case "engine-dev":
    case "engine":
      !l.get("use-default-js-engine") && l.get("js-engine-path") && (d = l.get("js-engine-path"), g = "engine-dev" === a ? i : "")
  }
  return e.join(d, g, s)
}, exports.unpackMapping = t;