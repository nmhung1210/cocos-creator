所有需要通过动态加载的资源，可以放入 resources 目录下或任何 bundle 文件夹下。bundle 文件夹与 resources 文件夹相似，构建时，bundle 文件夹内的所有资源（包括场景）以及相关的外部资源都会进行打包。加载时可先用 `cc.assetManager.loadBundle` 加载对应 bundle，之后即可使用 `bundle.load` 等方法加载 bundle 中的资源。

Bundle 可设置不同的优先级，Creator 内置了 10 个优先级可选择，编辑器构建时将会按照优先级从大到小对 bundle 进行依次构建，当同个资源被不同优先级的多个 bundle 引用时，资源会优先放在优先级高的 bundle 中，低优先级的 bundle 只会存储一条记录信息，此时低优先级的 bundle 会依赖高优先级的 bundle，请在加载低优先级 bundle 之前加载高优先级 bundle；当资源被相同优先级的多个 bundle 引用时，资源会在每个 bundle 中复制一份，此时不同 bundle 没有依赖关系，可用任意顺序加载。所以请尽量让 Texture、SpriteFrame、Audio 等共享的资源放在更高优先级的 bundle，从而让其它 bundle 可共享其资源，减小包体。

关于 Asset Bundle 的更多信息，可参考文档：
[Asset Bundle](https://docs.cocos.com/creator/manual/zh/scripting/asset-bundle.html)