import EntryRoomButtton from "../ui/EntryRoomButtton";
import configs from "../config";
import * as Util from "../util";
import Home from "./Home";
import global from "../global";

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
export default class MgobeScene extends cc.Component {

    @property(cc.Button)
    initButton: cc.Button = null;

    @property(EntryRoomButtton)
    createRoomNode: EntryRoomButtton = null;

    @property(EntryRoomButtton)
    matchNode: EntryRoomButtton = null;

    @property(EntryRoomButtton)
    joinRoomNode: EntryRoomButtton = null;

    static cacertNativeUrl = "";
    private lockSubmit: boolean = false;
    private timer = undefined;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.initView();
        this.initListener();
    }

    initView() {
        if (!Util.isInited()) {
            this.setEnableButtons(false);
        } else {
            this.initButton.interactable = false;
            this.setEnableButtons(true);
        }
    }

    initListener() {
        // 初始化
        this.initButton.node.on(cc.Node.EventType.TOUCH_START, () => this.initSDK());

        // 创建房间
        this.createRoomNode.onButtonClick = () => this.onCreateRoomNodeClick();

        // 随机匹配
        this.matchNode.onButtonClick = () => this.onMatchNodeClick();
        this.matchNode.onSubmit = (matchCode: string) => !this.lockSubmit && this.matchPlayers(matchCode);

        // 加入房间
        this.joinRoomNode.onButtonClick = () => this.onJoinRoomNodeClick();
        this.joinRoomNode.onSubmit = (roomId: string) => !this.lockSubmit && this.joinRoom(roomId);

        // 监听房间
        global.room && (global.room.onUpdate = () => this.onRoomUpdate());
    }

    // 切换按钮显示状态
    setEnableButtons(isEnabled: boolean) {
        this.createRoomNode.setEnable(isEnabled);
        this.matchNode.setEnable(isEnabled);
        this.joinRoomNode.setEnable(isEnabled);
    }

    loadRoomScene() {
        this.lockSubmit = true;
        cc.director.loadScene("room");
    }

    onCreateRoomNodeClick() {
        if (!Util.isInited()) {
            return Util.appendLog("请先初始化 SDK");
        }

        this.setEnableButtons(true);
        !this.lockSubmit && this.createRoom();
    }

    onMatchNodeClick() {
        if (!Util.isInited()) {
            return Util.appendLog("请先初始化 SDK");
        }

        this.setEnableButtons(true);

        if (global.gameId === configs.gameId) {
            // 如果使用默认 gameId，则直接使用默认匹配 Code 发起匹配
            !this.lockSubmit && this.matchPlayers(configs.matchCode);
        } else {
            // 如果使用自定义 gameId，则需要输入匹配 Code
            this.matchNode.showInput();
        }
    }

    onJoinRoomNodeClick() {
        if (!Util.isInited()) {
            return Util.appendLog("请先初始化 SDK");
        }

        this.setEnableButtons(true);
        this.joinRoomNode.showInput();
    }

    onRoomUpdate() {
        if (global.room.roomInfo && global.room.roomInfo.playerList && global.room.roomInfo.playerList.find(p => p.id === MGOBE.Player.id)) {
            this.loadRoomScene();
        }
    }

    // update (dt) {}

    onDisable() {
        // 场景销毁时一定要清理回调，避免引用UI时报错
        global.room && (global.room.onUpdate = null);
        clearInterval(this.timer);
    }

    /////////////////////////////////// SDK 操作 ///////////////////////////////////
    // SDK 初始化
    initSDK() {
        if (Util.isInited()) {
            return Util.appendLog("SDK 已经初始化，无需重复操作");
        }

        if (!Home.gameId || !Home.secretKey || !Home.url) {
            return Util.appendLog("请在首页填入正确的 gameId、secretKey、url");
        }

        Util.appendLog("正在初始化 SDK");

        if (cc.sys.isNative && !MgobeScene.cacertNativeUrl) {
            // CA 根证书（Cocos Native 环境下 wss 需要此参数）
            return cc.loader.loadRes("/cacert", cc.Asset, (err, asset: cc.Asset) => {

                Util.appendLog("加载证书结束 " + (!err));

                if (err) {
                    return;
                }

                MgobeScene.cacertNativeUrl = asset.nativeUrl;

                this.initSDK();
            });
        }

        Util.initSDK(Home.gameId, Home.secretKey, Home.url, MgobeScene.cacertNativeUrl, event => {
            if (event.code === MGOBE.ErrCode.EC_OK) {
                Util.appendLog("初始化 SDK 成功");
                this.initView();
                global.room.onUpdate = () => this.onRoomUpdate();
            } else {
                Util.appendLog(`初始化 SDK 失败，错误码：${event.code}`);
            }
        });
    }

    // SDK 创建房间
    createRoom() {
        this.lockSubmit = true;
        Util.appendLog(`正在创建房间`);

        const playerInfo: MGOBE.types.PlayerInfoPara = {
            name: "测试玩家",
            customPlayerStatus: 0,
            customProfile: "",
        };

        const createRoomPara: MGOBE.types.CreateRoomPara = {
            roomName: "cocos_demo",
            roomType: "create",
            maxPlayers: 5,
            isPrivate: true,
            customProperties: "",
            playerInfo,
        };

        global.room.initRoom();
        global.room.createRoom(createRoomPara, event => {
            this.lockSubmit = false;
            if (event.code === MGOBE.ErrCode.EC_OK) {
                Util.appendLog(`创建房间成功，房间ID：${event.data.roomInfo.id}`);
                this.loadRoomScene();
            } else {
                Util.appendLog(`创建房间失败，错误码：${event.code}`);
            }
        });
    }

    // SDK 随机匹配
    matchPlayers(matchCode: string) {
        if (!matchCode) {
            return Util.appendLog(`请输入正确的匹配 Code`);
        }

        this.lockSubmit = true;
        this.timer = setInterval(() => Util.appendLog(`正在随机匹配，请稍等。`), 1000);
        Util.appendLog(`正在随机匹配，匹配Code：${matchCode}。请稍等，默认超时时间为 10 秒。`);

        // 注意：这里没有使用匹配属性，如果匹配规则中有设置匹配属性，这里需要做调整
        const matchAttributes: MGOBE.types.MatchAttribute[] = [];

        const playerInfo: MGOBE.types.MatchPlayerInfoPara = {
            name: "测试玩家",
            customPlayerStatus: 0,
            customProfile: "",
            matchAttributes,
        };

        const matchPlayersPara: MGOBE.types.MatchPlayersPara = {
            matchCode,
            playerInfo,
        };

        global.room.initRoom();
        global.room.matchPlayers(matchPlayersPara, event => {
            this.lockSubmit = false;
            clearInterval(this.timer);

            if (event.code === MGOBE.ErrCode.EC_OK) {
                Util.appendLog(`随机匹配成功，房间ID：${event.data.roomInfo.id}`);
                this.loadRoomScene();
            } else {
                Util.appendLog(`随机匹配失败，错误码：${event.code}`);
            }
        });
    }

    // SDK 加入房间
    joinRoom(roomId: string) {
        if (!roomId) {
            return Util.appendLog(`请输入正确的房间ID`);
        }

        this.lockSubmit = true;
        Util.appendLog(`正在加入房间，房间ID：${roomId}`);

        const playerInfo: MGOBE.types.PlayerInfoPara = {
            name: "测试玩家",
            customPlayerStatus: 0,
            customProfile: "",
        };

        const joinRoomPara: MGOBE.types.JoinRoomPara = {
            playerInfo,
        };

        global.room.initRoom({ id: roomId });
        global.room.joinRoom(joinRoomPara, event => {
            this.lockSubmit = false;
            if (event.code === MGOBE.ErrCode.EC_OK) {
                Util.appendLog(`加入房间成功，房间ID：${event.data.roomInfo.id}`);
                this.loadRoomScene();
            } else {
                Util.appendLog(`加入房间失败，${event.code === MGOBE.ErrCode.EC_ROOM_TEAM_MEMBER_LIMIT_EXCEED ? "当前房间玩家数量已满，" : ""}错误码：${event.code}`);
            }
        });
    }
}
