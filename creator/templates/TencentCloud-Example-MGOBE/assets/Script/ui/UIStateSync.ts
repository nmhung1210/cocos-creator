import UIMap from "./UIMap";
import global from "../global";
import config from "../config";
import { stateSyncState, setDefauleSyncState } from "../logic/StateSyncLogic";

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
export default class UIStateSync extends cc.Component {

    @property(cc.Button)
    upButton: cc.Button = null;

    @property(cc.Button)
    downButton: cc.Button = null;

    @property(cc.Button)
    leftButton: cc.Button = null;

    @property(cc.Button)
    rightButton: cc.Button = null;

    @property(UIMap)
    map: UIMap = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    // 上、下、左、右（发送实时服务器消息） 回调函数
    // 需要使用 SDK 实现请求
    public onUp: () => any = null;
    public onDown: () => any = null;
    public onLeft: () => any = null;
    public onRight: () => any = null;

    public setTips(tips: string) {
        this.tipsLabel.string = tips;
    }

    public setMapSize(w?: number, h?: number) {
        const mW = typeof w !== "number" ? this.map.w : w;
        const mH = typeof h !== "number" ? this.map.h : h;

        this.map.setMapSize(mW, mH);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.upButton.node.off(cc.Node.EventType.TOUCH_START, this.onUpButtonClick, this);
        this.downButton.node.off(cc.Node.EventType.TOUCH_START, this.onDownButtonClick, this);
        this.leftButton.node.off(cc.Node.EventType.TOUCH_START, this.onLeftButtonClick, this);
        this.rightButton.node.off(cc.Node.EventType.TOUCH_START, this.onRightButtonClick, this);

        this.upButton.node.on(cc.Node.EventType.TOUCH_START, this.onUpButtonClick, this);
        this.downButton.node.on(cc.Node.EventType.TOUCH_START, this.onDownButtonClick, this);
        this.leftButton.node.on(cc.Node.EventType.TOUCH_START, this.onLeftButtonClick, this);
        this.rightButton.node.on(cc.Node.EventType.TOUCH_START, this.onRightButtonClick, this);

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.setTips("");
        setDefauleSyncState(global.room);
    }

    update(dt) {
        const tips = "更改自定义逻辑步骤：" + "\n" +
            "（1）在DEMO首页将游戏ID、Key替换为您的私有ID、Key" + "\n" +
            "（2）在项目serverless\\mgobe-server\\mgobexs\\src\\mgobexs下修改和编译您的服务端逻辑" + "\n" +
            "（3）在IDE的服务面板—MGOBE—实时服务器下，点击“立即发布”，并按指引进行后续操作";

        this.setTips(tips);

        // 更新表现层
        this.map.setPlayers(stateSyncState.players);
    }

    onUpButtonClick() {
        this.onUp && this.onUp();
    }

    onDownButtonClick() {
        this.onDown && this.onDown();
    }

    onLeftButtonClick() {
        this.onLeft && this.onLeft();
    }

    onRightButtonClick() {
        this.onRight && this.onRight();
    }

    onKeyDown(event) {
        switch (event && event.keyCode) {
            case 87: return this.onUpButtonClick();
            case 83: return this.onDownButtonClick();
            case 65: return this.onLeftButtonClick();
            case 68: return this.onRightButtonClick();
        }
    }
}
