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
export default class NewClass extends cc.Component {

    @property(cc.Node)
    backBtn: cc.Node = null;

    @property
    backScene: string = '';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // 设置返回按钮跳转的场景
        if (!!this.backScene) {
            this.backBtn.on(cc.Node.EventType.TOUCH_START, () => cc.director.loadScene(this.backScene));
        }
    }

    // update (dt) {}
}
