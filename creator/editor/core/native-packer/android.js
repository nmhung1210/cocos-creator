"use strict";const e=require("fire-path"),i=require("fire-fs"),r=require("xml2js"),t=require("./base");module.exports=class extends t{addDependence(r,t){let n=!0,s=e.join(this.options.dest,"frameworks/runtime-src/proj.android-studio/app/build.gradle");if(i.existsSync(s)){let e=i.readFileSync(s,"utf-8");e=e.replace(/dependencies\s*\{[^\}]+}/,e=>{if(-1!=e.indexOf(r))return e;let i=e.substr(0,e.length-1);return i+=`    implementation '${r}:${t}'\n}`}),i.writeFileSync(s,e)}else n=!1,Editor.error("cant find build.gradle at ",s);return n}addLib(i){this.ensureFile(i,e.join(this.options.dest,"frameworks/runtime-src/proj.android-studio/app/libs",e.basename(i)))}async addManifestApplicationConfig(t,n){let s=e.join(this.options.dest,"frameworks/runtime-src/proj.android-studio/app/AndroidManifest.xml"),a=await this.readXML(s),d=a.manifest.application[t];if(d){if(-1!=JSON.stringify(d).indexOf(n.$["android:name"]))return Promise.resolve();Array.isArray(d)?d.push(n):a.manifest.application[t]=[d,n]}else a.manifest.application[t]=n;let o=new r.Builder;i.writeFileSync(e.join(this.options.dest,"frameworks/runtime-src/proj.android-studio/app/AndroidManifest.xml"),o.buildObject(a))}async addStringToStringXML(i){return await this.addStringToXML(i,e.join(this.options.dest,"frameworks/runtime-src/proj.android-studio/res/values/strings.xml"))}async addStringToXML(e,t){let n=await this.readXML(t);do{let i=n.resources;if(!i)break;let r=i.string;if(!r)break;Array.isArray(r)||(r=[r],n.resources.string=r);let t=r.find(i=>i.$.name===e.$.name);t||r.push(e),t&&t._!==e._&&(t._=e._)}while(0);i.writeFileSync(t,(new r.Builder).buildObject(n))}readXML(e){return new Promise((t,n)=>{let s=i.readFileSync(e,"utf-8");if(!s)return n("File not found at path ",e),void 0;let a=new r.Parser;a.options.explicitArray=!1,a.parseString(s,(e,i)=>{t(i)})})}};