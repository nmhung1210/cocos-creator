"use strict";const e=require("fire-url"),{promisify:t}=require("util"),r=require("./cache"),o=require("./event");exports.loadAssets=function(){o.emit("start-loading"),Editor.assetdb.deepQuery((e,t)=>{try{if(console.time("assets-tree._build()"),e)return console.error("load assets error ",e),void 0;let o=r.genAssetsTree(t);this.fold(o.children[0].id,!1),console.timeEnd("assets-tree._build()")}catch(e){Editor.warn(e.message)}o.emit("finish-loading"),o.emit("assets-tree-ready")})},exports.show=function(e,t){let o=r.queryNode(e);return!!o&&(o.show=t,this.updateShowNodes(),!0)},exports.select=function(e,t){let o=r.queryNode(e);o&&(o.selected=t)},exports.rename=function(e){let t=r.queryCache();for(let r in t){let o=t[r];o.rename=o.id===e&&!o.readonly&&!o.isMount}},exports.fold=function(e,t){let o=r.queryCache()[e];if(!o)return console.log("can't find node ",e),!1;o.fold=t,o.children&&o.children.forEach(e=>{(function e(r){r.show=!t,t?r.children.forEach(t=>{e(t)}):t===r.fold&&r.children.forEach(t=>{e(t)})})(e)}),this.updateShowNodes()},exports.recFoldNodes=function(e,t){let o=r.queryNode(e);if(!o)return!1;o.children&&o.children.forEach(e=>{this.fold(e.id,t),this.recFoldNodes(e.id,t)})},exports.recParentNodes=function(e,t){let o=r.queryNode(e);if(!o)return;let n=e=>{let o=r.queryNode(e.parent);o&&(o!==r.queryRoot()&&this.fold(o.id,t),o.parent&&n(o))};n(o)},exports.updateShowNodes=function(){let e=r.queryRoot(),t=[],o=function(e){e.show&&e.children&&e.children.forEach(e=>{e.show&&(t.push(e),o(e))})};o(e),r.updateShowNodes(t)},exports.getRealUrl=function(t,o){let n=r.queryCache(),i=(r.queryRoot(),n[t]);if(!i)return null;let s=(o||i.name)+i.extname,d=n[i.parent];for(;d;)s=e.join(d.name+d.extname,s),d=n[d.parent];return s="db://"+s},exports.getPath=function(t){let o=r.queryCache(),n=o[t];if(!n)return null;let i="",s=o[n.parent];for(;s;)i=e.join(s.name+s.extname,i),s=o[s.parent];return i="db://"+i},exports.getUniqueUrl=async function(r,o){const n=Editor.remote.assetdb;let i=[];for(let e=0;e<o.length;++e){let r=o[e];i=i.concat(await t(n.queryAssets.bind(n))(null,r))}if(0===i.length)return r;let s=i.map(t=>e.basenameNoExt(t.url)),d=0,l="",u=e.basenameNoExt(r),a=e.basenameNoExt(r);for(;s.includes(a);)d+=1,a=u+" - "+(l=n.padLeft(d,3,"0"));if(0===d)return r;let c=e.dirname(r);return e.join(c,a)+e.extname(r)},exports.move=function(e,t,o){let n=r.queryNode(e);n.name=o||n.name;let i=r.queryNode(t);if(!i)return;let s=r.queryNode(n.parent),d=s.children.indexOf(n);d>-1&&s.children.splice(d,1),i.children.push(n),n.parent=t,n.level=i.level+1,n.children.forEach(e=>{e.level=n.level+1}),i.children.sort(r.sortChildrenNodes),this.fold(i.id,!1)},exports.updateUuid=function(e,t){let o=r.queryNode(e),n=r.queryCache();o.id=t,delete n[e],n[t]=o},exports.updateIcon=function(e){let t=r.queryNode(e);if(!t)return;t.iconUrl=null;let o=r.queryNode(t.parent);o&&(o.iconUrl=null)},exports.hint=function(e){let t=r.queryNode(e);if(!t||t.hint)return!1;t.hint=!0,setTimeout(()=>{t.hint=!1},800)},exports.remove=function(e){r.remove(e)&&this.updateShowNodes()},exports.add=function(e){r.add(e),this.updateShowNodes()},exports.autoSort=function(){r.sortAssetsTree(),this.updateShowNodes()};let n=[];exports.staging=function(e){let t=r.queryNodes();n.length=0,t.forEach(t=>{t.selected&&n.push(t.id),t.selected=-1!==e.indexOf(t.id)})},exports.restore=function(){let e=[];return r.queryNodes().forEach(t=>{t.selected&&e.push(t.id),t.selected=-1!==n.indexOf(t.id)}),n=[],e};