var e=require("fire-fs"),t=require("fire-url"),r=require("fire-path"),i=require("async"),s=require("detective");let n=Editor.remote.importPath;module.exports={INTERNAL:"db://internal",isScript:e=>"javascript"===e||"typescript"===e,sortAssetTree(e,t){if(!e.children)return t();e.children.sort((e,t)=>e.name+e.type>t.name+t.type),i.each(e.children,this.sortAssetTree.bind(this),t)},queryDependScriptByUuid(e,t){let r=[];Editor.assetdb.queryAssets(null,null,(i,s)=>{this._queryDependScriptByUuid(e,r,s,()=>{t(null,Object.keys(r))})})},_queryDependScriptByUuid(t,u,d,l){if(u[t])return l();u[t]=!0;let a=t.slice(0,2)+r.sep+t+".js",p=r.join(n,a),o=e.readFileSync(p,"utf-8"),c=s(o);if(0===c.length)return l();i.each(c,(e,i)=>{let s,n=e.includes("/");if(n){let i=r.dirname(Editor.remote.assetdb.uuidToFspath(t)),n=r.resolve(i,e);s=r.join(r.dirname(n),r.basenameNoExt(n))}else s=e;let l=s,a="";for(let e=0;e<d.length;++e){let t=d[e];if(this.isScript(t.type)&&(n?(l=s+r.extname(t.path),a=t.path):a=r.basenameNoExt(t.path),l===a))return this._queryDependScriptByUuid(t.uuid,u,d,i),void 0}i()},l)},queryDependsOfRawAssetByUrl(e,r){let i=t.dirname(e),s=t.join(i,"*");Editor.assetdb.queryAssets(s,"texture",(e,t)=>r(null,t))}};