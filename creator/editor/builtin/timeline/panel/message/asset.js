"use strict";const e=require("../libs/manager"),{promisify:i}=require("util"),t=require("../libs/advice");function s(i,t){for(let i=0;i<t.length;++i){let s=t[i];if("animation-clip"===s.type&&e.isExists(s.uuid)){this.vm.updateClips();break}}}module.exports={async"asset-changed"(s,a){if("animation-clip"!==a.type||!e.isExists(a.uuid))return;let n=i(cc.assetManager.loadAny.bind(cc.assetManager)),l=await n(a.uuid);if(e.equal(a.uuid,l))return;let r=e.Clip.queryInfo(a.uuid);if(0===Editor.Dialog.messageBox({type:"question",buttons:[Editor.T("timeline.message.ignore"),Editor.T("timeline.message.read_hard_disk")],title:"",message:`Clip - ${r.name}`,detail:Editor.T("timeline.message.external_changes"),defaultId:0,cancelId:0,noLink:!0}))return e.sync(a.uuid),void 0;let u=this.vm.clips.map(e=>e.id),d=[];for(let e=0;e<u.length;e++){let i=u[e],t=await n(i);d.push(t)}t.emit("change-clips",d)},"assets-deleted":s,"assets-moved":s};