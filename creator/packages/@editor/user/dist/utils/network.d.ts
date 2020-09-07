/**
 * 发送 post 消息到服务器
 * @param {string} url
 * @param {object} data
 */
export declare function sendPostRequest(url: string, data: any): Promise<{}>;
/**
 * 发送 get 消息到服务器
 * @param {string} url
 * @param {object} data
 */
export declare function sendGetRequest(url: string, data: any): Promise<{}>;
