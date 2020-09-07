let o=require("fire-fs"),t=require("fire-path");const e=Editor.require("packages://channel-upload-tools/ui/info/list.js");Editor.Panel.extend({_vm:null,template:o.readFileSync(Editor.url("packages://channel-upload-tools/ui/index.html"),"utf8"),style:o.readFileSync(Editor.url("packages://channel-upload-tools/ui/index.css"),"utf8"),messages:{loginResult(o,t,e){this._vm.$emit("loginResult",t,e)},oAuthWindowClose(o,t){this._vm.$emit("oAuthWindowClose",t)}},run(o){o&&(this.args=o,this.args&&this.args.platform&&(this._vm.page=`${this.args.platform}-upload`))},ready(){this.components=[],this.loadComponents();let o=this.components.map(o=>o.platform);this.components.push(e),this._vm=new Vue({el:this.shadowRoot,components:this.components,data:function(){return{page:"upload-list",info:{},platforms:o}},created(){},watch:{config:{handler(o){this.save()},deep:!0}},methods:{save(){this.profile.set("",this.config),this.profile.save()},t:o=>Editor.T(`channel-upload-tools.${o}`)}})},loadComponents(){try{let e=Editor.url("packages://channel-upload-tools/platform");o.readdirSync(e).forEach(s=>{let i=t.join(e,s),a=t.join(e,s,"upload.js");o.isDirSync(i)&&o.existsSync(a)?this.components.push(require(a)):Editor.error(`Load ${s} (upload.js) plugin failed`)})}catch(o){Editor.error("Load components failed")}}});