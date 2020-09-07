"use strict";const fse=require("fs-extra"),utils=require("../utils");let file2data={};const load=function(e,t){if(file2data[e]&&!t)return file2data[e];let a;if(fse.existsSync(e))try{a=fse.readJSONSync(e)}catch(e){console.warn(e),a=Object.create(null)}else a=Object.create(null);return file2data[e]=a,a},save=function(e){const t=file2data[e];t&&fse.outputJSONSync(e,t,{spaces:2})},set=function(e,t,a){const s=file2data[e];if(!s)return;if(!t){if(a)for(let e in a)s[e]=a[e];return}let r=t.split(".");utils.setData(s,a,r)},remove=function(e,t){const a=file2data[e];if(!a)return;const s=t.split(".");utils.removeData(a,s)},empty=function(e){file2data[e]={}},clear=function(){file2data={}},get=function(){return file2data};exports.get=get,exports.load=load,exports.save=save,exports.set=set,exports.remove=remove,exports.empty=empty,exports.clear=clear;