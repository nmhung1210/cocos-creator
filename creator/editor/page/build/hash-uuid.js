const r=require("xxhashjs"),t="-";module.exports.calculate=function(e,a){for(var n=r.h32(),o=[],s=0;s<e.length;s++){var i=e[s];i=i.slice().sort();for(var u=0;u<i.length;u++)n.update(i[u]);var h=n.digest().toString(16).padEnd(8,"0");o.push(h)}if(function(r){for(var e={},a=0;a<r.length;a++){var n=r[a],o=e[n];void 0===o?e[n]=1:(r[a]=n+t+o.toString(16),e[n]=o+1)}}(o),"string"==typeof a){if(a.length<2)return Editor.error("hashName string length must >= 2"),o}else if(!(a="0123456789abcdef"[a]))return Editor.error("Invalid hashName"),o;return o.map(r=>a+r)},module.exports.BuiltinHashType={PackedAssets:0,AutoAtlasTexture:1};