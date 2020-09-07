"use strict";var e=require("electron"),t=Editor.assetdb.remote,n=require("fire-path"),s=e.ipcRenderer;const a=require("async");var i=Editor.require("unpack://engine-dev/cocos2d/core/platform/callbacks-invoker");let r=Editor.remote.importPath.replace(/\\/g,"/");var u=cc.assetManager;u.cacheAsset=!1,u.force=!0,u.downloader.maxRetryCount=0,u.downloader.limited=!1,u.downloader.appendTimeStamp=!0;var o=u.editorExtend={};function c(e){u.releaseAsset(u.assets.get(e),!0)}s.on("asset-db:assets-moved",function(e,t){t.forEach(function(e){o.onAssetMoved(e.uuid,e.srcPath,e.destPath)})}),s.on("asset-db:asset-changed",function(e,t){o.onAssetChanged(t.uuid)}),s.on("asset-db:assets-deleted",function(e,t){t.forEach(function(e){o.onAssetRemoved(e.uuid,e.path)})});var d=o.assetListener=new i;o.onAssetMoved=function(e,t,s){var a=n.basenameNoExt(t),i=n.basenameNoExt(s);d.hasEventListener(e)&&o.queryAssetInfo(e,function(t,n,s){t||(c(e),cc.js.isChildClassOf(s,cc.Scene)||cc.assetManager.loadAny(e,function(t,n){d.emit(e,n)}))}),"undefined"!=typeof _Scene&&o.queryAssetInfo(e,function(t,n,s){t||cc.js.isChildClassOf(s,cc.Prefab)&&_Scene.walk(cc.director.getScene(),!1,t=>{var n=t._prefab;if(n){if(n.asset&&n.asset._uuid===e)t.name!==a||(t.name=i);return!0}})})},o.onAssetChanged=function(e){o.queryAssetInfo(e,function(t,n,s){t||d.hasEventListener(e)&&(c(e),cc.js.isChildClassOf(s,cc.Scene)||u.loadAny(e,function(t,n){d.emit(e,n)}))})},o.onAssetRemoved=function(e,t){c(e),console.log("delete cache of "+t),d.emit(e,null)},o.queryAssetInfo=function(e,t){Editor.Ipc.sendToMain("scene:query-asset-info-by-uuid",e,function(n,s){if(s){Editor.Utils.UuidCache.cache(s.url,e);var a=Editor.assets[s.type];a?t(null,s.url,a):t(new Error("Can not find asset type "+s.type))}else{var i=new Error('Can not get asset url by uuid "'+e+'", the asset may be deleted.');i.errorCode="db.NOTFOUND",t(i)}},-1)},o.parseUuid=function(e){var t="";if(e.startsWith(u.generalImportBase)){var n=cc.path.dirname(e),s=cc.path.basename(n);if(2===s.length){var a=(t=cc.path.basename(e)).indexOf(".");-1!==a&&(t=t.slice(0,a))}else t=s}return t};var f=new cc.AssetManager.Pipeline("parse existing asset and load",[function(e,t){var n=e.input,s=cc.AssetManager.RequestItem.create();s.isNative=!1,s.uuid=""+((new Date).getTime()+Math.random()),s.file=n,s.ext=".json",e.source=e.output=[s],t()},u._loadPipe]);function l(e,t){var n=e.type;return e.uuid&&"folder"!==n&&"javascript"!==n&&"typescript"!==n&&(!t||Editor.assets[n]===t)}o.loadJson=function(e,t,n){"function"==typeof t&&(n=t,t=null);var s=new cc.AssetManager.Task({input:e,options:t,onComplete:function(e){e?n&&n(e,null):(this.output._uuid="",n&&n(e,this.output))}});return f.async(s),s};var h=new cc.AssetManager.Bundle;h.init({name:cc.AssetManager.BuiltinBundleName.RESOURCES,nativeBase:r,importBase:r});var p=new cc.AssetManager.Bundle;function v(e,n,s){if(e){"/"===e[e.length-1]&&(e=e.slice(0,-1)),e="db://"+s+"/resources/"+e;var a=[],i=new RegExp(`^${e}..+`),r=t._path2uuid;for(var u in r){var o=t.assetInfoByPath(u);if(i.test(o.url)&&l(o,n)){if(!o.isSubAsset)return{uuid:o.uuid};a.push({uuid:o.uuid})}}return a[0]}}function g(e,n,s,a){if(e){"/"===e[e.length-1]&&(e=e.slice(0,-1)),e="db://"+s+"/resources/"+e;var i=t.assetInfo(e),r=a||[];if(i.uuid&&"folder"===i.type){var u=new RegExp(`^${e}/.+`),o=t._path2uuid;for(var c in o){var d=t.assetInfoByPath(c);u.test(d.url)&&l(d,n)&&r.push({compressUuid:d.uuid,uuid:d.uuid})}}return r}}p.init({name:cc.AssetManager.BuiltinBundleName.INTERNAL,nativeBase:r,importBase:r}),h._config.getInfoWithPath=function(e,t){return v(e,t,"assets")},p._config.getInfoWithPath=function(e,t){return v(e,t,"internal")},h._config.getDirWithPath=function(e,t,n){return g(e,t,"assets",n)},p._config.getDirWithPath=function(e,t,n){return g(e,t,"internal",n)};let m=u.builtins.init;u.builtins.init=function(e){m.call(u.builtins,()=>{a.eachSeries(["db://assets/**/*.effect","db://internal/effects/**/*.effect"],(e,t)=>{Editor.assetdb.queryAssets(e,null,async(e,n)=>{if(e)return t(e);a.eachSeries(n,(e,t)=>{cc.assetManager.loadAny(e.uuid,t)},e=>{t(e)})})},t=>{e(t)})})};