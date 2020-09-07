export interface ErrorObject {
    name: string;
    code: number;
    message: string;
    stack: string;
}
/**
 * 消息事件对象的封装
 */
export declare class MessageEvent {
    senderType: string;
    sender: string;
    needCallback: boolean;
    reply: Function;
    constructor(type: string);
}
/**
 * 编码 error 对象
 * 因为 ipc 消息在发送的过程中会丢失类型数据
 * @param error
 */
export declare function serializeError(error: Error): {
    name: string;
    code: any;
    message: string;
    stack: string | undefined;
} | null;
/**
 * 解码 error 对象
 * @param obj
 */
export declare function deserializeError(obj: ErrorObject): Error | null;
