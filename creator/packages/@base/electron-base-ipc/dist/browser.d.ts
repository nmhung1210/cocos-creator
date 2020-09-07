/// <reference types="node" />
import { EventEmitter } from 'events';
import { BrowserView } from 'electron';
import { WindowSender, EventSender } from './sender';
export declare const _events: any;
/**
 * 广播消息到每个窗口
 * 广播消息无响应
 * @param message
 * @param args
 */
export declare function broadcast(message: string, ...args: any[]): void;
/**
 * 触发浏览器进程自己监听的消息
 * 需要响应
 * @param message
 * @param args
 */
export declare function emit(message: string | symbol, ...args: any[]): EventSender;
/**
 * 发送消息给某个窗口
 * @param win
 * @param message
 * @param args
 */
export declare function sendToWin(win: BrowserView, message: string, ...args: any[]): WindowSender;
/**
 * 发送消息到某个 webContent
 * @param id
 * @param message
 * @param args
 */
export declare function sendToContent(id: number, message: string, ...args: any[]): WindowSender;
/**
 * 监听 ipc 消息
 * @param event
 * @param listener
 */
export declare function on(event: string | symbol, listener: (...args: any[]) => void): EventEmitter;
/**
 * 监听一次 ipc 消息
 * @param event
 * @param listener
 */
export declare function once(event: string | symbol, listener: (...args: any[]) => void): EventEmitter;
/**
 * 取消 ipc 监听
 * @param event
 * @param listener
 */
export declare function removeListener(event: string | symbol, listener: (...args: any[]) => void): EventEmitter;
/**
 * 取消当前进程所有的 ipc 监听
 * @param event
 */
export declare function removeAllListeners(event?: string | symbol): EventEmitter;
/**
 * 在当前进程注册一个私有通道
 * @param channel
 */
export declare function registerChannel(channel: string): void;
/**
 * 在当前进反注册一个私有通道
 * @param channel
 */
export declare function unregisterChannel(channel: string): void;
/**
 * 向私有通道发送 ipc 请求
 * @param channel
 * @param message
 * @param args
 */
export declare function sendToChannel(channel: string, message: string, ...args: any[]): EventSender | WindowSender;
