import configs from "../config";
import * as Util from "../util";

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
export default class Home extends cc.Component {

    @property(cc.EditBox)
    gameIdEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    secretKeyEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    urlEditBox: cc.EditBox = null;

    @property(cc.Node)
    mgobeNode: cc.Node = null;

    @property(cc.Button)
    demoButton: cc.Button = null;

    @property(cc.Button)
    courseButton: cc.Button = null;

    // 首页游戏ID
    public static gameId: string = "";
    // 首页游戏Key
    public static secretKey: string = "";
    // 首页域名
    public static url: string = "";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

        Util.checkMgobe();

        if (!Home.gameId) {
            Home.gameId = configs.gameId;
            Home.secretKey = configs.secretKey;
            Home.url = configs.url;
        }

        this.gameIdEditBox.string = Home.gameId;
        this.secretKeyEditBox.string = Home.secretKey;
        this.urlEditBox.string = Home.url;

        // 案例合集
        this.demoButton.node.on(cc.Node.EventType.TOUCH_START, () => cc.director.loadScene("demo"));

        // 示例使用教程
        this.courseButton.node.on(cc.Node.EventType.TOUCH_START, () => Util.openLink("https://cloud.tencent.com/document/product/1038/37761"));

        // 体验小游戏联机对战引擎
        this.mgobeNode.on(cc.Node.EventType.TOUCH_START, () => {
            Home.gameId = this.gameIdEditBox.string;
            Home.secretKey = this.secretKeyEditBox.string;
            Home.url = this.urlEditBox.string;
            Util.checkMgobe() && cc.director.loadScene("mgobe")
        });

        // 输入框点击监听
        this.gameIdEditBox.node.on(cc.Node.EventType.TOUCH_START, () => this.showTips());
        this.secretKeyEditBox.node.on(cc.Node.EventType.TOUCH_START, () => this.showTips());
        this.urlEditBox.node.on(cc.Node.EventType.TOUCH_START, () => this.showTips());
    }

    showTips() {
        Util.appendLog("公有游戏ID下分配的资源有限额，可能会影响体验效果；建议在cocos creator内开通MGOBE服务，获取您的私有游戏ID。");
    }

    // update (dt) {}
}
