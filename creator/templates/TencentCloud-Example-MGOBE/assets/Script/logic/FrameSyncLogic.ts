import { GameState, PlayerData } from "./GameState";
import global from "../global";

// 帧广播消息缓存
let frames: MGOBE.types.Frame[] = [];

// 帧消息命令：跑、停
export enum FrameSyncCmd {
    run = 1,
    stop = 2,
}

export interface PlayerState {
    cmd: FrameSyncCmd,
    dir: 1 | -1,
    lastUpdateFrameId: number,
}

// 帧同步逻辑状态
export const frameSyncState: GameState<PlayerState> = {
    players: []
};

export function clearFrames() {
    frames = [];
}

export function pushFrames(frame: MGOBE.types.Frame) {
    frames.push(frame);
}

// 重新从第一帧计算逻辑状态
export function reCalcFrameState(room: MGOBE.Room) {
    setDefauleFrameState(room);
    frames.forEach(frame => {
        calcFrame(frame);
    });
}

// 设置默认逻辑状态
export function setDefauleFrameState(room: MGOBE.Room) {

    const roomInfo = room.roomInfo || { playerList: [] } as MGOBE.types.RoomInfo;
    frameSyncState.players = [];

    roomInfo.playerList.forEach((p, i) => {
        const player: PlayerData<PlayerState> = {
            x: 0,
            y: i,
            id: p.id,
            state: {
                cmd: FrameSyncCmd.stop,
                dir: 1,
                lastUpdateFrameId: 1,
            },
        };

        setDefaultPlayerState(player, p.id, i);

        frameSyncState.players.push(player);
    });
}

function setDefaultPlayerState(player: PlayerData<PlayerState>, id: string, y: number) {
    player.id = id;
    player.x = 0;
    player.y = y;
    player.state.cmd = FrameSyncCmd.stop;
    player.state.dir = 1;
    player.state.lastUpdateFrameId = 1;
}

const MAX_X = 18 - 1;
const MIN_X = 0;
const DELTA_FRAME = 1;

function setPlayerCMD(id: string, cmd: FrameSyncCmd) {
    const player = frameSyncState.players.find(p => p.id === id) || { state: {} } as PlayerData<PlayerState>;
    player.state.cmd = cmd;
}

// 根据命令字更新玩家状态
function calcPlayerState(player: PlayerData<PlayerState>, frameId: number) {
    if (player.state.cmd === FrameSyncCmd.stop) {
        return;
    }

    if (frameId - player.state.lastUpdateFrameId > DELTA_FRAME) {
        player.state.lastUpdateFrameId = frameId;
        player.x += player.state.dir * 1;

        if (player.x >= MAX_X || player.x <= MIN_X) {
            player.state.dir *= -1;
        }
    }
}

// 根据每一帧计算游戏逻辑
export function calcFrame(frame: MGOBE.types.Frame) {
    if (frame.id === 1) {
        setDefauleFrameState(global.room);
    }

    if (frame.items && frame.items.length > 0) {
        frame.items.forEach(item => {
            setPlayerCMD(item.playerId, item.data["cmd"]);
        });
    }

    frameSyncState.players.forEach(player => calcPlayerState(player, frame.id));
}