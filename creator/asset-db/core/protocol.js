"use strict";
const e = require("electron").protocol,
  r = require("fire-url"),
  t = require("fire-fs"),
  o = require("querystring");

function i(e) {
  let r = e.hostname;
  return Editor.assetdb.uuidToFspath(r)
}

function s(e) {
  return Editor.assetdb._fspath(e.href)
}
e.registerFileProtocol("uuid", (e, t) => {
  let o = decodeURIComponent(e.url);
  t({
    path: i(r.parse(o))
  })
}, e => {
  if (e) return Editor.failed(`Failed to register protocol uuid, ${e.message}`), void 0;
  Editor.success("protocol uuid registerred")
}), Editor.Protocol.register("uuid", i), e.registerFileProtocol("db", (e, r) => {
  r({
    path: s(decodeURIComponent(e.url))
  })
}, e => {
  if (e) return Editor.failed(`Failed to register protocol uuid, ${e.message}`), void 0;
  Editor.success("protocol db registerred")
}), Editor.Protocol.register("db", s), e.registerBufferProtocol("thumbnail", (e, s) => {
  let d = decodeURIComponent(e.url),
    u = r.parse(d),
    a = i(u);
  if (!t.existsSync(a)) return s(-6), void 0;
  let l, n = parseInt(u.query) || 32;
  l = "sharp";
  const c = require(l);
  var p = /\.jpg$/.test(a);
  p && c.cache(!1);
  let f = c(a),
    g = o.parse(u.query);
  if (g) {
    let e = function (e) {
      return e && void 0 !== e.x && void 0 !== e.y && void 0 !== e.w && void 0 !== e.h ? {
        left: parseInt(e.x),
        top: parseInt(e.y),
        width: parseInt(e.w),
        height: parseInt(e.h)
      } : null
    }(g);
    e && f.extract(e), g.rotate && f.rotate(parseInt(g.rotate))
  }
  f.resize({
    width: n,
    height: n,
    background: {
      r: 255,
      g: 255,
      b: 255,
      alpha: 0
    }
  }).toFormat(c.format.png).toBuffer((e, r) => {
    if (p && c.cache(!0), e) return s(-6), void 0;
    s({
      mimeType: "image/png",
      data: r
    })
  })
}, e => {
  if (e) return Editor.failed(`Failed to register protocol thumbnail, ${e.message}`), void 0;
  Editor.success("protocol thumbnail registerred")
});