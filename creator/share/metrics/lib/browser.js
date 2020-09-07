"use strict";
const e = require("electron").ipcMain,
    {
        EventEmitter: t
    } = require("events"),
    o = require("../../request.js").sendRequest,
    c = require("md5"),
    r = require("getmac"),
    n = require("../lib/config").trackID,
    i = require("../../cocos-analytics");
let l = "",
    a = "";
let s = module.exports = new class extends t {
    constructor() {
        super(), this.trackID = n
    }
    trackEvent(e, t) {
        if (!l) return console.log("no valid user ID"), void 0;
        if (!a) return console.log("no valid client ID"), void 0;
        let c = {
            v: 1,
            tid: n,
            cid: a,
            uid: l,
            t: "event",
            ec: e.category,
            ea: e.action
        };
        e.label && (c.el = e.label), o({
            method: "POST",
            host: "www.google-analytics.com",
            path: "/collect",
            protocol: "https",
            data: c
        }, function (e, o) {
            e && console.log(e), t && t(e, o)
        }), i.trackEvent(e)
    }
    trackException(e, t) {
        if (!a) return console.log("no valid client ID"), void 0;
        o({
            method: "POST",
            host: "www.google-analytics.com",
            path: "/collect",
            protocol: "https",
            data: {
                v: 1,
                tid: n,
                cid: a,
                uid: l,
                t: "exception",
                exd: e,
                exf: 0
            }
        }, function (e, o) {
            e && console.log(e), t && t(e, o)
        }), i.trackException(e)
    }
    prepareUserIdentity() {
        let e = Editor.Profile.load("global://user_token.json");
        e.get("nickname"), e.get("email"), l = e.get("cocos_uid")
    }
    sendAppInfo(e) {
        if (!a) return console.log("no valid client ID"), void 0;
        let t = require("semver"),
            c = Editor.versions.CocosCreator,
            r = `${t.major(c)}.${t.minor(c)}.${t.patch(c)}`;
        o({
            method: "POST",
            host: "www.google-analytics.com",
            path: "/collect",
            protocol: "https",
            data: {
                v: 1,
                tid: n,
                cid: a,
                uid: l,
                t: "screenview",
                an: "CocosCreator",
                aid: "com.cocos.creator",
                av: r,
                cd: "Home"
            }
        }, function (t, o) {
            t && console.log(t), e && e(t, o)
        })
    }
    setClientId(e) {
        r.getMac(function (t, o) {
            let r = "";
            if (t) {
                console.log(t);
                let e = require("os").networkInterfaces(),
                    o = !1;
                for (var n in e) {
                    let t = e[n];
                    for (let e = 0; e < t.length; ++e) {
                        let n = t[e];
                        if (!n.internal && n.mac) {
                            r = c(n.mac), o = !0;
                            break
                        }
                    }
                    if (o) break
                }
                o || (r = c("00:00:00:00:00:00"))
            } else r = c(o);
            a = r, e()
        })
    }
};
e.on("metrics:track-event", (e, t) => {
    s.trackEvent(t, null)
}), e.on("metrics:track-exception", (e, t) => {
    s.trackException(t, null)
});