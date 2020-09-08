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
export default class ReadOnlyEditor extends cc.Component {

    private value: string = "";
    private editor: cc.EditBox = null;

    public setValue(value: string) {
        this.value = value;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.editor = this.node.getComponent(cc.EditBox);
    }

    update(dt) {
        this.editor.string = this.value;
    }
}
