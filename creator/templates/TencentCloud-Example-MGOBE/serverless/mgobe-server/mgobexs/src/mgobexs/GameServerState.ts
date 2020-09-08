import { mgobexsInterface } from './mgobexsInterface';

export interface PlayerData {
    x: number,
    y: number,
    id: string,
}

export interface GameData {
    syncType: SyncType,
    timer: any,
    players: PlayerData[],
}

export enum SyncType {
    msg = "房间内发消息",
    state = "实时服务器状态同步",
    frame = "帧同步",
}

export enum StateSyncCmd {
    up = 1,
    down = 2,
    left = 3,
    right = 4,
}

const MAX_Y = 5;
const MIN_Y = 0;

const MAX_X = 12;
const MIN_X = 0;

export function random(from: number, to: number, fixed: number) {
    return Math.round(Math.random() * (to - from) * 10 ** fixed) / (10 ** fixed);
}

export function initPlayer(id: string, gameData: GameData, x?: number, y?: number) {
    if (gameData.players.find(p => p.id === id)) {
        // 已存在则不需要初始化
        return;
    }

    gameData.players.push({
        x: typeof x === "undefined" ? random(MIN_X, MAX_X, 0) : x,
        y: typeof y === "undefined" ? random(MIN_Y, MAX_Y, 0) : y,
        id,
    });
}

// 移除玩家。玩家退房时调用
export function removePlayer(id: string, gameData: GameData) {
    const index = gameData.players.findIndex(p => p.id === id);

    if (index >= 0) {
        gameData.players.splice(index, 1);
    }
}

// 设置玩家状态
export function setPlayer(id: string, cmd: StateSyncCmd, gameData: GameData) {
    if (!gameData.players.find(p => p.id === id)) {
        // 添加一个玩家
        initPlayer(id, gameData);
    }

    const player = gameData.players.find(p => p.id === id);

    switch (cmd) {
        case StateSyncCmd.up: player.y++; break;
        case StateSyncCmd.down: player.y--; break;
        case StateSyncCmd.left: player.x--; break;
        case StateSyncCmd.right: player.x++; break;
        default: return;
    }

    player.x = Math.min(Math.max(player.x, MIN_X), MAX_X);
    player.y = Math.min(Math.max(player.y, MIN_Y), MAX_Y);
}

export function initGameState(gameData: GameData, args: mgobexsInterface.ActionArgs<any>) {
    gameData.syncType = SyncType.state;
    gameData.players = [];
    args.room && args.room.playerList && args.room.playerList.forEach((p, i) => initPlayer(p.id, gameData, 0, i));
    // 初始化后，开始定时向客户端推送游戏状态
    gameData.timer = setInterval(() => {
        args.SDK.sendData({ playerIdList: [], data: { players: gameData.players } });
    }, 1000 / 15);
}

export function clearGameState(gameData: GameData) {
    gameData.syncType = SyncType.msg;
    clearInterval(gameData.timer);
    gameData.timer = undefined;
    gameData.players = [];
}