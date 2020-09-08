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
export default class Dialog extends cc.Component {

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property(cc.Label)
    contentLabel: cc.Label = null;

    @property(cc.Button)
    confirmButton: cc.Button = null;

    @property(cc.Button)
    cancelButton: cc.Button = null;

    // 确认按钮回调函数
    public static onConfirm: () => any = null;
    // 取消按钮回调函数
    public static onCancel: () => any = null;

    // 对话框标题
    public static title: string = "";
    // 对话框内容
    public static content: string = "";

    private static isOpen: boolean = false;
    private static node: cc.Node = null;

    // 打开对话框
    public static open(title: string, content: string, onConfirm?: () => any, onCancel?: () => any) {
        Dialog.onConfirm = onConfirm || null;
        Dialog.onCancel = onCancel || null;
        Dialog.isOpen = true;
        Dialog.title = title;
        Dialog.content = content;
        Dialog.node && (Dialog.node.active = true);
    }

    // 关闭对话框
    public static close() {
        Dialog.onConfirm = null;
        Dialog.onCancel = null;
        Dialog.isOpen = false;
        Dialog.title = "";
        Dialog.content = "";
        Dialog.node && (Dialog.node.active = false);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        Dialog.node = this.node;

        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
            if (event.target !== this.confirmButton.node && event.target !== this.cancelButton.node) {
                event.stopPropagation(); 
            }
        }, this, true);

        this.confirmButton.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
            Dialog.onConfirm && Dialog.onConfirm();
            Dialog.close();
        });

        this.cancelButton.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
            Dialog.onCancel && Dialog.onCancel();
            Dialog.close();
        });
    }

    update(dt) {
        this.titleLabel && this.titleLabel.string !== Dialog.title && (this.titleLabel.string = Dialog.title);
        this.contentLabel && this.contentLabel.string !== Dialog.content && (this.contentLabel.string = Dialog.content);
        this.node && (this.node.active = Dialog.isOpen);
    }
}
