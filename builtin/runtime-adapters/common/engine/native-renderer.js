if (CC_JSB && CC_NATIVERENDERER) {
    require('./scene/camera.js');

    require('./scene/node-proxy.js');

    require('./scene/render-flow.js'); // must be required after render flow


    require('./scene/node.js');

    require('./scene/render-handle.js');

    require('./scene/custom-render-handle.js');

    require('./jsb-dragonbones.js');

    require('./jsb-spine-skeleton.js');

    require('./jsb-particle.js');

    require('./scene/graphics-render-handle.js');

    require('./scene/mask-render-handle.js');

    cc.game.on(cc.game.EVENT_ENGINE_INITED, function () {
        require('./assemblers/flex-buffer.js'); // Assemblers


        require('./assemblers/sprite/index.js');

        require('./assemblers/sprite/simple.js');

        require('./assemblers/sprite/sliced.js');

        require('./assemblers/sprite/tiled.js');

        require('./assemblers/sprite/bar-filled.js');

        require('./assemblers/sprite/radial-filled.js');

        require('./assemblers/label/index.js');

        require('./assemblers/label/ttf.js');

        require('./assemblers/label/bmfont.js');

        if (cc.Graphics) {
            require('./assemblers/graphics/impl.js');

            require('./assemblers/graphics/index.js');

            require('./assemblers/mask-assembler.js');
        }
    });
}
