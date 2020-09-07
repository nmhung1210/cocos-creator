# Electron base ipc

在 electron 的 ipc 基础上，简单的封装一层，同进程内使用事件转发，减少 ipc 数据量。并增加发送回调等方法。

## 对象

### event

消息传递过程中的简单事件封装

- event.senderType 发送消息的进程类型，browser | renderer
- event.reply 如果消息允许回调，运行这个方法会执行发送方的回调

## Browser 浏览器进程

### on

监听并处理某个消息

- message 监听消息的名字
- listener 消息的处理器

```javascript
ipc.on('test', (event, ...args) => {
    console.log(args);
    event.reply(new Error('监听器很任性，就是要返回错误。'), ...args);
});
```

### once 

只触发一次的 on

### removeListener

- message 监听消息的名字
- listener 消息的处理器

取消监听的某一个消息处理

### removeAllListeners

取消监听的所有消息处理

### broadcast

- message 广播消息的名称
- ...args 参数

向所有 windows 广播消息

### emit 

- message 触发消息的名称
- ...args 参数

触发浏览器进程自身消息的监听器

```javascript
ipc.emit('message', 1, 2)
    .callback((error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
    })
    .timeout(-1);
```

### registerChannel

- channel 通道名

注册一个 ipc 通道，发送到指定通道的时候，会直接找到对应的进程，不再需要到主进程进行转发

### unregisterChannel

- channel 通道名

取消一个 ipc 通道监听

### sendToChannel

- channel 通道名
- message 消息名字
- ...args 参数

通过一个 channel，直接发送到指定的位置，减少 ipc 中转的次数

## Renderer 渲染进程

### on

监听并处理某个消息

- message 监听消息的名字
- listener 消息的处理器

```javascript
ipc.on('test', (event, ...args) => {
    console.log(args);
});
```

### once 

只触发一次的 on

### removeListener

- message 监听消息的名字
- listener 消息的处理器

取消监听的某一个消息处理

### removeAllListeners

取消监听的所有消息处理

### send

- message 
- ...args

发送消息给主进程的监听器

```javascript
ipc
    .send('test', 1, 2)
    .callback((error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
    })
    .timeout(-1);
```

### sendSync

同步版本的 send

### emit

- message
- ...args

触发当前窗口自身监听的消息

```javascript
ipc.emit('message', 1, 2)
    .callback((error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
    })
    .timeout(-1);
```

### registerChannel

- channel 通道名

注册一个 ipc 通道，发送到指定通道的时候，会直接找到对应的进程，不再需要到主进程进行转发

### unregisterChannel

- channel 通道名

取消一个 ipc 通道监听

### sendToChannel

- channel 通道名
- message 消息名字
- ...args 参数

通过一个 channel，直接发送到指定的位置，减少 ipc 中转的次数