import { GameState, PlayerData } from "./GameState";

// 状态同步逻辑状态
export const stateSyncState: GameState<null> = {
    players: []
};

// 设置默认的状态同步逻辑状态
export function setDefauleSyncState(room: MGOBE.Room) {

    const roomInfo = room.roomInfo || { playerList: [] } as MGOBE.types.RoomInfo;

    setState(roomInfo.playerList.map((p, i) => ({ x: 0, y: i, id: p.id })));
}

// 设置全部玩家状态，入参由gameSvr广播提供
export function setState(players: { x: number, y: number, id: string }[]) {

    if (!Array.isArray(players)) {
        return;
    }

    stateSyncState.players = [];

    players.forEach(p => {
        const player: PlayerData<null> = {
            id: p.id,
            x: p.x,
            y: p.y,
        }

        stateSyncState.players.push(player);
    });
}