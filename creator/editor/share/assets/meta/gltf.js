"use strict";const e=require("fire-fs"),t=require("fire-path"),a=require("./mesh"),s=require("./prefab"),i=require("./skeleton-animation-clip"),r=require("./skeleton"),n=(require("./buffer"),require("./material")),{promisify:o}=require("util"),l=Editor.require("app://editor/core/common-asset-worker"),f=e.readJsonSync(Editor.url("unpack://static/default-assets/prefab/sprite.prefab"));function u(e,t){let a=e,s=0;for(;t[a];)a=`${e}_${++s}`;return t[a]=!0,a}module.exports=class extends Editor.metas.asset{constructor(e){super(e),this.scaleFactor=1,this.boneCount=0,this.precomputeJointMatrix=!1,this.animationFrameRate=30,this._gltf={},this._bufferUuids=[],this._buffers=[],this._modelName=""}static version(){return"1.1.0"}static defaultType(){return"gltf"}deserialize(e){super.deserialize(e);let a={};for(let s in e.subMetas){let i=e.subMetas[s],r=t.extname(s),n=this._assetdb._extname2infos[r];if(!n)continue;let o=n[0].ctor;if(!o){Editor.warn(`Can not find meta class for submeta ${s}`);continue}let l=new o(this._assetdb);l.deserialize(i),a[s]=l}this.updateSubMetas(a)}async _createMeshMeta(e,t,s){let i=Object.create(null),r=this._meshIDs=[],n=[];for(let e in t)t[e]instanceof a&&n.push(t[e]);let o=e.meshes||[];for(let l=0;l<o.length;l++){let f,h=u(o[l].name,i)+".mesh";t[h]&&(f=t[h]),f=n[l]?n[l]:new a(this._assetdb),r[l]=f.uuid,await f.importGltf(e,this._buffers,l),s[h]=f}}async _createSkeletonMeta(e,t,a){let s=this._skeletonIDs=[],i=[];for(let e in t)t[e]instanceof r&&i.push(t[e]);let n=e.skins||[];for(let o=0;o<n.length;o++){let n,l=`${this._modelName}-${o}.skeleton`;n=t[l]?t[l]:i[o]?i[o]:new r(this._assetdb),s[o]=n.uuid,await n.importGltf(e,this.uuid,o),a[l]=n}}async _createSkeletonAnimationMeta(e,t,a){let s=[];for(let e in t)t[e]instanceof i&&s.push(t[e]);let r=e.animations||[];for(let e=0;e<r.length;e++){let n,o=r[e].name;-1!==this._modelName.indexOf("@")&&(o=this._modelName.split("@")[1],0!==e&&(o+="_"+e));let l=o+".sac";(n=t[l]?t[l]:s[e]?s[e]:new i(this._assetdb)).name=o,n.modelUuid=this.uuid,n.animationID=e,n.animationFrameRate=this.animationFrameRate,await n.importGltf(this._gltf,this._buffers),a[l]=n}}_createPrefabMeta(e,t,a){let i=this._modelName+".prefab";t[i]?a[i]=t[i]:a[i]=new s(this._assetdb),a[i].content=f,a[i].readonly=!0}_createMaterialMeta(e,t,a){let s=this._materiaIDs=[],i=this._materialMetas=[],r=Object.create(null),o=[];for(let e in t)t[e]instanceof n&&o.push(t[e]);let l=e.materials||[];for(let e=0;e<l.length;e++){let f,h=u(l[e].name,r)+".mtl";f=t[h]?t[h]:o[e]?o[e]:new n(this._assetdb),s[e]=f.uuid,i[e]=f,a[h]=f}}_createBufferMeta(){}async _createSubMetas(){let e=this.getSubMetas(),t={},a=this._gltf;await this._createBufferMeta(a,e,t),await this._updateGltfNode(),await this._createMeshMeta(a,e,t),await this._createSkeletonMeta(a,e,t),await this._createSkeletonAnimationMeta(a,e,t),await this._createPrefabMeta(a,e,t),await this._createMaterialMeta(a,e,t),this.updateSubMetas(t)}async _updateGltfNode(){const e=1e-4;let t=this._gltf,a=t.nodes;for(let e=0;e<a.length;e++){let t=a[e];if(t.matrix){let e=cc.v3(),a=cc.quat(),s=cc.v3();cc.Mat4.toRTS({m:t.matrix},a,e,s),t.position=cc.Vec3.toArray([],e),t.quat=cc.Quat.toArray([],a),t.scale=cc.Vec3.toArray([],s)}else t.position=t.translation,t.quat=t.rotation,delete t.translation,delete t.rotation;t.name||(t.name=`${e}`);let s=t.children;if(s)for(let e=0;e<s.length;e++)a[s[e]].parent=(()=>t)}function s(e,t,i){i&&"RootNode"===e.name?e.path="":e.path=e.name,t&&(e.path=t+"/"+e.path);let r=e.children;if(r)for(let t=0;t<r.length;t++)s(a[r[t]],e.path,!1)}let i=t.scenes[t.scene].nodes;for(let e=0;e<i.length;e++)s(a[i[e]],"",!0);this.boneCount=0;let r=t.skins||[],n=this._buffers;for(let e=0;e<r.length;e++){let a=t.skins[e],s=t.accessors[a.inverseBindMatrices],i=t.bufferViews[s.bufferView],r=n[i.buffer].buffer,o=s.byteOffset||0,l=new Float32Array(r,i.byteOffset+o,16*s.count),f=t.nodes,u=a.joints;for(let t=0;t<s.count;++t){let a=f[u[t]],s=[];for(let e=0;e<16;e++)s[e]=l[16*t+e];a.bindpose||(a.bindpose={},this.boneCount++),a.bindpose[e]=s}}function o(t,a){for(let s=0;s<t.length;s++)if(Math.abs(t[s]-a[s])>e)return!1;return!0}for(let e=0;e<a.length;e++){let t=a[e],s=t.bindpose;if(!s)continue;let i=!0,r=null;for(let e in s)if(r){if(!o(r,s[e])){i=!1;break}}else r=s[e];i?(t.uniqueBindPose=r,delete t.bindpose):this.precomputeJointMatrix&&Editor.warn(`Node (${t.path}) has different bindposes, precomputeJointMatrix will not work with best performance.`)}}async importModel(a){const s=e.readJsonSync(a);this._gltf=s,s.buffers&&(this._bufferUuids=[],this._buffers=[],await Promise.all(s.buffers.map(async s=>{const i=t.resolve(t.dirname(a),s.uri),r=this._assetdb.fspathToUuid(i);let n=await o(e.readFile)(i);this._buffers.push(new Uint8Array(n.buffer)),this._bufferUuids.push(r)})))}async import(e,a){this._modelName=t.basenameNoExt(e);try{await this.importModel(e)}catch(e){return a()}if(!this._gltf)return a();await this._createSubMetas();let s=new(Editor.require("unpack://engine-dev/cocos2d/core/3d/CCModel"));s.name=this._modelName,s._nodes=this._gltf.nodes,s._precomputeJointMatrix=this.precomputeJointMatrix,this._assetdb.saveAssetToLibrary(this.uuid,s),a()}async postImport(e,a){let s=this.getSubMetas();for(let e in s)s[e].name=e;let i={gltf:this._gltf,meshIDs:this._meshIDs,skeletonIDs:this._skeletonIDs,materiaIDs:this._materiaIDs,modelUuid:this.uuid,modelName:this._modelName,modelPath:e,scaleFactor:this.scaleFactor},{nodeMap:r,materials:n}=await l.start(Editor.url("app://editor/page/worker/create-model-prefab.js"),i),o=this._modelName+".prefab";try{let a=JSON.parse(r[this._modelName]);s[o].importJSON(t.join(e,o),a)}catch(e){Editor.error(e)}let f=this._materialMetas;for(let a=0;a<f.length;a++){let s=f[a];s.dataAsSubAsset||s.importJSON(t.join(e,s.name),n[a])}this.updateSubMetas(s),a()}};