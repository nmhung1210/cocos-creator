"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const{parse:parse}=require("url"),{stringify:stringify}=require("querystring"),{request:httpsRequest}=require("https");function sendPostRequest(e,t){return new Promise((r,o)=>{let n=parse(e),s={"Content-Type":"application/x-www-form-urlencoded","Content-Length":(t=stringify(t||{})).length,"User-Agent":"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36"},i={method:"POST",host:n.hostname,port:n.port||443,path:n.pathname,headers:s,ciphers:"ALL",secureProtocol:"TLSv1_method"},a="",u=httpsRequest(i,e=>{200===e.statusCode?e.on("data",e=>{a+=e}).on("end",()=>{var e=null;try{e=JSON.parse(a)}catch(e){return void o(e)}r(e)}):o(new Error("Connect Failed"))}).on("error",e=>{o(e)}).setTimeout(8e3,()=>{o(new Error("timeout"))});u.write(t),u.end()})}function sendGetRequest(e,t){return new Promise((r,o)=>{var n=parse(e);t=stringify(t||{});var s={method:"GET",host:n.hostname,port:n.port||443,path:n.pathname+"?"+t,headers:{"User-Agent":"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36"},ciphers:"ALL",secureProtocol:"TLSv1_method"},i="";httpsRequest(s,e=>{200===e.statusCode?e.on("data",e=>{i+=e}).on("end",()=>{var e=null;try{e=JSON.parse(i)}catch(e){return o(e)}r(e)}):o(new Error("Connect Failed"))}).on("error",e=>{o(e)}).setTimeout(8e3,()=>{o(new Error("timeout"))}).end()})}exports.sendPostRequest=sendPostRequest,exports.sendGetRequest=sendGetRequest;