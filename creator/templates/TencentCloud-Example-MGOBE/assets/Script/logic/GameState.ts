export interface PlayerData<T> {
    x: number,
    y: number,
    id: string,
    state?: T,
}

export interface GameState<T> {
    players: PlayerData<T>[],
}