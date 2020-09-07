All assets that require dynamically loaded via `cc.resources.load`, must be placed under the `resources` folder or its subfolders.

The assets in the `resources` folder can refer to other assets outside the folder, and can also be referenced by external scenes or assets. When the project is built, all assets in the `resources` folder, along with assets outside the `resources` folder they are associated with, will be exported, in addition to the scenes that have been checked in the Build panel.

If an asset is only depended on by other assets in the `resources` and does not need to be called directly by `cc.resources.load`, then please don't put it in the `resources` folder.

For more information on resources, see the documentation:<br>
[Acquire and Load Asset - Dynamic loading of resources](https://docs.cocos.com/creator/manual/en/scripting/load-assets.html#dynamic-loading-of-resources)
