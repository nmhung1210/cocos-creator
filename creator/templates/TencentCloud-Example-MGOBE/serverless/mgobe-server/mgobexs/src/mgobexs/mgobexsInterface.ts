
export namespace mgobexsInterface {
	//PROTO-STRUCT-BEGIN
	export interface ICreateRoomBst {
		roomInfo?: (IRoomInfo|null);
	}
	export interface IJoinRoomBst {
		roomInfo?: (IRoomInfo|null);
		joinPlayerId?: (string|null);
	}
	export interface ILeaveRoomBst {
		roomInfo?: (IRoomInfo|null);
		leavePlayerId?: (string|null);
	}
	export interface IRemovePlayerBst {
		roomInfo?: (IRoomInfo|null);
		removePlayerId?: (string|null);
	}
	export interface IChangeRoomBst {
		roomInfo?: (IRoomInfo|null);
	}
	export interface IChangeCustomPlayerStatusBst {
		changePlayerId?: (string|null);
		customPlayerStatus?: (number|null);
		roomInfo?: (IRoomInfo|null);
	}
	export interface IChangePlayerNetworkStateBst {
		changePlayerId?: (string|null);
		networkState?: (NetworkState|null);
		roomInfo?: (IRoomInfo|null);
	}
	export interface IStartFrameSyncBst {
		roomInfo?: (IRoomInfo|null);
	}
	export interface IStopFrameSyncBst {
		roomInfo?: (IRoomInfo|null);
	}
	export interface IDestroyRoomBst {
		roomInfo?: (IRoomInfo|null);
	}
	export interface IRoomInfo {
		id?: (string|null);
		name?: (string|null);
		type?: (string|null);
		createType?: (CreateRoomType|null);
		maxPlayers?: (number|null);
		owner?: (string|null);
		isPrivate?: (boolean|null);
		customProperties?: (string|null);
		playerList?: (IPlayerInfo[]|null);
		teamList?: (ITeamInfo[]|null);
		frameSyncState?: (FrameSyncState|null);
		frameRate?: (number|null);
		routeId?: (string|null);
		createTime?: (number|null);
		startGameTime?: (number|null);
		isForbidJoin?: (boolean|null);
	}
	export enum CreateRoomType {
		COMMON_CREATE = 0,
		MATCH_CREATE = 1
	}
	export interface IPlayerInfo {
		id?: (string|null);
		name?: (string|null);
		teamId?: (string|null);
		customPlayerStatus?: (number|null);
		customProfile?: (string|null);
		commonNetworkState?: (NetworkState|null);
		relayNetworkState?: (NetworkState|null);
		isRobot?: (boolean|null);
		matchAttributes?: (IMatchAttribute[]|null);
	}
	export interface ITeamInfo {
		id?: (string|null);
		name?: (string|null);
		minPlayers?: (number|null);
		maxPlayers?: (number|null);
	}
	export enum FrameSyncState {
		STOP = 0,
		START = 1
	}
	export enum NetworkState {
		COMMON_OFFLINE = 0,
		COMMON_ONLINE = 1,
		RELAY_OFFLINE = 2,
		RELAY_ONLINE = 3
	}
	export interface IMatchAttribute {
		name?: (string|null);
		value?: (number|null);
	}
	//PROTO-STRUCT-END

	export interface IGameInfo {
		gameId: string;
		serverKey: string;
	}

	export interface ResponseEvent<T> {
		code: number;
		msg: string;
		seq: string;
		data?: T;
	}

	export type ReqCallback<T> = (event: ResponseEvent<T>) => any;

	export interface IGetRoomByRoomIdPara {
		roomId: string;
	}

	export interface IGetRoomByRoomIdRsp {
		roomInfo?: mgobexsInterface.IRoomInfo;
	}

	export interface IChangeRoomPara {
		roomId: string;
		roomName?: string;
		owner?: string;
		isPrivate?: boolean;
		isForbidJoin?: boolean;
		customProperties?: string;
	}

