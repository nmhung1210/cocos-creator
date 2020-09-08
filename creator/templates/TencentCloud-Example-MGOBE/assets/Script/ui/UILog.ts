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
export default class UILog extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Label)
    logLabel: cc.Label = null;

    @property(cc.Node)
    contentNode: cc.Node = null;

    private static staticLogStrs: string[] = ["暂无日志信息"];
    private length: number = 0;

    /**
     * 添加日志
     * @param logStr 
     */
    public static appendLog(logStr: string) {
        UILog.staticLogStrs.push(logStr);
    }

    private setLogStr(logStr: string) {
        this.logLabel.string = logStr + "\n\n";
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    update (dt) {
        this.length !== UILog.staticLogStrs.length && this.setLogStr(UILog.staticLogStrs.slice(-10).join("\n"));
        this.length = UILog.staticLogStrs.length;

        if (this.contentNode.height !== this.logLabel.node.height) {
            this.contentNode.height = this.logLabel.node.height;
            this.scrollView.scrollToBottom();
        }
    }
}
