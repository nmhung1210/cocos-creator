/**
 * 获取用户数据
 */
export declare function getData(): Promise<{}>;
/**
 * 检查用户是否登陆
 */
export declare function isLoggedIn(): Promise<{}>;
/**
 * 用户登陆
 * @param username
 * @param password
 */
export declare function login(username: string, password: string): Promise<{}>;
/**
 * 用户退出
 */
export declare function logout(): Promise<{}>;
/**
 * 获取用户的 token
 */
export declare function getUserToken(): Promise<{}>;
/**
 * 获取一个插件的 session code
 * @param pluginId
 */
export declare function getSessionCode(pluginId: number): Promise<{}>;
/**
 * 触发绑定的事件
 * @param args
 */
export declare function emit(...args: any[]): void;
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
