cc.game.restart = function () {
    cc.sys.restartVM();
};

__globalAdapter.onHide(function () {
    cc.game.emit(cc.game.EVENT_HIDE);
});

__globalAdapter.onShow(function () {
    cc.game.emit(cc.game.EVENT_SHOW);
});

__globalAdapter.onWindowResize && __globalAdapter.onWindowResize(function () {
    // Since the initialization of the creator engine may not take place until after the onWindowResize call,
    // you need to determine whether the canvas already exists before you can call the setCanvasSize method
    cc.game.canvas && cc.view.setCanvasSize(window.innerWidth, window.innerHeight);
});