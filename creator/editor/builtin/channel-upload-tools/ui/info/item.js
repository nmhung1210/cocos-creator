let e=require("fire-fs"),o=require("fire-path");module.exports={name:"upload-item",template:e.readFileSync(Editor.url("packages://channel-upload-tools/ui/info/item.html"),"utf8"),components:function(){let r=[],t=Editor.url("packages://channel-upload-tools/platform");return e.readdirSync(t).forEach(n=>{let i=o.join(t,n),a=o.join(t,n,"info.js");e.isDirSync(i)&&e.existsSync(a)?r.push(require(a)):Editor.error(`Load ${n} (info.js) failed`)}),r}(),props:["info","platform","page"],data:function(){return{}},computed:{compName(){return`${this.platform}-info`}},methods:{}},Vue.component(module.exports.name,module.exports);