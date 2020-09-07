"use strict";const{shell:e}=require("electron"),t=require("fs");let r={username:"#username",password:"#password",error:".error",forget:".forget",register:".register",login:".login",loading:".loading"},s=function(){return"?from=creator&version="+Editor.remote.versions.CocosCreator};module.exports=class extends window.HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});let i=t.readFileSync(__dirname+"/login-frame.html","utf8"),n=t.readFileSync(__dirname+"/login-frame.css","utf8");i=(i=i.replace("/* {{style}} */",n)).replace(/\{\{t\(\'(\S+)\'\)\}\}/g,(e,t)=>Editor.T(`LOGIN.${t}`)),this.shadowRoot.innerHTML=i,this.$={},Object.keys(r).forEach(e=>{this.$[e]=this.shadowRoot.querySelector(r[e])}),this.$.forget.addEventListener("click",()=>{e.openExternal("https://auth.cocos.com/#/find_password"+s()),e.beep()}),this.$.register.addEventListener("click",()=>{e.openExternal("https://auth.cocos.com/#/sign_up/register"+s()),e.beep()}),this.$.username.addEventListener("focus",()=>{this.$.error.innerHTML=""}),this.$.password.addEventListener("focus",()=>{this.$.error.innerHTML=""}),this.$.username.addEventListener("keydown",e=>{13===e.keyCode&&this.$.password.focus()}),this.$.password.addEventListener("keydown",e=>{if(13===e.keyCode){let e=document.createEvent("HTMLEvents");e.initEvent("click",!1,!1),this.$.login.dispatchEvent(e)}}),this.$.login.addEventListener("click",async()=>{let e=this.$.username.value,t=this.$.password.value;this.loading=!0;try{await Editor.User.login(e,t)}catch(e){return this.$.error.innerHTML=e,this.loading=!1,void 0}let r=document.createEvent("HTMLEvents");r.initEvent("login",!1,!1),this.dispatchEvent(r),this.loading=!1})}static get observedAttributes(){return["hidden"]}attributeChangedCallback(e,t,r){switch(e){case"hidden":Editor.UI._FocusMgr.disabled=null===r}}get loading(){return null!==this.getAttribute("loading")}set loading(e){e?this.setAttribute("loading",""):this.removeAttribute("loading")}};