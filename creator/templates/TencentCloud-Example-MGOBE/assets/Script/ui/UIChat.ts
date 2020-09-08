import UIMessage from "./UIMessage";

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
export default class UIChat extends cc.Component {

    @property(cc.Prefab)
    msgRightPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    msgLeftPrefab: cc.Prefab = null;

    @property(cc.Node)
    scrollContentNode: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Button)
    sendButton: cc.Button = null;

    @property(cc.EditBox)
    msgEditBox: cc.EditBox = null;

    // 提交消息，需要使用 SDK 实现消息发送
    public onSubmit: (msg: string) => any = null;

    // 添加聊天消息到视图
    public appendMsg(msg: string, isMyMsg: boolean) {
        const prefab = isMyMsg ? this.msgRightPrefab : this.msgLeftPrefab;
        const node = cc.instantiate(prefab) as cc.Node;
        node.parent = this.scrollContentNode;

        (node.getComponent(UIMessage) as UIMessage).setMessage(msg);
    }

    // 刷新聊天页面
    private refreshMsgItems() {
        const padding = 10;
        let offset = 30;

        this.scrollContentNode.children.forEach(node => {
            node.y = - offset;
            offset += (node.height + padding);
        });

        if (this.scrollContentNode.height !== offset) {
            this.scrollContentNode.height = offset;
            this.scrollView.scrollToBottom();
        }
    }

    // 发送按钮回调函数
    private callback() {
        const msg = this.msgEditBox.string || "";
        this.onSubmit && this.onSubmit(msg);
        this.msgEditBox.string = "";
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.sendButton.node.off(cc.Node.EventType.TOUCH_START, this.callback, this);
        this.sendButton.node.on(cc.Node.EventType.TOUCH_START, this.callback, this);
    }

    update(dt) {
        this.refreshMsgItems();
    }
}
