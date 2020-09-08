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
export default class UIPlayer extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    icon1Sprite: cc.Sprite = null;

    @property(cc.Sprite)
    icon2Sprite: cc.Sprite = null;

    public initPlayer(id: string, x = 0, y = 0) {
        if (id === MGOBE.Player.id) {
            id = "我";
            this.icon1Sprite.node.active = true;
            this.icon2Sprite.node.active = false;
        } else {
            this.icon1Sprite.node.active = false;
            this.icon2Sprite.node.active = true;
        }
        this.label.string = id;

        this.setPosition(x, y);
    }

    public setPosition(x: number, y: number) {
        this.node.x = x;
        this.node.y = y;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
