interface BroadcastCallbacks {
    onJoinRoom?,
    onLeaveRoom?,
    onChangeRoom?,
    onDismissRoom?,
    onStartFrameSync?,
    onStopFrameSync?,
    onRecvFrame?,
    onChangeCustomPlayerStatus?,
    onRemovePlayer?,
    onRecvFromClient?,
    onRecvFromGameSvr?,
    onAutoRequestFrameError?,
}