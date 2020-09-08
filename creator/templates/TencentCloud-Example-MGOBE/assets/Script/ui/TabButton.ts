// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TabButton extends cc.Component {

    @property(cc.Node)
    bg1Node: cc.Node = null;

    @property(cc.Node)
    bg2Node: cc.Node = null;

    public isActive: boolean = false;

    // 切换 Node 显示
    setActive(isActive: boolean) {
        this.isActive = isActive;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    update (dt) {
        this.bg1Node.active = !this.isActive;
        this.bg2Node.active = !!this.isActive;

        (this.node.getComponent(cc.Button) as cc.Button).interactable = !this.isActive;
    }
}
