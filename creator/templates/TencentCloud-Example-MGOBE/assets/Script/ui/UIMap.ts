import { PlayerData } from "../logic/GameState";
import UIPlayer from "./UIPlayer";

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
let playersPool: cc.NodePool = null;

// 初始化对象池
function initPlayersPool(playerPrefab: cc.Prefab) {
    if (playersPool) {
        return;
    }

    playersPool = new cc.NodePool();

    for (let i = 0; i < 5; i++) {
        let player = cc.instantiate(playerPrefab);
        playersPool.put(player);
    }
}

function getFromPlayersPool(playerPrefab: cc.Prefab) {
    let player = null;
    if (playersPool.size() > 0) {
        player = playersPool.get();
    } else {
        player = cc.instantiate(playerPrefab);
    }

    return player;
}

function removeToPlayerPool(player) {
    playersPool.put(player);
}

@ccclass
export default class UIMap extends cc.Component {

    @property(cc.Prefab)
    playerPrefab: cc.Prefab = null;

    // 地图尺寸
    public w: number = 13;
    public h: number = 6;

    public players: UIPlayer[] = [];

    // 地图单元格宽度（像素）
    public tileSize = 40;

    setMapSize(w, h) {
        this.w = w;
        this.h = h;
    }

    setPlayers(players: PlayerData<any>[]) {
        if (!Array.isArray(players)) {
            players = [];
        }

        this.players.splice(players.length).forEach(player => removeToPlayerPool(player));

        for (let i = this.players.length; i < players.length; i++) {
            this.players.push(getFromPlayersPool(this.playerPrefab));
        }

        players.forEach((player, i) => {
            const uiPlayer = this.players[i].getComponent(UIPlayer);
            // 将玩家的逻辑坐标转换成地图画布坐标，更新表现层玩家位置
            const {x, y} = this.convertPosition(player.x, player.y);
            uiPlayer.node.parent = this.node;
            uiPlayer.initPlayer(player.id, x, y);
        });
    }

    // 坐标转换：逻辑坐标 -> 画布坐标
    convertPosition(mapX: number, mapY: number) {
        const x = mapX * this.tileSize + this.tileSize / 2;
        const y = mapY * this.tileSize + this.tileSize / 2;

        return { x, y };
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        initPlayersPool(this.playerPrefab);
    }

    update(dt) {
        this.node.width = this.w * this.tileSize;
        this.node.height = this.h * this.tileSize;
    }
}
