"use strict";const e=require("async"),t=require("xmldom").DOMParser,r=require("fire-fs"),o=require("fire-path"),n=require("fire-url"),i=require("./xml-utils"),a="db://internal/",d="db://internal/image/default_sprite_splash.png/default_sprite_splash",l="db://internal/particle/atom.plist",c="db://internal/image/default_btn_normal.png/default_btn_normal",s="db://internal/image/default_btn_pressed.png/default_btn_pressed",f="db://internal/image/default_btn_disabled.png/default_btn_disabled",p="db://internal/image/default_progressbar.png/default_progressbar",u="db://internal/image/default_scrollbar_vertical.png/default_scrollbar_vertical",g="db://internal/image/default_scrollbar.png/default_scrollbar",m="db://internal/image/default_panel.png/default_panel",N="_action",v=60,y=/[\\\/]/g,h={SpriteObjectData:function(e,t,r){G(e,t,cc.Sprite.SizeMode.RAW,r)},ImageViewObjectData:function(t,r,o){e.waterfall([function(e){G(t,r,cc.Sprite.SizeMode.CUSTOM,e)},function(e){var o=t.getComponent(cc.Sprite);if(!o)return e(),void 0;var n=i.getBoolPropertyOfNode(r,"Scale9Enable",!1);n&&o.spriteFrame?(o.type=cc.Sprite.Type.SLICED,Y(r,o.spriteFrame._uuid,e)):e()}],o)},ParticleObjectData:function(e,t,r){var o=e.addComponent(cc.ParticleSystem);if(!o)return Editor.warn("Add ParticleSystem component for node %s failed.",t.getAttribute("Name")),r(),void 0;var a="";switch(i.getPropertyOfNode(t,"Type","Default","FileData")){case"Normal":var d=i.getPropertyOfNode(t,"Path","","FileData");a=n.join(B,d);break;case"Default":default:a=l}if(a){var c=Editor.assetdb.remote.urlToUuid(a);Editor.assetdb.remote.existsByUuid(c)&&(o.file=Editor.assetdb.remote._fspath(a),o.custom=!1)}r()},GameMapObjectData:function(e,t,r){var o=e.addComponent(cc.TiledMap);if(!o)return Editor.warn("Add TiledMap component for node %s failed.",t.getAttribute("Name")),r(),void 0;var a="";switch(i.getPropertyOfNode(t,"Type","Default","FileData")){case"Normal":var d=i.getPropertyOfNode(t,"Path","","FileData");a=n.join(B,d)}if(a){var l=Editor.assetdb.remote.urlToUuid(a);Editor.assetdb.remote.existsByUuid(l)&&(o.tmxFile=Editor.assetdb.remote._fspath(a))}r()},SimpleAudioObjectData:function(e,t,r){var o=e.addComponent(cc.AudioSource);if(!o)return Editor.warn("Add AudioSource component for node %s failed.",t.getAttribute("Name")),r(),void 0;var a="";switch(i.getPropertyOfNode(t,"Type","Default","FileData")){case"Normal":var d=i.getPropertyOfNode(t,"Path","","FileData");a=n.join(B,d)}if(a){var l=Editor.assetdb.remote.urlToUuid(a);Editor.assetdb.remote.existsByUuid(l)&&(o.clip=Editor.assetdb.remote._fspath(a))}r()},ButtonObjectData:function(t,r,o){var n=t.addComponent(cc.Button),a=t.addComponent(cc.Sprite);if(!n)return Editor.warn("Add Button component for node %s failed.",r.getAttribute("Name")),o(),void 0;a.sizeMode=cc.Sprite.SizeMode.CUSTOM,a.trim=!1;var d=i.getBoolPropertyOfNode(r,"Scale9Enable",!1);d&&(a.type=cc.Sprite.Type.SLICED);n.interactable=i.getBoolPropertyOfNode(r,"DisplayState",!0),n.transition=cc.Button.Transition.SPRITE;var l=i.getFirstChildNodeByName(r,"NormalFileData");a.spriteFrame=W(l,c),n.normalSprite=W(l,c),n.hoverSprite=W(l,c);var p=i.getFirstChildNodeByName(r,"PressedFileData");n.pressedSprite=W(p,s);var u=i.getFirstChildNodeByName(r,"DisabledFileData");n.disabledSprite=W(u,f);var g=i.getPropertyOfNode(r,"ButtonText","");if(g){var m=new cc.Node("Label");m.setContentSize(t.getContentSize()),t.addChild(m);var N=m.addComponent(cc.Label),v=i.getIntPropertyOfNode(r,"FontSize",14),y=new cc.Color(i.getIntPropertyOfNode(r,"R",65,"TextColor"),i.getIntPropertyOfNode(r,"G",65,"TextColor"),i.getIntPropertyOfNode(r,"B",70,"TextColor")),h=i.getIntPropertyOfNode(r,"A",255,"TextColor");m.color=y,m.opacity=h,N.string=g,N._fontSize=v,N.horizontalAlign=cc.Label.HorizontalAlign.CENTER,N.verticalAlign=cc.Label.VerticalAlign.CENTER;var P=m.addComponent(cc.StudioWidget);P.isAlignVerticalCenter=!0,P.isAlignHorizontalCenter=!0;var C=i.getFirstChildNodeByName(r,"FontResource");C&&J(N,C)}if(d){for(var O=[n.normalSprite,n.pressedSprite,n.disabledSprite],b=[],S=0,F=O.length;S<F;S++){var A=O[S];A&&(b.indexOf(A._uuid)<0&&b.push(A._uuid))}if(0===b.length)return o(),void 0;var B=0;e.whilst(function(e){e(null,B<b.length)},function(e){Y(r,b[B],function(){B++,e()})},function(){o()})}else o()},TextBMFontObjectData:q,TextObjectData:q,LoadingBarObjectData:function(e,t,r){var o=e.addComponent(cc.Sprite),n=e.addComponent(cc.ProgressBar);if(!n)return Editor.warn("Add ProgressBar component for node %s failed.",t.getAttribute("Name")),r(),void 0;n.mode=cc.ProgressBar.Mode.FILLED;var a=i.getPropertyOfNode(t,"ProgressType","");n.reverse="Right_To_Left"===a,o.sizeMode=cc.Sprite.SizeMode.CUSTOM,o.trim=!1;var d=i.getFirstChildNodeByName(t,"ImageFileData");o.spriteFrame=W(d,p),o.type=cc.Sprite.Type.FILLED,o.fillType=cc.Sprite.FillType.HORIZONTAL,o.fillStart=n.reverse?1:0,n.barSprite=o,n.totalLength=1;var l=i.getIntPropertyOfNode(t,"ProgressInfo",80);n.progress=l/100,r()},TextFieldObjectData:function(e,t,r){var o=e.addComponent(cc.EditBox);if(!o)return Editor.warn("Add EditBox component for node %s failed.",t.getAttribute("Name")),r(),void 0;o._useOriginalSize=!1,o.lineHeight=0,o.placeholder=i.getPropertyOfNode(t,"PlaceHolderText",""),o.string=i.getPropertyOfNode(t,"LabelText",""),o.fontColor=new cc.Color(i.getIntPropertyOfNode(t,"R",255,"CColor"),i.getIntPropertyOfNode(t,"G",255,"CColor"),i.getIntPropertyOfNode(t,"B",255,"CColor"),i.getIntPropertyOfNode(t,"A",255,"CColor")),o.fontSize=i.getIntPropertyOfNode(t,"FontSize",20),i.getBoolPropertyOfNode(t,"MaxLengthEnable",!1)?o.maxLength=i.getIntPropertyOfNode(t,"MaxLengthText",10):o.maxLength=-1;i.getBoolPropertyOfNode(t,"PasswordEnable",!1)&&(o.inputFlag=cc.EditBox.InputFlag.PASSWORD,o.inputMode=cc.EditBox.InputMode.SINGLE_LINE);r()},PanelObjectData:K,CheckBoxObjectData:function(e,t,r){var o=e.addComponent(cc.StudioComponent);if(!o)return Editor.warn("Add StudioComponent component for node %s failed.",t.getAttribute("Name")),r(),void 0;o.type=cc.StudioComponent.ComponentType.CHECKBOX;var n=i.getFirstChildNodeByName(t,"NormalBackFileData");o.checkNormalBackFrame=W(n,"");var a=i.getFirstChildNodeByName(t,"PressedBackFileData");o.checkPressedBackFrame=W(a,"");var d=i.getFirstChildNodeByName(t,"DisableBackFileData");o.checkDisableBackFrame=W(d,"");var l=i.getFirstChildNodeByName(t,"NodeNormalFileData");o.checkNormalFrame=W(l,"");var c=i.getFirstChildNodeByName(t,"NodeDisableFileData");o.checkDisableFrame=W(c,""),o.checkInteractable=i.getBoolPropertyOfNode(t,"DisplayState",!0),o.isChecked=i.getBoolPropertyOfNode(t,"CheckedState",!1),r()},TextAtlasObjectData:function(e,t,r){var o=e.addComponent(cc.StudioComponent);if(!o)return Editor.warn("Add StudioComponent component for node %s failed.",t.getAttribute("Name")),r(),void 0;o.type=cc.StudioComponent.ComponentType.TEXT_ATLAS;var n=i.getFirstChildNodeByName(t,"LabelAtlasFileImage_CNB");o.atlasFrame=W(n,""),o.firstChar=i.getPropertyOfNode(t,"StartChar","."),o.charWidth=i.getIntPropertyOfNode(t,"CharWidth",0),o.charHeight=i.getIntPropertyOfNode(t,"CharHeight",0),o.string=i.getPropertyOfNode(t,"LabelText",""),r()},SliderObjectData:function(e,t,r){var o=e.addComponent(cc.StudioComponent);if(!o)return Editor.warn("Add StudioComponent component for node %s failed.",t.getAttribute("Name")),r(),void 0;o.type=cc.StudioComponent.ComponentType.SLIDER_BAR;var n=i.getFirstChildNodeByName(t,"BackGroundData");o.sliderBackFrame=W(n,"");var a=i.getFirstChildNodeByName(t,"ProgressBarData");o.sliderBarFrame=W(a,"");var d=i.getFirstChildNodeByName(t,"BallNormalData");o.sliderBtnNormalFrame=W(d,"");var l=i.getFirstChildNodeByName(t,"BallPressedData");o.sliderBtnPressedFrame=W(l,"");var c=i.getFirstChildNodeByName(t,"BallDisabledData");o.sliderBtnDisabledFrame=W(c,""),o.sliderInteractable=i.getBoolPropertyOfNode(t,"DisplayState",!0);var s=i.getIntPropertyOfNode(t,"PercentInfo",0);o.sliderProgress=s/100,r()},ListViewObjectData:function(e,t,r){var o=e.addComponent(cc.StudioComponent);if(!o)return Editor.warn("Add StudioComponent component for node %s failed.",t.getAttribute("Name")),r(),void 0;if(o.type=cc.StudioComponent.ComponentType.LIST_VIEW,o.listInertia=i.getBoolPropertyOfNode(t,"IsBounceEnabled",!1),"Vertical"===i.getPropertyOfNode(t,"DirectionType","")){o.listDirection=cc.StudioComponent.ListDirection.VERTICAL;let e=i.getPropertyOfNode(t,"HorizontalType","Left");e.indexOf("Center")>=0?o.listHorizontalAlign=cc.StudioComponent.HorizontalAlign.CENTER:e.indexOf("Right")>=0?o.listHorizontalAlign=cc.StudioComponent.HorizontalAlign.RIGHT:o.listHorizontalAlign=cc.StudioComponent.HorizontalAlign.LEFT}else{o.listDirection=cc.StudioComponent.ListDirection.HORIZONTAL;let e=i.getPropertyOfNode(t,"VerticalType","Top");e.indexOf("Center")>=0?o.listVerticalAlign=cc.StudioComponent.VerticalAlign.CENTER:e.indexOf("Bottom")>=0?o.listVerticalAlign=cc.StudioComponent.VerticalAlign.BOTTOM:o.listVerticalAlign=cc.StudioComponent.VerticalAlign.TOP}o.listPadding=i.getIntPropertyOfNode(t,"ItemMargin",0),K(e,t,r)},PageViewObjectData:function(e,t,r){var o=e.addComponent(cc.StudioComponent);if(!o)return Editor.warn("Add StudioComponent component for node %s failed.",t.getAttribute("Name")),r(),void 0;o.type=cc.StudioComponent.ComponentType.PAGE_VIEW,K(e,t,r)}},P={ProjectNodeObjectData:function(t,r){var a=i.getPropertyOfNode(t,"Path","","FileData"),d=o.join(I,a),l=null;e.waterfall([function(e){D(d,e)},function(e){var t=function(e,t){var r=o.dirname(e),i=o.relative(I,r),a=o.basename(e,o.extname(e));return n.join(B,i,a+t)}(d,".prefab"),r=Editor.assetdb.remote.urlToUuid(t);if(!r)return e(),void 0;cc.assetManager.loadAny(r,function(t,r){t?e():(l=cc.instantiate(r),e())})}],function(){l||(l=new cc.Node),r(l)})},ScrollViewObjectData:function(t,r){var o=new cc.Node(z(t.getAttribute("Name")));X(o,t);var n=o.addComponent(cc.ScrollView);if(!n)return Editor.warn("Add ScrollView component for node %s failed.",t.getAttribute("Name")),r(o),void 0;n.inertia=i.getBoolPropertyOfNode(t,"IsBounceEnabled",!1);var a=i.getPropertyOfNode(t,"ScrollDirectionType","Vertical");if(n.vertical=a.indexOf("Vertical")>=0,n.horizontal=a.indexOf("Horizontal")>=0,i.getBoolPropertyOfNode(t,"ClipAble",!1)){var d=o.addComponent(cc.Mask);d.enabled=!0}var l=o.getContentSize().width,c=o.getContentSize().height,s=new cc.Node("content"),f=i.getIntPropertyOfNode(t,"Width",l,"InnerNodeSize"),p=i.getIntPropertyOfNode(t,"Height",c,"InnerNodeSize");s.setContentSize(f,p),s.setAnchorPoint(0,1),s.setPosition(0,c),e.waterfall([function(e){$(o,t,e)},function(e){if(o.addChild(s),s.setPosition(U(s)),n.content=s,n.vertical){var t=Q(cc.Scrollbar.Direction.VERTICAL,"vScrollBar",o.getContentSize());o.addChild(t),n.verticalScrollBar=t.getComponent(cc.Scrollbar)}if(n.horizontal){var r=Q(cc.Scrollbar.Direction.HORIZONTAL,"hScrollBar",o.getContentSize());o.addChild(r),n.horizontalScrollBar=r.getComponent(cc.Scrollbar)}e()}],function(){r(s,o)})}},C=["GameLayerObjectData","GameNodeObjectData"],O={AnchorPoint:function(e,t){t=R(t);for(var r=[],o=[],n=i.getAllChildren(e),a=0,d=n.length;a<d;a++){var l=n[a],c=i.getIntPropertyOfNode(l,"FrameIndex",0),s=i.getFloatPropertyOfNode(l,"X",0),f=i.getFloatPropertyOfNode(l,"Y",0),p={frame:c,value:s},u={frame:c,value:f},g=V(l);g&&(p.curve=g,u.curve=g),r.push(p),o.push(u)}return t.props.anchorX=r,t.props.anchorY=o,t},Position:function(e,t,r){t=R(t);for(var o=[],n=i.getAllChildren(e),a=0,d=n.length;a<d;a++){var l=n[a],c=i.getIntPropertyOfNode(l,"FrameIndex",0),s=i.getFloatPropertyOfNode(l,"X",0),f=i.getFloatPropertyOfNode(l,"Y",0),p=U(r,cc.v2(s,f)),u={frame:c,value:[p.x,p.y]},g=V(l);g&&(u.curve=g),o.push(u)}return t.props.position=o,t},RotationSkew:function(e,t){t=R(t);for(var r=[],o=i.getAllChildren(e),n=0,a=o.length;n<a;n++){var d=o[n],l=i.getIntPropertyOfNode(d,"FrameIndex",0),c=i.getFloatPropertyOfNode(d,"X",0),s={frame:l,value:c},f=V(d);f&&(s.curve=f),r.push(s)}return t.props.rotation=r,t},Scale:function(e,t){t=R(t);for(var r=[],o=[],n=i.getAllChildren(e),a=0,d=n.length;a<d;a++){var l=n[a],c=i.getIntPropertyOfNode(l,"FrameIndex",0),s=i.getFloatPropertyOfNode(l,"X",0),f=i.getFloatPropertyOfNode(l,"Y",0),p={frame:c,value:s},u={frame:c,value:f},g=V(l);g&&(p.curve=g,u.curve=g),r.push(p),o.push(u)}return t.props.scaleX=r,t.props.scaleY=o,t},CColor:function(e,t){t=R(t);for(var r=[],o=i.getAllChildren(e),n=0,a=o.length;n<a;n++){var d=o[n],l=i.getIntPropertyOfNode(d,"FrameIndex",0),c={frame:l,value:new cc.Color(i.getIntPropertyOfNode(d,"R",255,"Color"),i.getIntPropertyOfNode(d,"G",255,"Color"),i.getIntPropertyOfNode(d,"B",255,"Color"),255)},s=V(d);s&&(c.curve=s),r.push(c)}return t.props.color=r,t},Alpha:function(e,t){t=R(t);for(var r=[],o=i.getAllChildren(e),n=0,a=o.length;n<a;n++){var d=o[n],l=i.getIntPropertyOfNode(d,"FrameIndex",0),c={frame:l,value:i.getIntPropertyOfNode(d,"Value",255)},s=V(d);s&&(c.curve=s),r.push(c)}return t.props.opacity=r,t},VisibleForFrame:function(e,t){t=R(t);for(var r=[],o=i.getAllChildren(e),n=0,a=o.length;n<a;n++){var d=o[n],l=i.getIntPropertyOfNode(d,"FrameIndex",0),c={frame:l,value:i.getBoolPropertyOfNode(d,"Value",!0)};r.push(c)}return t.props.active=r,t},FileData:function(e,t,r){if(!r)return t;if(r.getComponent(cc.Sprite)){t=function(e,t){e||(e={});e.comps||(e.comps={});e.comps[t]||(e.comps[t]={});return e}(t,"cc.Sprite");for(var o=[],n=i.getAllChildren(e),a=0,d=n.length;a<d;a++){var l=n[a],c=i.getIntPropertyOfNode(l,"FrameIndex",0),s=i.getFirstChildNodeByName(l,"TextureFile"),f=W(s,"");if(f){var p={frame:c,value:f};o.push(p)}}t.comps["cc.Sprite"].spriteFrame=o}return t}},b=["sine","quad","cubic","quart","quint","expo","circ","elastic","back","bounce"],S=["In","Out","InOut"],F="triggerAnimationEvent";var A=[],B="",E="",I="",T={},w=[];function D(a,d){if(A.indexOf(a)>=0)return d(),void 0;if(Editor.log("Importing csd file : ",a),!r.existsSync(a))return Editor.warn("%s is not existed!",a),d(),void 0;if(!r.statSync(a).isFile())return Editor.warn("%s is not a file!",a),d(),void 0;var l=(new t).parseFromString(r.readFileSync(a,"utf-8"));if(!l)return Editor.warn("Parse %s failed.",a),d(),void 0;try{var c=l.getElementsByTagName("PropertyGroup")[0].getAttribute("Type"),s=l.getElementsByTagName("Content")[0];s=i.getFirstChildNodeByName(s,"Content")}catch(e){return Editor.warn("Parse %s failed.",a),d(),void 0}if(!s||!c)return Editor.warn("Parse %s failed.",a),d(),void 0;var f=null,p=null;switch(c){case"Scene":f=x(a,".fire"),p=_;break;case"Node":case"Layer":f=x(a,".prefab"),p=L}if(!p)return d(),void 0;e.waterfall([function(e){T={},p(s,a,function(t){if(t){var n=o.dirname(f);r.existsSync(n)||r.mkdirsSync(n),r.writeFileSync(f,t)}e()})},function(e){var t=o.relative(E,f),r=n.join(B,t);Editor.assetdb.import([f],n.dirname(r),!1,function(t,r){A.push(a);var o=r[0];if("prefab"===o.type){var n={target:o,node:null};cc.assetManager.loadAny(o.uuid,(t,r)=>{if(t)return e();n.node=cc.instantiate(r),n.node.getComponentsInChildren(cc.StudioComponent.PlaceHolder).length>0&&w.push(n),e()})}else e()})}],d)}function x(e,t){var r=o.dirname(e),n=o.relative(I,r),i=o.basename(e,o.extname(e));return o.join(E,n,i+t)}function z(e){var t=e;return e&&(t=e.replace(y,"_"))!==e&&Editor.warn('The name of node "%s" contains illegal characters. It was renamed to "%s".',e,t),t}function _(e,t,r){var o=new cc.SceneAsset,n=new cc.Scene,i=new cc.Node("Scene");i.setAnchorPoint(0,0),n.addChild(i);var a=new cc.Node("Canvas");a.addComponent(cc.Canvas),i.addChild(a);var d=new cc.Node("Main Camera");d.addComponent(cc.Camera),a.addChild(d),M(i,e,t,function(){o.scene=n,r(Editor.serialize(o))})}function L(e,t,r){var o=new cc.Node;M(o,e,t,function(){var e=Editor.require("scene://utils/prefab").createPrefabFrom(o);r(Editor.serialize(e))})}function M(t,a,d,l){e.waterfall([function(r){var o=i.getFirstChildNodeByName(a,"ObjectData");(function t(r,o,a,d){var l=r;var c=!1;var s="";e.waterfall([function(e){if(r)e();else{c=!0;var t=o.getAttribute("ctype");if("ProjectNodeObjectData"===t){r=new cc.Node;var a=i.getPropertyOfNode(o,"Path","","FileData"),d=a.replace(".csd",".prefab"),s=n.join(B,d),f=r.addComponent(cc.StudioComponent.PlaceHolder);return f._baseUrl=s,l=r,e(),void 0}var p=P[t];p?p(o,function(t,o){r=t,l=o||r,e()}):(r=new cc.Node,l=r,e())}},function(e){if(c){var t=i.getPropertyOfNode(o,"ActionTag","");t&&(a&&(s+=a+"/"),s+=z(o.getAttribute("Name")),T[t]={nodePath:s,node:l})}(function(e,t,r){var o=t.getAttribute("ctype");"ScrollViewObjectData"!==o&&X(e,t);e.active=i.getBoolPropertyOfNode(t,"VisibleForFrame",!0),i.getBoolPropertyOfNode(t,"TouchEnable",!1)&&e.addComponent(cc.BlockInputEvents);(function(e,t){var r=i.getPropertyOfNode(t,"HorizontalEdge",""),o=i.getBoolPropertyOfNode(t,"PercentWidthEnable",!1),n=i.getBoolPropertyOfNode(t,"PercentWidthEnabled",!1),a=i.getBoolPropertyOfNode(t,"PositionPercentXEnabled",!1),d=i.getBoolPropertyOfNode(t,"StretchWidthEnable",!1),l=i.getFloatPropertyOfNode(t,"X",0,"PrePosition");a&&(a=0!==l);var c=i.getPropertyOfNode(t,"VerticalEdge",""),s=i.getBoolPropertyOfNode(t,"PercentHeightEnable",!1),f=i.getBoolPropertyOfNode(t,"PercentHeightEnabled",!1),p=i.getBoolPropertyOfNode(t,"PositionPercentYEnabled",!1),u=i.getBoolPropertyOfNode(t,"StretchHeightEnable",!1),g=i.getFloatPropertyOfNode(t,"Y",0,"PrePosition");if(p&&(p=0!==g),r||o||n||a||d||c||s||f||p||u){var m=e.addComponent(cc.StudioWidget);if(!m)return Editor.warn("Add Widget component for node %s failed.",t.getAttribute("Name")),void 0;var N=e.getAnchorPoint(),v=i.getFloatPropertyOfNode(t,"X",0,"PreSize"),y=i.getFloatPropertyOfNode(t,"LeftMargin",0),h=i.getFloatPropertyOfNode(t,"RightMargin",0),P=l-v*N.x,C=1-l-v*(1-N.x),O=o||n||d;r.indexOf("Left")>=0?(I(!a),O&&T(!1)):r.indexOf("Right")>=0?(T(!a),O&&I(!1)):r.indexOf("Both")>=0?(I(!O&&!a),T(!O&&!a)):O?(I(!1),T(!1)):a&&I(!1);var b=i.getFloatPropertyOfNode(t,"Y",0,"PreSize"),S=i.getFloatPropertyOfNode(t,"TopMargin",0),F=i.getFloatPropertyOfNode(t,"BottomMargin",0),A=g-b*N.y,B=1-g-b*(1-N.y),E=s||f||u;c.indexOf("Bottom")>=0?(w(!p),E&&D(!1)):c.indexOf("Top")>=0?(D(!p),E&&w(!1)):c.indexOf("Both")>=0?(w(!E&&!p),D(!E&&!p)):p&&w(!1)}function I(e){m.isAlignLeft=!0,m.isAbsoluteLeft=e,m.left=e?y:P}function T(e){m.isAlignRight=!0,m.isAbsoluteRight=e,m.right=e?h:C}function w(e){m.isAlignBottom=!0,m.isAbsoluteBottom=e,m.bottom=e?F:A}function D(e){m.isAlignTop=!0,m.isAbsoluteTop=e,m.top=e?S:B}})(e,t),o&&h[o]?h[o](e,t,r):r()})(r,o,e)},function(n){var a=o.getElementsByTagName("Children");if(!a||0===a.length)return n(),void 0;for(var d=(a=a[0]).childNodes,l=[],c=0,f=d.length;c<f;c++){var p=d[c];i.shouldIgnoreNode(p)||l.push(p)}if(0===l.length)return n(),void 0;var u=0;e.whilst(function(e){e(null,u<l.length)},function(e){t(null,l[u],s,function(t){r.addChild(t),t.getParent()&&t.setPosition(U(t)),u++,e()})},function(){n()})}],function(){d(l)})})(t,o,"",function(){r()})},function(l){(function(t,a,d,l){var c=i.getFirstChildNodeByName(a,"Animation");if(!c)return l(),void 0;var s=i.getChildNodesByName(c,"Timeline");if(!s||0===s.length)return l(),void 0;var f=function(e){var t=o.dirname(e),r=o.relative(I,t),i=o.basename(e,o.extname(e))+N;return n.join(B,r,i),o.join(E,r,i)}(d);r.existsSync(f)||r.mkdirsSync(f);var p=i.getIntPropertyOfNode(c,"Duration",0),u=i.getFloatPropertyOfNode(c,"Speed",0),g=o.basename(d,o.extname(d)),m=[{name:g,startIndex:0,endIndex:p}],y=0,h=0,P=i.getFirstChildNodeByName(a,"AnimationList");if(P){var C=i.getChildNodesByName(P,"AnimationInfo");if(C&&C.length>0){var b=1;for(y=0,h=C.length;y<h;y++){var S=C[y],F=i.getPropertyOfNode(S,"Name","");if(F){F.toLowerCase()===m[0].name.toLowerCase()&&(m[0].name=g+b,b++);var A=i.getIntPropertyOfNode(S,"StartIndex",0),w=i.getIntPropertyOfNode(S,"EndIndex",p);m.push({name:F,startIndex:A,endIndex:w})}}}}var D={},x=[];for(y=0,h=s.length;y<h;y++){var z=s[y],_=i.getPropertyOfNode(z,"ActionTag",""),L=T[_];if(L){var M=L.nodePath;if(M){var H=i.getPropertyOfNode(z,"Property","");if("FrameEvent"===H)x=k(z,x);else{var R=O[H];if(!R&&""!==H){Editor.warn('Action for property "%s" is not supported.',H);continue}D[M]=R(z,D[M],L.node)}}}}var V=o.dirname(f),U=o.relative(E,V),X=n.join(B,U),W=[];for(y=0,h=m.length;y<h;y++){var Y=m[y],G=Y.name+".anim",q=o.join(f,G),Z=j(Y,D,x);Z.speed=u,Z.sample=v,Z._name=Y.name,Z._duration=(Y.endIndex-Y.startIndex)/v;var J=Editor.serialize(Z);r.writeFileSync(q,J),W.push(n.join(X,o.basename(f),G))}e.waterfall([function(e){Editor.assetdb.import([f],X,!1,function(){e()})},function(e){var r=t.addComponent(cc.Animation);if(r){for(y=0,h=W.length;y<h;y++){var o=W[y],i=Editor.assetdb.remote.urlToUuid(o);if(i){var a=new cc.AnimationClip;a._uuid=i,a._name=n.basenameNoExt(o),r.addClip(a)}}e()}else Editor.warn("Add Animation component failed."),e()}],l)})(t,a,d,l)}],l)}function j(e,t,r){var o=new cc.AnimationClip,n=e.startIndex,i=e.endIndex,a={};for(var d in t)if(t.hasOwnProperty(d)){var l={},c=t[d],s=c.props;if(s){var f={};for(var p in s)s.hasOwnProperty(p)&&(f[p]=H(s[p],n,i));l.props=f}var u=c.comps;if(u){var g=null;for(var m in u)if(u.hasOwnProperty(m)){var N=null,v=u[m];for(var y in v)if(v.hasOwnProperty(y)){var h=H(v[y],n,i);h.length>0&&(N||(N={}),N[y]=h)}N&&(g||(g={}),g[m]=N)}g&&(l.comps=g)}a[d]=l}return o.curveData={paths:a},o.events=H(r,n,i),o}function H(e,t,r){for(var o=[],n=0,i=e.length;n<i;n++){let i=e[n],d=i.frame;if(d<t||d>r)continue;let l={};for(var a in i)i.hasOwnProperty(a)&&("frame"===a?l.frame=(d-t)/v:l[a]=i[a]);o.push(l)}return o}function R(e){return e||(e={}),e.props||(e.props={}),e}function V(e){var t=i.getIntPropertyOfNode(e,"Type",0,"EasingData");if(0===t)return null;var r=null;if(-1===t){var o=i.getFirstChildNodeByName(e,"EasingData"),n=i.getFirstChildNodeByName(o,"Points"),a=i.getChildNodesByName(n,"PointF");r=[i.getFloatPropertyOfNode(a[1],"X","0"),i.getFloatPropertyOfNode(a[1],"Y","0"),i.getFloatPropertyOfNode(a[2],"X","0"),i.getFloatPropertyOfNode(a[2],"Y","0")]}else{var d=Math.floor((t-1)/3),l=(t-1)%3;d<b.length&&(r=b[d]+S[l])}return r}function k(e,t){for(var r=i.getAllChildren(e),o=0,n=r.length;o<n;o++){var a=r[o],d=i.getIntPropertyOfNode(a,"FrameIndex",0),l=i.getPropertyOfNode(a,"Value",""),c={frame:d,func:F};l&&(c.params=[l]),t.push(c)}return t}function U(e,t){t||(t=e.getPosition());var r=e.getParent();if(!r)return t;var o=r.getAnchorPoint(),n=r.getContentSize(),i=t.x-n.width*o.x,a=t.y-n.height*o.y;return cc.v2(i,a)}function X(e,t){var r=t.getAttribute("ctype");if(e.setName(z(t.getAttribute("Name"))),e.setContentSize(i.getFloatPropertyOfNode(t,"X",0,"Size"),i.getFloatPropertyOfNode(t,"Y",0,"Size")),"GameLayerObjectData"===r&&e.setAnchorPoint(0,0),C.indexOf(r)<0){e.active=i.getBoolPropertyOfNode(t,"VisibleForFrame",!0),e.setAnchorPoint(i.getFloatPropertyOfNode(t,"ScaleX",0,"AnchorPoint"),i.getFloatPropertyOfNode(t,"ScaleY",0,"AnchorPoint")),e.setPosition(i.getFloatPropertyOfNode(t,"X",0,"Position"),i.getFloatPropertyOfNode(t,"Y",0,"Position"));var o=i.getFloatPropertyOfNode(t,"ScaleX",1,"Scale"),n=i.getFloatPropertyOfNode(t,"ScaleY",1,"Scale"),a=i.getBoolPropertyOfNode(t,"FlipX",!1),d=i.getBoolPropertyOfNode(t,"FlipY",!1);o=a?-1*o:o,n=d?-1*n:n,e.setScale(o,n);let l=i.getFloatPropertyOfNode(t,"RotationSkewX",0),c=i.getFloatPropertyOfNode(t,"RotationSkewY",0);l===c?e.angle=l:(e.is3DNode=!0,e.eulerAngles=cc.v3(l,c,0)),"TextFieldObjectData"!==r&&"ScrollViewObjectData"!==r&&(e.color=new cc.Color(i.getIntPropertyOfNode(t,"R",255,"CColor"),i.getIntPropertyOfNode(t,"G",255,"CColor"),i.getIntPropertyOfNode(t,"B",255,"CColor")),e.opacity=i.getIntPropertyOfNode(t,"Alpha",255))}}function W(e,t){if(!e&&!t)return null;let r=function(e,t){var r=t;if(e){var o=i.getPropertyOfNode(e,"Type","Default"),a=i.getPropertyOfNode(e,"Path","");switch(o){case"PlistSubImage":var d=i.getPropertyOfNode(e,"Plist","");if(d&&a){var l=n.join(B,d);r=n.join(l,a.replace(y,"-"))}break;case"MarkedSubImage":case"Normal":a&&(r=n.join(B,a),r=n.join(r,n.basenameNoExt(r)))}}let c=Editor.assetdb.remote.urlToUuid(r);return r&&c?c:null}(e,t);if(!r)return Editor.warn("Failed to import spriteframe asset, asset info: "+e+", uuid: "+r),null;if(!Editor.assetdb.remote.existsByUuid(r))return Editor.warn("Failed to import spriteframe asset, asset info: "+e+", url: "+t),null;var o=new cc.SpriteFrame;return o._uuid=r,o}function Y(e,t,r){Editor.assetdb.queryMetaInfoByUuid(t,function(o,n){if(!n)return r(),void 0;var d=JSON.parse(n.json),l=i.getIntPropertyOfNode(e,"Scale9OriginX",0),c=i.getIntPropertyOfNode(e,"Scale9OriginY",0),s=i.getIntPropertyOfNode(e,"Scale9Width",d.rawWidth),f=i.getIntPropertyOfNode(e,"Scale9Height",d.rawHeight);d.trimThreshold=-1,d.borderTop=c,d.borderBottom=d.rawHeight-c-f,d.borderBottom<0&&(d.borderBottom=0),d.borderLeft=l,d.borderRight=d.rawWidth-l-s,d.borderRight<0&&(d.borderRight=0);var p=JSON.stringify(d);n.assetUrl.startsWith(a)?r():Editor.assetdb.saveMeta(t,p,function(){r()})})}function G(e,t,r,o){var n=e.addComponent(cc.Sprite);if(!n)return Editor.warn("Add sprite component for node %s failed.",t.getAttribute("Name")),o;var a=i.getIntPropertyOfNode(t,"Src",cc.macro.BlendFactor.SRC_ALPHA,"BlendFunc");n.srcBlendFactor=1===a?cc.macro.BlendFactor.SRC_ALPHA:a,n.dstBlendFactor=i.getIntPropertyOfNode(t,"Dst",cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA,"BlendFunc");var d=i.getFirstChildNodeByName(t,"FileData");n.sizeMode=r,n.trim=!1,n.spriteFrame=W(d,""),o()}function q(t,r,o){var n=t.addComponent(cc.Label);if(!n)return Editor.warn("Add Label component for node %s failed.",r.getAttribute("Name")),o(),void 0;switch(i.getBoolPropertyOfNode(r,"IsCustomSize",!1)&&(n.overflow=cc.Label.Overflow.CLAMP,n._useOriginalSize=!1),n.string=i.getPropertyOfNode(r,"LabelText",""),n.lineHeight=0,i.getPropertyOfNode(r,"HorizontalAlignmentType","")){case"HT_Right":n.horizontalAlign=cc.Label.HorizontalAlign.RIGHT;break;case"HT_Center":n.horizontalAlign=cc.Label.HorizontalAlign.CENTER;break;default:n.horizontalAlign=cc.Label.HorizontalAlign.LEFT}switch(i.getPropertyOfNode(r,"VerticalAlignmentType","")){case"VT_Bottom":n.verticalAlign=cc.Label.VerticalAlign.BOTTOM;break;case"VT_Center":n.verticalAlign=cc.Label.VerticalAlign.CENTER;break;default:n.verticalAlign=cc.Label.VerticalAlign.TOP}var a=i.getFirstChildNodeByName(r,"LabelBMFontFile_CNB"),d=i.getFirstChildNodeByName(r,"FontResource");e.waterfall([function(e){a?J(n,a,e):d?J(n,d,e):e()},function(e){var t=i.getIntPropertyOfNode(r,"FontSize",-1);t>=0?(n._fontSize=t,e()):a?Z(a,(t,r)=>{!t&&r||e();var o=r._fntConfig;n._fontSize=o.fontSize,n.lineHeight=o.commonHeight,e()}):e()}],o)}function Z(e,t){var r=n.join(B,i.getPropertyOfNode(e,"Path","")),o=!1;if(r){var a=Editor.assetdb.remote.urlToUuid(r);Editor.assetdb.remote.existsByUuid(a)&&(o=!0)}o?cc.assetManager.loadAny(a,t):t&&t(null,null)}function J(e,t,r){if(!e||!t)return r&&r(),void 0;Z(t,(t,o)=>{t&&Editor.error(t),e.font=o||null,r&&r()})}function K(e,t,r){i.getBoolPropertyOfNode(t,"ClipAble",!1)&&(e.addComponent(cc.Mask).enabled=!0);$(e,t,r)}function $(t,r,o){var n=t.getContentSize().width,a=t.getContentSize().height,l=i.getFirstChildNodeByName(r,"FileData"),c=i.getIntPropertyOfNode(r,"ComboBoxIndex",0),s=null;e.waterfall([function(e){if(l){let n=(s=new cc.Node("background")).addComponent(cc.Sprite);n.trim=!1;var o=W(l,m);if(!o)return e();i.getBoolPropertyOfNode(r,"Scale9Enable",!1)?(s.setContentSize(t.getContentSize()),n.sizeMode=cc.Sprite.SizeMode.CUSTOM,n.type=cc.Sprite.Type.SLICED,n.spriteFrame=o,Y(r,o._uuid,e)):(n.spriteFrame=o,e())}else if(1===c){(s=new cc.Node("background")).setContentSize(n,a);let t=s.addComponent(cc.Sprite);t.sizeMode=cc.Sprite.SizeMode.CUSTOM,t.trim=!1,t.spriteFrame=new cc.SpriteFrame,t.spriteFrame._uuid=Editor.assetdb.remote.urlToUuid(d),s.color=new cc.Color(i.getIntPropertyOfNode(r,"R",255,"SingleColor"),i.getIntPropertyOfNode(r,"G",255,"SingleColor"),i.getIntPropertyOfNode(r,"B",255,"SingleColor")),s.opacity=i.getIntPropertyOfNode(r,"BackColorAlpha",255),e()}else e()},function(e){if(s){t.addChild(s);let e=s.addComponent(cc.StudioWidget);e.isAlignHorizontalCenter=!0,e.isAlignVerticalCenter=!0}e()}],o)}function Q(e,t,r){var o=new cc.Node(t),n=o.addComponent(cc.Scrollbar);n.direction=e;var i=o.addComponent(cc.StudioWidget);i.isAlignRight=!0,i.isAlignBottom=!0,i.isAlignTop=e===cc.Scrollbar.Direction.VERTICAL,i.isAlignLeft=e===cc.Scrollbar.Direction.HORIZONTAL;var a=new cc.Node("bar");o.addChild(a);var d=a.addComponent(cc.Sprite);return d.type=cc.Sprite.Type.SLICED,d.trim=!1,d.sizeMode=cc.Sprite.SizeMode.CUSTOM,d.spriteFrame=new cc.SpriteFrame,e===cc.Scrollbar.Direction.HORIZONTAL?(o.setContentSize(r.width,15),a.setContentSize(.7*r.width,15),d.spriteFrame._uuid=Editor.assetdb.remote.urlToUuid(g)):(o.setContentSize(15,r.height),a.setContentSize(15,.7*r.height),d.spriteFrame._uuid=Editor.assetdb.remote.urlToUuid(u)),n.handle=d,o}module.exports={importCSDFiles:function(t,o,n,i,a){I=o,E=n,B=i,w=[];var d=0;e.whilst(function(e){e(null,d<t.length)},function(e){D(t[d],function(){d++,e()})},function(){(function(t){let o=Editor.require("scene://utils/prefab");e.eachSeries(w,(t,n)=>{var i=t.node,a=i.getComponentsInChildren(cc.StudioComponent.PlaceHolder);e.eachSeries(a,(e,r)=>{Editor.log(`handle placeHolder Prefab -> ${t.target.url}`);var o=Editor.assetdb.remote.urlToUuid(e._baseUrl);e.nestedPrefab=Editor.serialize.asAsset(o)||null,e.nestedPrefab||Editor.warn("Unable to find %s resource.",e._baseUrl),r()},e=>{e&&Editor.error(e);var a=o.createPrefabFrom(i),d=Editor.serialize(a);r.writeFileSync(t.target.path,d),Editor.assetdb.refresh(t.target.url,()=>{n()})})},e=>{e&&Editor.error(e),t()})})(a)})}};