let e,r,t,a=require("path"),i=require("fs-extra"),s=require("./build-jsb-adapter.js");module.exports={gatherInfo(i){e=i.cpk,t=i.options.debug,r=a.join(i.buildPath,"jsb-adapter")},async organizeResources(e){let o=a.join(r,"engine","index.js");i.emptyDirSync(r);let d=Editor.url("packages://runtime-adapters/platforms/cocos-play");return await s.build({rootPath:a.join(d,"engine","index.js"),dstPath:o,excludedModules:[],isDebug:t}),!0},pack(){e.directory(r,"jsb-adapter")}};