"use strict";const t=require("./tools"),e=Editor.require("scene://utils/node"),o=Editor.require("scene://utils/animation");module.exports=class extends Editor.Gizmo{init(){this._rotating=!1}layer(){return"foreground"}onCreateRoot(){let i,s=[],r=[],n=!1;this._tool=t.rotationTool(this._root,{start:()=>{this._rotating=!0,s=[];let t=this.topNodes;for(let e=0;e<t.length;++e)s.push(t[e].angle);if("center"===this._view.pivot){i=Editor.GizmosUtils.getCenter(this.target),r.length=0;for(let o=0;o<t.length;++o){let s=e.getScenePosition(t[o]);r.push(s.sub(i))}}},update:t=>{if(0===t)return;let o,h,l;n=!0,this.target.forEach(t=>{_Scene.Undo.recordNode(t.uuid)}),l=Math.floor(t);let a=this.topNodes;if("center"===this._view.pivot)for(o=0;o<s.length;++o){h=Editor.Math.deg180(s[o]+l),h=Math.floor(h);let n=r[o].rotate(Editor.Math.deg2rad(l));e.setScenePosition(a[o],i.add(n)),a[o].angle=h,this._tool.rotation=-t}else for(o=0;o<s.length;++o)h=Editor.Math.deg180(s[o]+l),h=Math.floor(h),a[o].angle=h;this._view.repaintHost()},end:()=>{if("center"===this._view.pivot){let t=Editor.GizmosUtils.getCenter(this.target),e=this.sceneToPixel(t);this._tool.rotation=0,this._tool.position=e,this._tool.translate(this._tool.position.x,this._tool.position.y).rotate(this._tool.rotation,0,0)}this._rotating=!1,n&&(o.recordNodeChanged(this.target),_Scene.Undo.commit()),n=!1}})}onKeyDown(t){if(!this.target)return;this._rotating=!0;let o=Editor.KeyCode(t.which);if("left"!==o&&"right"!==o&&"up"!==o&&"down"!==o)return;let i=t.shiftKey?10:1;"right"!==o&&"down"!==o||(i*=-1),this.keydownDelta||(this.keydownDelta=0),this.keydownDelta-=i,this.recordChanges();let s=this.topNodes;if("center"===this._view.pivot){let t=Editor.GizmosUtils.getCenter(this.target);for(let o=0;o<s.length;++o){let r=s[o],n=Editor.Math.deg180(r.angle+i);n=Math.floor(n);let h=e.getScenePosition(r).sub(t);h=h.rotate(Editor.Math.deg2rad(-i)),e.setScenePosition(r,t.add(h)),r.rotation=n,this._tool.rotation=this.keydownDelta}}else for(let t=0;t<s.length;++t)s[t].angle+=i;this._view.repaintHost()}onKeyUp(t){if(!this.target)return;let e=Editor.KeyCode(t.which);if("left"===e||"right"===e||"up"===e||"down"===e){if("center"===this._view.pivot){let t=Editor.GizmosUtils.getCenter(this.target),e=this.sceneToPixel(t),o=this._tool;o.rotation=0,o.position=e,o.translate(o.position.x,o.position.y).rotate(o.rotation,0,0),this._view.repaintHost()}this.keydownDelta=null,this._rotating=!1,this.commitChanges()}}visible(){return!0}dirty(){return!0}onUpdate(){let t,o,i,s=this.node;if("center"===this._view.pivot){if(this._rotating)return this._tool.rotate(this._tool.rotation,0,0),void 0;t=Editor.GizmosUtils.getCenter(this.target),o=this.sceneToPixel(t)}else t=e.getScenePosition(s),o=this.sceneToPixel(t),i=-e.getSceneRotation(s);this._tool.position=o,this._tool.rotation=i,this._tool.translate(this._tool.position.x,this._tool.position.y).rotate(this._tool.rotation,0,0)}};