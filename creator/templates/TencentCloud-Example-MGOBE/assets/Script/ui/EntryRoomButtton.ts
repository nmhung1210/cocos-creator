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
export default class EntryRoomButtton extends cc.Component {

    @property(cc.Node)
    buttonNode: cc.Node = null;

    @property(cc.Node)
    inputNode: cc.Node = null;

    @property(cc.Button)
    submitButton: cc.Button = null;

    @property(cc.Button)
    cancelButton: cc.Button = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    public showInput() {
        this.inputNode.active = true;
        this.buttonNode.active = false;
    }

    public closeInput() {
        this.inputNode.active = false;
        this.buttonNode.active = true;
    }

    public setEnable(isEnabled: boolean) {
        this.closeInput();
        this.buttonNode.children[1].color = isEnabled ? new cc.Color(255, 255, 255) : new cc.Color(107, 110, 120);
        this.buttonNode.children[2].opacity = isEnabled ? 255 : 76;
    }

    // 提交请求回调函数
    public onSubmit: (value: string) => any = null;
    // 按钮点击回调函数
    public onButtonClick: () => any = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.closeInput();
        this.cancelButton && this.cancelButton.node.on(cc.Node.EventType.TOUCH_START, () => this.closeInput());
        this.submitButton && this.submitButton.node.on(cc.Node.EventType.TOUCH_START, () => this.onSubmit && this.onSubmit(this.editBox.string));
        this.buttonNode.on(cc.Node.EventType.TOUCH_START, () => this.onButtonClick && this.onButtonClick());
    }

    // update (dt) {}
}
