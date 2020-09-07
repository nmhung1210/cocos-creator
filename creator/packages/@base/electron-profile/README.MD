# Electron profile

electron 配置文件功能

## 对象

### Profile

load 出来的 profile

```javascript
// 获取数据
let name = profile.get('name');
let email = profile.get('contact.email');

// 设置数据
profile.set('contact.phone', 1380000000);

// 删除数据
profile.remove('contact.email');

// 保存数据
profile.save();

// 重新读取数据
profile.reload();
```

## Browser 浏览器进程接口

### register(type, path)

- @param {String} type 协议名称
- @param {String} path 协议指向的路径

注册一个协议地址

```javascript
profile.register('local', '~/local/');
```

### query(type)

- @param {String} type 协议名称

查询一个协议的地址

### inherit(type, [parentType])

- @param {String} type 协议名称
- @param {String} parentType 继承父亲协议，如果数据找不到，则会在父亲协议数据内继续查找

### clear()

清空所有的设置

### load(file)

- @param {String} file profile 路径

```javascript
profile.load('profile://local/user.json');
```


## Renderer 渲染进程

### load(file)

- @param {String} file profile 路径

```javascript
profile.load('profile://local/user.json');
```