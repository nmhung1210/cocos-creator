import { WebContents } from 'electron';
export interface SenderOption {
    needCallback?: boolean;
    cid?: number;
    original?: boolean;
    arguments: any[];
    message: string;
}
declare class Sender {
    id: number;
    options: SenderOption;
    _callback: Function | undefined;
    _timer: any;
    static query(id: number): Sender;
    static remove(id: number): void;
    constructor(options: SenderOption);
    /**
     * 发送消息，并等待回复
     * 返回一个 promise 对象
     */
    promise(): Promise<{}>;
    /**
     * 发送消息，并等待回复
     * 回复后，触发传入函数
     * @param func
     */
    callback(func: Function): this;
    /**
     * 设置这个发送请求的超时时间，传入毫秒
     * @param ms
     */
    timeout(ms: number): this;
    option(option: SenderOption): this;
    immediately(): void;
}
/**
 * 渲染进程发给主进程的 Sender
 */
export declare class MainSender extends Sender {
    _send: boolean;
    constructor(options: SenderOption);
    immediately(): void;
}
/**
 * 同进程触发的消息 Sender
 *   1. 当前页面发送给当前页面
 *   2. 主进程发送给主进程
 */
export declare class EventSender extends Sender {
    _send: boolean;
    _events: Function[];
    constructor(events: Function[], options: SenderOption);
    immediately(): void;
}
/**
 * 从主进程发送给某个窗口的 Sender
 */
export declare class WindowSender extends Sender {
    _send: boolean;
    _win: WebContents;
    constructor(win: WebContents, options: SenderOption);
    immediately(): void;
}
/**
 * 从渲染程发送给某个窗口的 Sender
 */
export declare class WindowIDSender extends Sender {
    _send: boolean;
    _id: number;
    constructor(id: number, options: SenderOption);
    immediately(): void;
}
export {};
