"use strict";module.exports={init(){var e=require("fs"),i=Editor.require("packages://cocos-services/panel/utils/utils.js"),t=Editor.require("packages://cocos-services/panel/utils/serviceConfig.js");let s=Editor.require("packages://cocos-services/panel/utils/ccServices.js");Editor.require("packages://cocos-services/panel/confirm/confirm.js").init(),s.devmode&&console.log(`service-detail ${i.t("reg_component")}`),Vue.component("service-detail",{template:e.readFileSync(Editor.url("packages://cocos-services/panel/serviceDetail/serviceDetail.html"),"utf-8"),data(){return{componentName:"",isDownloadServicePackage:!1,downloadTip:i.t("installing"),isOpenService:!1,openServiceTip:i.t("opening_service"),confirmProtocol:!1,params:{},enable:this.service.enable,serviceVersion:"",upgrade:"",hasUpdate:!1,showUpdate:!1,jumpUpdate:!1,enableButton:!1,defaultSelected:this.utils_t("select_version_please"),enableHistory:!1,sty:{display:"block",position:"absolute",top:"20px",bottom:"0px",left:"0px",right:"0px",padding:"10px","padding-top":"20px",background:"rgb(73,73,73)","z-index":"100"},styHint:{display:"none",position:"absolute",top:"300px",left:"10px","box-shadow":"0px 8px 16px 0px rgba(0,0,0,2)",padding:"12px, 16px"}}},methods:{utils_t:function(e,...t){return i.t(e,...t)},getRealPath:function(e){return Editor.url("packages://cocos-services/panel/assets/")+e},backHome:function(){this.showUpdate?(this.showUpdate=!1,this.serviceVersion=s.readServicePackageInfo(this.componentName).version):this.$emit("back-home")},handleSaveParamLogic:function(e,i=!0){this.params=e,this.params.plugin_version=this.serviceVersion,t.writeServiceParam(this.service.service_id,e),i&&window.ccServicesAnalytics&&window.ccServicesAnalytics.saveParameter()},handleEnabelServiceLogic:async function(e){e.target.checked=!1,this.enable?this.disableService():this.checkedServiceOnServer()?this.enableService():this.confirmProtocol=!0,e.target.checked=this.enable},sendToMain:function(e){Editor.Ipc.sendToMain("cocos-services:execH5Script",{service:this.service,params:this.params,enable:e},()=>{},-1)},selectChange:function(e){var i=e.detail.value;i===this.utils_t("select_version_please")?this.enableButton=!1:i===this.serviceVersion?this.enableButton=!1:this.enableButton=!0},clactureVersion:function(){var e=s.readServiceVersionByURL(this.service.package_download_url);this.hasUpdate=s.compareVersion(e,this.serviceVersion),this.hasUpdate?(this.hasUpdate=!1,this.$nextTick(()=>this.hasUpdate=!0)):(this.hasUpdate=!0,this.$nextTick(()=>this.hasUpdate=!1)),this.upgrade=s.readServicePackageInfo(this.componentName).upgrade,this.params.plugin_version&&this.params.plugin_version!==this.serviceVersion&&i.printToCreatorConsole("warn",this.service.service_name+" - "+this.utils_t("service_version_warnning"))},switchVersion:function(e){this.defaultSelected!==this.utils_t("select_version_please")&&this.defaultSelected!==this.serviceVersion&&this.downloadSpecifyVersion(!1)},confrimUpdate:function(){this.downloadSpecifyVersion(!0)},handleProtocol:function(e){this.confirmProtocol=!1,e&&(this.isOpenService=!0,s.getUserDataAsync().then(e=>{this.openService(e,e=>{e&&(s.getGameDetail(s.getGame().data.app_id),this.enableService())})}))},downloadSpecifyVersion:function(e){0===Editor.Dialog.messageBox({title:this.utils_t("dialog_title"),message:this.utils_t(e?"update_version_tips":"switch_version_tips"),buttons:[this.utils_t("btn_ok"),this.utils_t("btn_cancel")],defaultId:0,cancelId:1,noLink:!0})&&(this.enableHistory=this.enable,this.disableService(),window.CocosServicesUpdate=!0,s.uninstallServicePackage(this.service.service_component_name),this.showUpdate=!1,this.downloadServicePackage(e=>{if(!e)return i.printToCreatorConsole("warn",this.utils_t("download_url_empty")),void 0;this.hasUpdate=!1,this.styHint.display="none",this.enableHistory&&setTimeout(()=>this.enableService(),1e3),this.clactureVersion()},e?null:s.getServicePackageDownloadUrl(this.service.package_download_url,this.defaultSelected)))},cancelUpdate:function(){this.showUpdate=!1,this.serviceVersion=s.readServicePackageInfo(this.componentName).version},versionClick:function(){this.showUpdate=!0,this.jumpUpdate=!1,this.upgrade=s.readServicePackageInfo(this.componentName).upgrade,this.serviceVersion=s.readServicePackageInfo(this.componentName).version},updateClick:function(){this.showUpdate=!0,this.jumpUpdate=!0,this.upgrade=this.service.package_version_desc,this.serviceVersion=s.readServiceVersionByURL(this.service.package_download_url)},handleGotoLinkLogic:function(e){var t;switch(e){case"guide":t=this.service.service_guide_url,window.ccServicesAnalytics&&window.ccServicesAnalytics.gotoGuideUrl(t);break;case"dev":t=this.service.service_dev_url,window.ccServicesAnalytics&&window.ccServicesAnalytics.gotoDashboardUrl(t);break;case"sample":t=this.service.service_sample_url,window.ccServicesAnalytics&&window.ccServicesAnalytics.gotoSampleUrl(t)}i.openUrlWithDefaultExplorer(t)},checkedServicePackageExixts:function(){var t=i.getCreatorHomePath()+"/services/"+this.service.service_component_name.split("-")[1]+"/pages/index.js";return e.existsSync(t)},checkedServiceOnServer:function(){var e=s.getGame();return"0"===this.service.service_type||e.data.service.indexOf(this.service.service_id)>=0},openService:function(e,t){var c="0"!==s.getGame().data.corporation_id;if(0!==this.service.require_verify){var r=1==(1&e.verification_status),a=2==(2&e.verification_status),n=4==(4&e.verification_status),o="",l="",d="",v=!1;if(c?1!==this.service.require_verify||e.is_mobile_company?2!==this.service.require_verify||a?3!==this.service.require_verify||n||(o=s.getUrl("company_verify",{corporation_id:e.corporation_id,verifyLevel:1}),l=this.utils_t("high_verify_tips"),d=this.utils_t("certificate"),v=!0):(o=s.getUrl("company_verify",{corporation_id:e.corporation_id}),l=this.utils_t("verify_tips"),d=this.utils_t("certificate"),v=!0):(o=s.getUrl("company_bind_phone"),l=this.utils_t("realname_company_tips"),d=this.utils_t("realname"),v=!0):1!==this.service.require_verify||e.is_mobile?2!==this.service.require_verify&&3!==this.service.require_verify||r||(o=s.getUrl("person_verify"),l=this.utils_t("verify_person_tips"),d=this.utils_t("certificate"),v=!0):(o=s.getUrl("person_bind_phone"),l=this.utils_t("realname_person_tips"),d=this.utils_t("realname"),v=!0),v)return 0===Editor.Dialog.messageBox({title:this.utils_t("dialog_title"),message:l,buttons:[d,this.utils_t("btn_cancel")],defaultId:0,cancelId:1,noLink:!0})&&i.openUrlWithDefaultExplorer(o),t&&t(!1),this.isOpenService=!1,void 0;this.isOpenService=!1}window.ccServicesAnalytics&&window.ccServicesAnalytics.openService(),s.openService(s.getGame().data.app_id,this.service.service_id,(e,s)=>{if(e)window.ccServicesAnalytics&&window.ccServicesAnalytics.openServiceSuccess();else{if(702===s.status||703===s.status)return this.createTentcentSubAccount(702===s.status),this.isOpenService=!1,void 0;window.ccServicesAnalytics&&window.ccServicesAnalytics.openServiceFailed(s);var c=`${this.utils_t("open_service_failed")}\n\t${this.utils_t("open_service_failed_code")} : ${s.status?s.status:""}\n\t${this.utils_t("open_service_failed_msg")} : ${s.msg?s.msg:""}`;i.printToCreatorConsole("warn",this.service.service_name+" - "+c)}this.isOpenService=!1,t&&t(e)})},createTentcentSubAccount:function(e){if(0===Editor.Dialog.messageBox({title:this.utils_t("dialog_title"),message:e?this.utils_t("create_t_p_sub_tip"):this.utils_t("create_t_c_sub_tip"),buttons:[this.utils_t("btn_ok"),this.utils_t("btn_cancel")],defaultId:0,cancelId:1,noLink:!0})){i.printToCreatorConsole("info",s.getUrl("create_t_c_sub"));var t={title:this.utils_t("open_tencent_sub_account"),url:e?s.getUrl("create_t_p_sub"):s.getUrl("create_t_c_sub")};Editor.Ipc.sendToMain("cocos-services:openBrowser",t)}},enableService:function(){this.checkedServicePackageExixts()?(this.enable=!0,this.$emit("enable-service",this.service.service_id,!0),this.sendToMain(!0)):this.downloadServicePackage(e=>{if(!e)return this.enable=!1,i.printToCreatorConsole("warn",this.utils_t("download_url_empty")),void 0;this.enable=!0,this.$emit("enable-service",this.service.service_id,!0),this.sendToMain(!0)}),this.isOpenService=!1,window.ccServicesAnalytics&&window.ccServicesAnalytics.enableService()},disableService:function(){this.enable=!1,this.$emit("enable-service",this.service.service_id,!1),this.sendToMain(!1),window.ccServicesAnalytics&&window.ccServicesAnalytics.disableService()},downloadServicePackage:function(e,t){if(this.isDownloadServicePackage=!0,this.downloadTip=this.utils_t("installing"),t||(t=this.service.package_download_url),""===t)return this.isDownloadServicePackage=!1,e(!1),void 0;window.ccServicesAnalytics&&window.ccServicesAnalytics.downloadService(s.readServiceVersionByURL(t)),s.installServicePackage(t,this.componentName,t=>{if(this.downloadTip=t.text,this.isDownloadServicePackage=!1,this.$nextTick(()=>this.isDownloadServicePackage=!0),t.complete){if("failed"===t.text)return this.isDownloadServicePackage=!0,this.$nextTick(()=>this.isDownloadServicePackage=!1),i.printToCreatorConsole("warn",this.utils_t("download_failed")),void 0;setTimeout(()=>{s.registerServiceComponent(this.componentName),this.serviceVersion=s.readServicePackageInfo(this.componentName).version,this.isDownloadServicePackage=!1,e(!0)},1e3)}})},enter:function(e){this.styHint.top=e.target.getBoundingClientRect().top-window._Scene?50:10,this.styHint.display="block"},leave:function(e){this.styHint.display="none"}},created(){this.params=t.readServiceParam(this.service.service_id),s.registerServiceComponent(),this.componentName=this.service.service_component_name,this.serviceVersion=s.readServicePackageInfo(this.componentName).version,this.enable=this.service.enable&&s.serviceExists(this.service.service_component_name),this.$emit("enable-service",this.service.service_id,this.enable),this.clactureVersion();var e=this.service.service_dev_url;e.match(/UNKNOW/)&&"UNKNOW"!==s.getGame().data.app_id?e=e.replace("UNKNOW",s.getGame().data.app_id):e.match(/app_id=\d+/)&&(e=e.replace(/app_id=\d+/,`app_id=${s.getGame().data.app_id}`)),this.service.service_dev_url=e},props:{service:{type:Object}}})}};