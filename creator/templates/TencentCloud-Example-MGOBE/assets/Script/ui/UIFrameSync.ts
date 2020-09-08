import UIMap from "./UIMap";
import global from "../global";
import config from "../config";
import { frameSyncState, reCalcFrameState } from "../logic/FrameSyncLogic";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIFrameSync extends cc.Component {

    @property(cc.Button)
    startFrameButton: cc.Button = null;

    @property(cc.Button)
    stopFrameButton: cc.Button = null;

    @property(cc.Button)
    runButton: cc.Button = null;

    @property(cc.Button)
    stopButton: cc.Button = null;

    @property(UIMap)
    map: UIMap = null;

    @property(cc.Label)
    frameRateLabel: cc.Label = null;

    // 开始帧同步、停止帧同步、跑（发送帧消息）、停（发送帧消息） 回调函数
    // 需要使用 SDK 实现请求
    public onStartFrameButtonClick: () => any = null;
    public onStopFrameButtonClick: () => any = null;
    public onRunButtonClick: () => any = null;
    public onStopButtonClick: () => any = null;

    public setFrameRate(frameRate: number) {
        this.frameRateLabel.string = frameRate + "";
    }

    // 设置地图大小
    public setMapSize(w?: number, h?: number) {
        const mW = typeof w !== "number" ? this.map.w : w;
        const mH = typeof h !== "number" ? this.map.h : h;

        this.map.setMapSize(mW, mH);
    }

    public setButtonState(isStartFrame: boolean) {
        this.startFrameButton.interactable = !isStartFrame;
        this.stopFrameButton.interactable = isStartFrame;

        this.runButton.interactable = isStartFrame;
        this.stopButton.interactable = isStartFrame;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.startFrameButton.node.off(cc.Node.EventType.TOUCH_START, this.onStartFrameButtonClickCallback, this);
        this.stopFrameButton.node.off(cc.Node.EventType.TOUCH_START, this.onStopFrameButtonClickCallback, this);
        this.runButton.node.off(cc.Node.EventType.TOUCH_START, this.onRunButtonClick, this);
        this.stopButton.node.off(cc.Node.EventType.TOUCH_START, this.onStopButtonClickCallback, this);

        this.startFrameButton.node.on(cc.Node.EventType.TOUCH_START, this.onStartFrameButtonClickCallback, this);
        this.stopFrameButton.node.on(cc.Node.EventType.TOUCH_START, this.onStopFrameButtonClickCallback, this);
        this.runButton.node.on(cc.Node.EventType.TOUCH_START, this.onRunButtonClickCallback, this);
        this.stopButton.node.on(cc.Node.EventType.TOUCH_START, this.onStopButtonClickCallback, this);

        this.setFrameRate(15);

        reCalcFrameState(global.room);
    }

    update(dt) {
        // 更新表现层
        this.map.setPlayers(frameSyncState.players);
    }

    onStartFrameButtonClickCallback() {
        this.startFrameButton.interactable && this.onStartFrameButtonClick && this.onStartFrameButtonClick();
    }

    onStopFrameButtonClickCallback() {
        this.stopFrameButton.interactable && this.onStopFrameButtonClick && this.onStopFrameButtonClick();
    }

    onRunButtonClickCallback() {
        this.runButton.interactable && this.onRunButtonClick && this.onRunButtonClick();
    }

    onStopButtonClickCallback() {
        this.stopButton.interactable && this.onStopButtonClick && this.onStopButtonClick();
    }

}
