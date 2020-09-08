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
export default class UIMessage extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;

    private msg: string = "";
    private padding: number = 10;
    private maxLabelWidth: number = 400;

    // 设置消息字符串
    setMessage(msg: string) {
        this.msg = msg;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    update(dt) {
        if (this.label.string !== this.msg) {
            this.label.string = this.msg;
        }

        // 只有一行，消息不需要换行
        if (this.label.node.height < 30) {
            this.label.overflow = cc.Label.Overflow.NONE;
        }

        // 多行，消息需要设置为自动计算高度
        if (this.label.node.width > this.maxLabelWidth) {
            this.label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.label.node.width = this.maxLabelWidth;
        }

        // 更新消息背景的宽度
        this.bgSprite.node.width = this.label.node.width + this.padding + Math.abs(this.label.node.x - this.bgSprite.node.x);
        this.node.height = this.label.node.height + 2 * this.padding;
        this.bgSprite.node.height = this.node.height;
    }
}
