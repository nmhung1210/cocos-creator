export declare function getData(): Promise<{}>;
export declare function isLoggedIn(): Promise<{}>;
export declare function login(username: string, password: string): Promise<{}>;
export declare function logout(): Promise<{}>;
export declare function getUserToken(): Promise<{}>;
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
