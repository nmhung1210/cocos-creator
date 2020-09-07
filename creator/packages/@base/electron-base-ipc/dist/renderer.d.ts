/// <reference types="node" />
import { EventEmitter } from 'events';
import { MainSender, WindowIDSender, EventSender } from './sender';
export declare const _events: any;
/**
 * 触发渲染进程自己监听的消息
 * @param message
 * @param args
 */
export declare function emit(message: string, ...args: any[]): EventSender;
/**
 * 发送消息给浏览器进程
 * @param message
 * @param args
 */
export declare function send(message: string, ...args: any[]): MainSender;
/**
 * 发送消息并同步等待浏览器进程返回数据
 * @param message
 * @param args
 */
export declare function sendSync(message: string, ...args: any[]): any;
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
export declare function sendToChannel(channel: string, message: string, ...args: any[]): WindowIDSender;
/**
 * 发送消息到某个 webContent
 * @param id
 * @param message
 * @param args
 */
export declare function sendToContent(id: number, message: string, ...args: any[]): WindowIDSender;
