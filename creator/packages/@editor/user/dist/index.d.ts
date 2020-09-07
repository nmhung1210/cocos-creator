/// <reference types="node" />
import { ChildProcess } from 'child_process';
interface UserInfo {
    session_id: string;
    session_key: string;
    cocos_uid: string;
    email: string;
    nickname: string;
}
/**
 * 设置 info 数据
 * @param {object} data
 */
export declare function setData(data: UserInfo): void;
/**
 * 读取 info 数据
 */
export declare function getData(): UserInfo;
/**
 * 检查是否已经登陆
 */
export declare function isLoggedIn(): Promise<boolean>;
/**
 * 用户登陆
 * 登陆失败会直接抛出异常
 * @param {string} username
 * @param {string} password
 */
export declare function login(username: string, password: string): Promise<{
    nickname: string;
    email: string;
}>;
/**
 * 退出已经登陆的用户
 * 如果退出失败，直接抛出异常
 */
export declare function logout(): Promise<boolean>;
/**
 * 获取用户的 user token
 */
export declare function getUserToken(): Promise<any>;
/**
 * 获取插件的 session code
 * @param {*} pluginId
 */
export declare function getSessionCode(pluginId: number): Promise<any>;
/**
 * 绑定用户事件
 * @param args
 */
export declare function on(...args: any[]): void;
/**
 * 绑定单次用户事件
 * @param args
 */
export declare function once(...args: any[]): void;
/**
 * 解除绑定的事件
 * @param args
 */
export declare function removeListener(...args: any[]): void;
/**
 * 添加一个受管理的子进程
 * @param child
 */
export declare function addChildProcess(child: ChildProcess): void;
/**
 * 移除一个受管理的子进程
 * @param child
 */
export declare function removeChildProcess(child: ChildProcess): void;
export {};
