let e,n,s,i,t,r,a,o=require("../lib/hashes.min.js"),c=require("path"),p=require("fs-extra");module.exports={gatherInfo(o){r=o.JsZip,t=o.cpk,i=o.gameConfig,s=o.title,e=o.buildPath,a=o.options,n=[]},organizeResources(){let e=i.subpackages=[];for(var s=0,t=a.bundles.length;s<t;s++){var r=a.bundles[s];if("subpackage"!==r.compressionType)continue;let i=r.name,t=r.scriptDest;if(n.includes(t))break;n.push(t);let o=c.join(r.scriptDest,"index.js");p.existsSync(o)&&p.renameSync(o,c.join(r.scriptDest,"main.js")),e.push({name:i,root:i+"/"})}},pack(){let i=c.join(e,"subpackages");n.forEach(function(e){let n=new r,t=c.win32.basename(e),a=o.CRC32(t+"/"),u=c.join(i,s+"."+a+".cpk");p.existsSync(u)&&p.unlinkSync(u);let l=p.createWriteStream(u);n.directory(e,t),n.generateNodeStream({type:"nodebuffer",base64:!1,compression:"DEFLATE"}).pipe(l).on("finish",function(){})})}};