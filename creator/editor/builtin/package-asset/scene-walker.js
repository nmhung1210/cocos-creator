const e=require("fire-fs"),r=require("fire-url"),i=require("fire-path"),t=require("async"),s=require("./parse/depend");let d=cc.js._getClassById,u=Editor.remote.importPath,n=new cc.deserialize.Details;module.exports={_queryDependAsset(l,o,a){let p=Editor.remote.assetdb.uuidToUrl(l);if(!p||-1!==p.indexOf(s.INTERNAL))return a();let c=o[l];if(c)return a();if(Editor.remote.assetdb.isSubAssetByUuid(l)){let e=r.dirname(p);if(l=Editor.remote.assetdb.urlToUuid(e),c=o[l])return a()}o[l]=!0,Editor.assetdb.queryMetaInfoByUuid(l,(r,p)=>{if(r)return Editor.error(r),void 0;if(!Editor.assets[p.assetType])return a();let y=JSON.parse(p.json);if(y&&y.rawTextureUuid&&(o[y.rawTextureUuid]=!0),s.isScript(p.assetType))return s.queryDependScriptByUuid(l,(e,r)=>{if(e)return Editor.error(e),void 0;t.each(r,(e,r)=>{(c=o[e])||(o[e]=!0),r()},a)}),void 0;let f=l.slice(0,2)+i.sep+l+".json",U=i.join(u,f),q=e.readFileSync(U);n.reset(),cc.deserialize(q,n,{classFinder:function(e){if(Editor.Utils.UuidUtils.isUuid(e)){let r=Editor.Utils.UuidUtils.decompressUuid(e);n.uuidList.includes(r)||n.uuidList.push(r)}let r=d(e);return r||null}}),0===n.uuidList.length?a():t.each(n.uuidList,(e,r)=>{this._queryDependAsset(e,o,r)},a)})},queryDependAsset(e,r){let i=[];this._queryDependAsset(e,i,()=>{r(null,Object.keys(i))})},"query-depend-asset"(e,r){this.queryDependAsset(r,(r,i)=>{if(r)return Editor.error(r),void 0;e.reply&&e.reply(null,i)})}};