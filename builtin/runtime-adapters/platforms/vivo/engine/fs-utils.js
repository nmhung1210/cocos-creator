/****************************************************************************
 Copyright (c) 2017-2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of fsUtils software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in fsUtils License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var fs = qg.accessFile ? qg : null;

var fsUtils = {

    fs,

    _subpackagesPath: '',

    getUserDataPath() {
        return 'internal://files';
    },

    checkFsValid() {
        if (!fs) {
            console.warn('can not get the file system!');
            return false;
        }
        return true;
    },

    deleteFile(filePath, onComplete) {
        fs.deleteFile({
            uri: filePath,
            success: function () {
                onComplete && onComplete(null);
            },
            fail: function (data, code) {
                console.warn('Delete file failed: ' + code);
                onComplete && onComplete(new Error(code));
            }
        });
    },

    downloadFile(remoteUrl, filePath, header, onProgress, onComplete) {
        var options = {
            url: remoteUrl,
            success: function (res) {
                if (res.statusCode === 200) {
                    onComplete && onComplete(null, res.tempFilePath || res.filePath);
                }
                else {
                    if (res.filePath) {
                        fsUtils.deleteFile(res.filePath);
                    }
                    console.warn('Download file failed: ' + res.statusCode);
                    onComplete && onComplete(new Error(res.statusCode), null);
                }
            },
            fail: function (res) {
                console.warn('Download file failed: ' + res, remoteUrl);
                onComplete && onComplete(new Error(res), null);
            }
        }
        if (filePath) options.filePath = filePath;
        if (header) options.header = header;
        var task = qg.download(options);
        onProgress && task.onProgressUpdate(onProgress);
    },

    saveFile(srcPath, destPath, onComplete) {
        fs.moveFile({
            srcUri: srcPath,
            dstUri: destPath,
            success: function (res) {
                onComplete && onComplete(null);
            },
            fail: function (res, code) {
                console.warn(`move File fail, code = ${code}`);
                onComplete && onComplete(new Error(new Error(`move File fail, code = ${code}`)));
            }
        });
    },

    copyFile(srcPath, destPath, onComplete) {
        fs.copyFile({
            srcUri: srcPath,
            dstUri: destPath,
            success: function () {
                onComplete && onComplete(null);
            },
            fail: function (res, code) {
                console.warn(`copy file fail, code = ${code}`);
                onComplete && onComplete(new Error(`copy file fail, code = ${code}`));
            }
        });
    },

    writeFile(path, data, encoding, onComplete) {
        fs.writeFile({
            uri: path,
            encoding: encoding,
            text: data,
            success: function () {
                onComplete && onComplete(null);
            },
            fail: function (res, code) {
                console.warn(`write file fail, code = ${code}`);
                onComplete && onComplete(new Error(`write file fail, code = ${code}`));
            }
        });
    },

    writeFileSync(path, data, encoding) {
        const content = qg.writeFileSync({
            uri: path,
            text: data,
            encoding: encoding
        });

        if (content === 'success') {
            return null;
        }
        else {
            console.warn(`writeFileSync fail, result = ${content}`);
            return new Error(`writeFileSync fail, result = ${content}`);
        }
    },

    readFile(filePath, encoding, onComplete) {
        fs.readFile({
            uri: filePath,
            encoding: encoding,
            success: function (res) {
                onComplete && onComplete(null, res.text);
            },
            fail: function (res, code) {
                console.warn(`readFile fail, code = ${code}`);
                onComplete && onComplete(new Error(`readFile fail, code = ${code}`), null);
            }
        });
    },

    readDir(filePath, onComplete) {
        fs.listDir({
            uri: filePath,
            success: function (res) {
                var files = [];
                //取出路径
                for (const file of res.fileList) {
                    files.push(file.uri.replace(filePath, ""));
                }
                onComplete && onComplete(null, files);
            },
            fail: function (res) {
                console.warn('Read directory failed: ' + res.errMsg);
                onComplete && onComplete(new Error(res.errMsg), null);
            }
        });
    },

    readText(filePath, onComplete) {
        fsUtils.readFile(filePath, 'utf8', onComplete);
    },

    readArrayBuffer(filePath, onComplete) {
        fsUtils.readFile(filePath, 'binary', onComplete);
    },

    readJson(filePath, onComplete) {
        fsUtils.readFile(filePath, 'utf8', function (err, text) {
            var out = null;
            if (!err) {
                try {
                    out = JSON.parse(text);
                }
                catch (e) {
                    console.warn('Read json failed: ' + e.message);
                    err = new Error(e.message);
                }
            }
            onComplete && onComplete(err, out);
        });
    },

    readJsonSync(path) {
        const content = qg.readFileSync({
            uri: path,
            encoding: 'utf8'
        })

        if (typeof content === 'string') {
            console.warn(`readFileSync fail, error message = ${content}`);
            return new Error(`readFileSync fail, error message = ${content}`);
        }
        else {
            return JSON.parse(content.text);
        }
    },

    makeDirSync(path, recursive) {
        console.warn('vivo platform do not support mkdirSync');
        try {
            fs.mkdirSync(path, recursive);
            return null;
        }
        catch (e) {
            console.warn('Make directory failed: ' + e);
            return new Error(e);
        }
    },
    makeDir(path, callback) {
        fs.mkdir({
            uri: path,
            success: function (uri) {
                callback && callback();
            },
            fail: function (data, code) {
                console.warn(`Make directory failed:   ${code}`)
                callback && callback();
            }
        })
    },

    rmdirSync(dirPath, recursive) {
        console.warn('vivo platform do not support rmdirSync');
        try {
            fs.rmdirSync(dirPath, recursive);
        }
        catch (e) {
            console.warn('rm directory failed: ' + e);
            return new Error(e);
        }
    },


    rmdir(dirPath, callback) {
        qg.rmdir({
            uri: dirPath,
            success: function (uri) {
                callback && callback();
            },
            fail: function (data, code) {
                console.warn(`handling fail, code = ${code}`)
                callback && callback();
            }
        })
    },

    exists(filePath, onComplete) {
        var res = qg.accessFile({
            uri: filePath
        });

        if (onComplete === undefined) {
            return;
        }

        if (res === "true") {
            onComplete(true);
            return;
        }
        onComplete(false);
    },

    loadSubpackage(name, onProgress, onComplete) {
        var task = qg.loadSubpackage({
            name: 'usr_' + name,
            success: function () {
                onComplete && onComplete();
            },
            fail: function (res) {
                console.warn('Load Subpackage failed: ' + res.errMsg);
                onComplete && onComplete(new Error(`Failed to load subpackage ${name}: ${res.errMsg}`));
            }
        });
        onProgress && task.onProgressUpdate(onProgress);
        return task;
    },
    unzip(zipFilePath, targetPath, onComplete) {
        fs.unzipFile({
            srcUri: zipFilePath,
            dstUri: targetPath,
            success() {
                onComplete && onComplete(null);
            },
            fail(data, code) {
                onComplete && onComplete(new Error('unzip failed: ' + code));
            },
        })
    },
};

cc.assetManager.fsUtils = window.fsUtils = module.exports = fsUtils;