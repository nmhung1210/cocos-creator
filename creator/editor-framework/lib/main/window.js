"use strict";const e=require("electron"),t=require("fire-url"),i=require("fire-fs"),n=require("lodash"),s=require("events"),o=e.BrowserWindow,a="1.1.1",r=100;let l=[],d=null,h="",u=null,w=[];const p="auto";class f extends s{constructor(t,s){if(super(),s=s||{},n.defaultsDeep(s,{windowType:"dockable",width:400,height:300,acceptFirstMouse:!0,disableAutoHideCursor:!0,backgroundColor:"#333",webPreferences:{nodeIntegration:!0,webviewTag:!0,preload:v.url("editor-framework://renderer.js")},defaultFontSize:13,defaultMonospaceFontSize:13}),this._loaded=!1,this._currentSessions={},this._panels=[],this._layout=null,this.closing=!1,d){let e=d.get("windows");e&&e[t]&&(this._layout=e[t].layout)}switch(this.name=t,this.hideWhenBlur=!1,this.windowType=s.windowType,this.save=s.save,"boolean"!=typeof this.save&&(this.save=!0),this.windowType){case"dockable":s.resizable=!0,s.alwaysOnTop=!1;break;case"float":s.resizable=!0,s.alwaysOnTop=!0;break;case"fixed-size":s.resizable=!1,s.alwaysOnTop=!0;break;case"quick":s.resizable=!0,s.alwaysOnTop=!0,this.hideWhenBlur=!0}if(this.nativeWin=new o(s),void 0===s.x&&void 0===s.y&&f.main){let t=e.screen.getDisplayMatching(f.main.nativeWin.getBounds()),i=this.nativeWin.getSize(),n=.5*(t.workArea.width-i[0]),s=.5*(t.workArea.height-i[1]);n=Math.floor(n),s=Math.floor(s),n<0||s<0?(this.nativeWin.setPosition(t.workArea.x,t.workArea.y),setImmediate(()=>{this.nativeWin.center()})):this.nativeWin.setPosition(n,s)}this.hideWhenBlur&&this.nativeWin.setAlwaysOnTop(!0),this.nativeWin.on("focus",()=>{y.focused||(y.focused=!0,y.emit("focus"))}),this.nativeWin.on("blur",()=>{setImmediate(()=>{o.getFocusedWindow()||(y.focused=!1,y.emit("blur"))}),this.hideWhenBlur&&this.nativeWin.hide()}),this.nativeWin.on("close",e=>{this.closing=!0,"quick"===this.windowType&&(e.preventDefault(),this.nativeWin.hide()),f._saveWindowStates()}),this.nativeWin.on("closed",()=>{for(let e in this._currentSessions){b._closeSessionThroughWin(e);let t=this._currentSessions[e];t&&t()}this._currentSessions={},this.isMainWindow?(f.removeWindow(this),f.main=null,c._quit()):f.removeWindow(this),this.dispose()}),this.nativeWin.on("unresponsive",e=>{W.error(`Window "${this.name}" unresponsive: ${e}`)}),this.nativeWin.webContents.on("dom-ready",()=>{["theme://globals/common.css","theme://globals/layout.css"].forEach(e=>{let t=i.readFileSync(c.url(e),"utf8");this.nativeWin.webContents.insertCSS(t)})}),this.nativeWin.webContents.on("did-finish-load",()=>{this._loaded=!0}),this.nativeWin.webContents.on("crashed",e=>{W.error(`Window "${this.name}" crashed: ${e}`)}),this.nativeWin.webContents.on("will-navigate",(t,i)=>{t.preventDefault(),e.shell.openExternal(i)}),f.addWindow(this)}dispose(){this.nativeWin=null}load(e,n){let s=v.url(e);if(!s)return W.error(`Failed to load page ${e} for window "${this.name}"`),void 0;this._url=e,this._loaded=!1;let o=n?encodeURIComponent(JSON.stringify(n)):void 0;if(i.existsSync(s))return s=t.format({protocol:"file",pathname:s,slashes:!0,hash:o}),this.nativeWin.loadURL(s),void 0;o&&(s=`${s}#${o}`),this.nativeWin.loadURL(s)}show(){this.nativeWin.show()}hide(){this.nativeWin.hide()}close(){this._loaded=!1,this.nativeWin.close()}forceClose(){this._loaded=!1,f._saveWindowStates(),this.nativeWin&&this.nativeWin.destroy()}focus(){this.nativeWin.focus()}minimize(){this.nativeWin.minimize()}restore(){this.nativeWin.restore()}openDevTools(e){e=e||{mode:"detach"},this.nativeWin.openDevTools(e)}closeDevTools(){this.nativeWin.closeDevTools()}adjust(t,i,n,s){let o=!1;"number"!=typeof t&&(o=!0,t=0),"number"!=typeof i&&(o=!0,i=0),("number"!=typeof n||n<=0)&&(o=!0,n=800),("number"!=typeof s||s<=0)&&(o=!0,s=600);let a=e.screen.getDisplayMatching({x:t,y:i,width:n,height:s});if(this.nativeWin.setSize(n,s),this.nativeWin.setPosition(a.workArea.x,a.workArea.y),!o){let e=a.workArea,s=e.x+r,l=e.y,d=e.x+(e.width-r),h=e.y+(e.height-r);(t+n<=s||t>=d||i<=l||i>=h)&&(o=!0)}o?this.nativeWin.center():this.nativeWin.setPosition(t,i)}resetLayout(e,t){let n,s=c.url(e);s||(s=c.url(h));try{n=JSON.parse(i.readFileSync(s))}catch(e){c.error(`Failed to load default layout: ${e.message}`),n=null}n&&(b._closeAllSessions(),this.send("editor:reset-layout",n,!0,t))}emptyLayout(){b._closeAllSessions(),this.send("editor:reset-layout",null)}_send(...e){let t=this.nativeWin.webContents;return t?(t.send.apply(t,e),!0):(W.error(`Failed to send "${e[0]}" to ${this.name} because web contents are not yet loaded`),!1)}_sendToPanel(e,t,...i){if("string"!=typeof t)return W.error(`The message ${t} sent to panel ${e} must be a string`),void 0;let n=b._popReplyAndTimeout(i,b.debug);if(!n)return i=["editor:ipc-main2panel",e,t,...i],!1===this._send.apply(this,i)&&W.failed(`send message "${t}" to panel "${e}" failed, no response received.`),void 0;let s=b._newSession(t,`${e}@main`,n.reply,n.timeout,this);return this._currentSessions[s]=n.reply,i=["editor:ipc-main2panel",e,t,...i,b.option({sessionId:s,waitForReply:!0,timeout:n.timeout})],this._send.apply(this,i),s}_closeSession(e){this.nativeWin&&delete this._currentSessions[e]}_addPanel(e){-1===this._panels.indexOf(e)&&this._panels.push(e)}_removePanel(e){let t=this._panels.indexOf(e);-1!==t&&this._panels.splice(t,1)}_removeAllPanels(){this._panels=[]}send(e,...t){if("string"!=typeof e)return W.error(`Send message failed for '${e}'. The message must be a string`),void 0;let i=b._popReplyAndTimeout(t,b.debug);if(!i)return t=[e,...t],!1===this._send.apply(this,t)&&W.failed(`send message "${e}" to window failed. No response was received.`),void 0;let n=b._newSession(e,`${this.nativeWin.id}@main`,i.reply,i.timeout,this);return this._currentSessions[n]=i.reply,t=["editor:ipc-main2renderer",e,...t,b.option({sessionId:n,waitForReply:!0,timeout:i.timeout})],this._send.apply(this,t),n}popupMenu(e,t,i){void 0!==t&&(t=Math.floor(t)),void 0!==i&&(i=Math.floor(i));let n=this.nativeWin.webContents,s=new g(e,n);s.nativeMenu.popup(this.nativeWin,t,i),s.dispose()}get isMainWindow(){return f.main===this}get isFocused(){return this.nativeWin.isFocused()}get isMinimized(){return this.nativeWin.isMinimized()}get isLoaded(){return this._loaded}get panels(){return this._panels}static get defaultLayoutUrl(){return h}static set defaultLayoutUrl(e){h=e}static get windows(){return l.slice()}static set main(e){return u=e}static get main(){return u}static find(e){if("string"==typeof e){for(let t=0;t<l.length;++t){let i=l[t];if(i.name===e)return i}return null}if(e instanceof o){for(let t=0;t<l.length;++t){let i=l[t];if(i.nativeWin===e)return i}return null}for(let t=0;t<l.length;++t){let i=l[t];if(i.nativeWin&&i.nativeWin.webContents===e)return i}return null}static addWindow(e){l.push(e)}static removeWindow(e){let t=l.indexOf(e);if(-1===t)return W.warn(`Cannot find window ${e.name}`),void 0;l.splice(t,1)}static getPanelWindowState(e){if(d){let t=d.get(`panels.${e}`);if(t)return{x:t.x,y:t.y,width:t.width,height:t.height}}return{}}static getLabelWidth(e){return d?d.get(`panelLabelWidth.${e}`):p}static saveLabelWidth(e,t){d&&(d.set(`panelLabelWidth.${e}`,t),d.save())}static _saveWindowStates(e){if("test"===c.argv._command)return;if(!f.main)return;if(!d)return;d.set("version",a);let t=d.get("panels")||[],i={};for(let e=0;e<l.length;++e){let n=l[e],s=n.nativeWin.getBounds();if(n.save?(s.width||(W.warn(`Failed to commit window state. Invalid window width: ${s.width}`),s.width=800),s.height||(W.warn(`Failed to commit window state. Invalid window height ${s.height}`),s.height=600),i[n.name]={main:n.isMainWindow,url:n._url,windowType:n.windowType,x:s.x,y:s.y,width:s.width,height:s.height,layout:n._layout,panels:n._panels}):i[n.name]={},!n.isMainWindow&&1===n.panels.length){t[n.panels[0]]={x:s.x,y:s.y,width:s.width,height:s.height}}}d.set("windows",i),d.set("panels",t),d.save(),e&&e()}static initWindowStates(e,t){let i=require("../share/profile/default-layout-windows");m.load(t,i),(d=m.load(e)).get("version")!==a&&(i.version=a,d.set(null,i))}static _restoreWindowStates(e){if(d){let t=Object.assign({},e);w=[];let i=d.get("windows");for(let e in i){let n,s=i[e];v.url(s.url)&&(s.main?(t.show=!1,t.windowType=s.windowType,n=new f(e,t),f.main=n):n=new f(e,{show:!1,windowType:s.windowType}),"simple"===s.windowType&&(n._panels=s.panels),!s.main&&s.panels&&s.panels.length&&n.nativeWin.setMenuBarVisibility(!1),n.adjust(s.x,s.y,s.width,s.height),s.main?(n.show(),n.load(s.url)):w.push({win:n,state:s}))}if(f.main)return f.main.focus(),!0}return!1}}module.exports=f;const c=require("./editor"),v=require("./protocol"),y=require("../app"),m=require("../profile"),W=require("./console"),g=require("./menu"),b=require("./ipc"),_=require("./package"),S=e.ipcMain;S.on("editor:ready",()=>{for(;w.length>0;){let e=w.pop(),t=e.win,i=e.state,n=i.panels[0],s=_.panelInfo(n);t.show(),t.load(i.url,{panelID:n,panelArgv:void 0,engineSupport:s&&s.engineSupport})}}),S.on("editor:window-open",(e,t,i,n)=>{let s=new f(t,n=n||{});s.nativeWin.setMenuBarVisibility(!1),n.width&&n.height&&s.nativeWin.setContentSize(n.width,n.height),s.load(i,n.argv),s.show()}),S.on("editor:window-query-layout",e=>{let t=o.fromWebContents(e.sender),n=f.find(t);if(!n)return W.warn("Failed to query layout, cannot find the window."),e.reply(),void 0;let s=n._layout;if(n.isMainWindow&&!s){let e=v.url(h);if(i.existsSync(e))try{s=JSON.parse(i.readFileSync(e))}catch(e){W.error(`Failed to load default layout: ${e.message}`),s=null}}e.reply(null,s)}),S.on("editor:window-save-layout",(e,t)=>{let i=o.fromWebContents(e.sender),n=f.find(i);if(!n)return W.warn("Failed to save layout, cannot find the window."),void 0;n._layout=t,f._saveWindowStates(()=>{e.reply&&e.reply()})}),S.on("editor:update-label-width",(e,t,i)=>{let n=o.fromWebContents(e.sender);if(!f.find(n))return W.warn("Failed to save layout, cannot find the window."),void 0;f.saveLabelWidth(t,i)}),S.on("editor:query-label-width",(e,t)=>{let i=o.fromWebContents(e.sender);if(!f.find(i))return W.warn("Failed to save layout, cannot find the window."),void 0;e.reply&&e.reply(null,f.getLabelWidth(t))}),S.on("editor:window-focus",e=>{let t=o.fromWebContents(e.sender),i=f.find(t);if(!i)return W.warn("Failed to focus, cannot find the window."),void 0;i.isFocused||i.focus()}),S.on("editor:window-load",(e,t,i)=>{let n=o.fromWebContents(e.sender),s=f.find(n);if(!s)return W.warn("Failed to focus, cannot find the window."),void 0;s.load(t,i)}),S.on("editor:window-resize",(e,t,i,n)=>{let s=o.fromWebContents(e.sender),a=f.find(s);if(!a)return W.warn("Failed to focus, cannot find the window."),void 0;n?a.nativeWin.setContentSize(t,i):a.nativeWin.setSize(t,i)}),S.on("editor:window-center",e=>{let t=o.fromWebContents(e.sender),i=f.find(t);if(!i)return W.warn("Failed to focus, cannot find the window."),void 0;i.nativeWin.center()}),S.on("editor:window-inspect-at",(e,t,i)=>{let n=o.fromWebContents(e.sender);if(!n)return W.warn(`Failed to inspect at ${t}, ${i}, cannot find the window.`),void 0;n.inspectElement(t,i),n.devToolsWebContents&&n.devToolsWebContents.focus()}),S.on("editor:window-remove-all-panels",e=>{let t=o.fromWebContents(e.sender),i=f.find(t);if(!i)return e.reply(),void 0;i._removeAllPanels(),e.reply()});