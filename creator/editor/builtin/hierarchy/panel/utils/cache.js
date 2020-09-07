"use strict";require("fire-fs"),require("fire-path");const e=require("./event"),t={EXPAND_ALL:1,COLLAPSE_ALL:2,MEMORY_LAST_STATE:3};let n=!1,o={},r=[],i=[],l=[],d=t.COLLAPSE_ALL;exports.lineHeight=20,exports.foldState=void 0,exports.copyNodes=[];let s=[],f=[];exports.querySearchNodes=function(){return s};let c=0;function a(e){s=[];for(let t=0;t<i.length;++t){let n=i[t];n.name.toLowerCase();n.isSearch=e(n),n.isSearch&&(f[n.id]=n.showIndex,n.showIndex=c++,s.push(n))}return s}exports.findByFilter=function(e){return a(t=>-1!==t.name.toLowerCase().indexOf(e.toLowerCase()))},exports.findByUuids=function(e){return a(t=>-1!==e.indexOf(t.id))},exports.restoreShowIndex=function(){s.forEach(e=>{let t=f[e.id];t&&(e.isSearch=!1,e.showIndex=t)}),s.length=0},exports.queryCache=function(){return o},exports.queryRoots=function(){return r},exports.queryNodes=function(){return i},exports.queryNode=function(e){let t=o[e];return t||null},exports.getRootNodeByTargetNode=function(e){let t=e.parent;if(t){let e=this.queryNode(t);return this.getRootNodeByTargetNode(e)}return e};let h=function(e){let n=Editor.Selection.curSelection("node");return{id:e.id,name:e.name,prefabState:e.prefabState,locked:e.locked,isActive:e.isActive,parent:null,children:[],next:null,prev:null,index:0,showIndex:0,selected:-1!==n.indexOf(e.id),fold:function(e){if(void 0!==e.fold)return e.fold;return d===t.MEMORY_LAST_STATE?-1===l.indexOf(e.id):void 0!==exports.foldState?exports.foldState:e.fold}(e),show:!0,rename:!1,level:0,ignore:!1,hint:!1,isSearch:!1}};exports.add=function(t,n,l){if(n&&!o[n])return console.warn(`Hierarchy - 插入缓存失败，父节点不存在 ${n}`),!1;if(t=h(t),o[t.id]=t,!n){let e=r.indexOf(t.id);-1!==e&&l!==e&&(r.splice(e,1),e=-1),-1===e&&r.splice(l,0,t.id)}if(n){l=l||0,t.parent=n;let e=o[n],r=e.children.indexOf(t.id);-1!==r&&l!==r&&(e.children.splice(r,1),r=-1),-1===r&&e.children.splice(l,0,t.id),t.level=e.level+1,t.prev=e.children[l-1]||null,t.next=e.children[l+1]||null}else t.level=0,t.prev=r[l-1]||null,t.next=r[l+1]||null;t.prev&&(o[t.prev].next=t.id),t.next&&(o[t.next].prev=t.id);let d=0,s=0,f=t;for(;f&&!f.next;)f=o[f.parent];if(f){let e=o[f.next];i.splice(e.index,0,t),d=e.index,s=e.showIndex}else{for(let e=(d=i.length)-1;e>=0;e--){let t=i[e];if(t.show){s=t.showIndex+1;break}}i.push(t)}for(let e=d;e<i.length;e++){let t=i[e];t.index=e,t.show?t.showIndex=s++:t.showIndex=-1}0,e.emit("node-added",t)},exports.remove=function(t){let l=o[t];if(!l)return console.warn(`Hierarchy - 删除缓存失败，节点不存在 ${t}`),[];let d=[{id:t,oldNode:l}];if(l.parent){let e=o[l.parent],n=e.children.indexOf(t);-1!==n&&e.children.splice(n,1)}let s=o[l.prev],f=o[l.next];for(s&&(s.next=f?f.id:null),f&&(f.prev=s?s.id:null),n=!0;l.children.length>0;){exports.remove(l.children[0]).forEach(e=>{d.push({id:e.id,oldNode:e.oldNode})})}if(n=!1,delete o[t],!l.parent){let e=r.indexOf(t);-1!==e&&r.splice(e,1)}let c=l.index;if(i.splice(l.index,1),i.length>0){let e;if(c<=0)e=0;else for(let t=c-1;t>=0;t--){let n=i[t];if(n.show){e=n.showIndex+1;break}}for(let t=c;t<i.length;t++){let n=i[t];n.index=t,n.show?n.showIndex=e++:n.showIndex=-1}}return 0,e.emit("node-removed",l),d},exports.clear=function(){for(;i.length>0;)i.pop();for(;r.length>0;)r.pop();Object.keys(o).forEach(e=>{delete o[e]})};const u=Editor.Profile.load("global://settings.json");exports.initNodeState=function(){(d=u.get("node-tree-state"))===t.MEMORY_LAST_STATE?this.foldState=void 0:(this.foldState=d===t.COLLAPSE_ALL,e.emit("fold-state-changed",this.foldState))};const x=Editor.Profile.load("local://node-tree-state.json");exports.initNodeStateProfile=function(){(l=x.get("nodeFoldStates"))||(l=[],x.set("nodeFoldStates",l),x.save())},exports.saveNodeTreeStateProfile=function(){0,x&&(x.set("nodeFoldStates",l),x.save())},exports.saveNodeFoldState=function(e,t){let n=l.indexOf(e);if(-1!==n&&t)return 0,l.splice(n,1),void 0;if(!t&&-1===n){0,l.push(e);let t=l.length-500;t>0&&l.shift(0,t)}},exports.recording=!1,exports.editPrefab=!1;