	export interface IChangeRoomRsp {
		roomInfo?: mgobexsInterface.IRoomInfo;
	}

	export interface IChangeCustomPlayerStatusPara {
		roomId: string;
		playerId: string;
		customPlayerStatus: number;
	}

	export interface IChangeCustomPlayerStatusRsp {
		roomInfo?: mgobexsInterface.IRoomInfo;
	}

	export interface IRemovePlayerPara {
		roomId: string;
		removePlayerId: string;
	}

	export interface IRemovePlayerRsp {
		roomInfo?: mgobexsInterface.IRoomInfo;
	}

	export interface GameData {
		[key: string]: any;
	}

	export interface UserDefinedData {
		[key: string]: any;
	}

	export interface ActionArgs<T> {
		sender: string;
		actionData: T;
		gameData: GameData;
		room: IRoomInfo;
		exports: { data: GameData; };
		SDK: {
			sendData: (data: { playerIdList: string[]; data: UserDefinedData; }, resendConf?: { timeout: number; maxTry: number; }) => void;
			dispatchAction: (actionData: UserDefinedData) => void;
			clearAction: () => void;
			exitAction: () => void;

			getRoomByRoomId: (getRoomByRoomIdPara: IGetRoomByRoomIdPara, callback?: ReqCallback<IGetRoomByRoomIdRsp>) => void;
			changeRoom: (changeRoomPara: IChangeRoomPara, callback?: ReqCallback<IChangeRoomRsp>) => void;
			changeCustomPlayerStatus: (changeCustomPlayerStatusPara: IChangeCustomPlayerStatusPara, callback?: ReqCallback<IChangeCustomPlayerStatusRsp>) => void;
			removePlayer: (removePlayerPara: IRemovePlayerPara, callback?: ReqCallback<IRemovePlayerRsp>) => void;

			logger: {
				debug: (...args: any[]) => void;
				info: (...args: any[]) => void;
				error: (...args: any[]) => void;
			};
		};
	}

	export namespace GameServer {
		export type Receiver<T> = (data: ActionArgs<T>) => void;

		export type onRecvFromClient = Receiver<UserDefinedData>;

		export type onCreateRoom = Receiver<ICreateRoomBst>;
		export type onJoinRoom = Receiver<IJoinRoomBst>;
		export type onLeaveRoom = Receiver<ILeaveRoomBst>;
		export type onRemovePlayer = Receiver<IRemovePlayerBst>;
		export type onChangeRoom = Receiver<IChangeRoomBst>;
		export type onChangeCustomPlayerStatus = Receiver<IChangeCustomPlayerStatusBst>;
		export type onChangePlayerNetworkState = Receiver<IChangePlayerNetworkStateBst>;
		export type onStartFrameSync = Receiver<IStartFrameSyncBst>;
		export type onStopFrameSync = Receiver<IStopFrameSyncBst>;
		export type onDestroyRoom = Receiver<IDestroyRoomBst>;

		export interface IGameServer {
			mode?: 'async' | 'sync';
			onInitGameData: (args: { room: IRoomInfo; }) => GameData;
			onRecvFromClient: onRecvFromClient;
			onCreateRoom?: onCreateRoom;
			onJoinRoom?: onJoinRoom;
			onLeaveRoom?: onLeaveRoom;
			onRemovePlayer?: onRemovePlayer;
			onChangeRoom?: onChangeRoom;
			onChangeCustomPlayerStatus?: onChangeCustomPlayerStatus;
			onChangePlayerNetworkState?: onChangePlayerNetworkState;
			onStartFrameSync?: onStartFrameSync;
			onStopFrameSync?: onStopFrameSync;
			onDestroyRoom?: onDestroyRoom;
		}
	}

	export interface mgobexsCode {
		logLevelSDK?: 'debug+' | 'info+' | 'error+';
		logLevel?: 'debug+' | 'info+' | 'error+';
		onInitGameServer?: (tcb: any) => any;
		gameInfo: IGameInfo;
		gameServer: GameServer.IGameServer;
	}
}