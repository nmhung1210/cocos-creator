
This is a git branch which behaves like a git mirror of NPM package [@cocos/fbx2gltf](https://www.npmjs.com/package/@cocos/fbx2gltf).
Note this is not same as NPM package [fbx2gltf](https://www.npmjs.com/package/fbx2gltf).

`@cocos/fbx2gltf` is hosted by Cocos and is used in productions of Cocos.
It contains (only) FBX2glTF binaries(built from [Cocos fork](https://github.com/cocos-creator/FBX2glTF) of [FBX2glTF](https://github.com/facebookincubator/FBX2glTF)) for Windows and MacOS and Javascript API files.
The Javascript API files are copied or modified
from those in commit https://github.com/facebookincubator/FBX2glTF/commit/37f992321eeb2d593f86371a1fe39c26a0e8467c .

## Publish a new version

Be sure you have rights to publish package to [@cocos](https://www.npmjs.com/~cocos).

Just change version number in [sync.js](sync) file and run `node ./sync.js & npm --registry https://registry.npmjs.org/ publish`.

Note, it's your responsibility to ensure `node ./sync.js` is running successfully.