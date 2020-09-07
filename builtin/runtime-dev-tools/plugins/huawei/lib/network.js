/**
 * Created by wzm on 08/11/2018.
 */
let dl = require('download');
let https = require("https");
let qs = require("querystring");
let fs = require('fire-fs');

const request = require('request');
const progress = require('request-progress');

let network = {};

network.download = function (url, savePath, progressCb, finishCb) {
    progress(request(url), {
        delay: 200,
    }).on('progress', function (state) {
        progressCb && progressCb(state.percent)
    }).on('error', function (err) {
        finishCb(err, false);
    }).on('end', function () {
        finishCb(null, true);
    }).pipe(fs.createWriteStream(savePath));
};

network.get = function (url) {
    return new Promise((resolve, reject) => {

        https.get(url, (res) => {

            res.on('data', (d) => {
                resolve(d);
            });

        }).on('error', (e) => {
            reject(e);
        });
    });

};

network.post = function (host, port, path, param) {
    return new Promise((resolve, reject) => {

        let options = {
            hostname: host,
            port: port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        let req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let dt = "";
            res.on('data', function (chunk) {
                dt += chunk;
            });

            res.on('end', function (e) {
                resolve(dt);
            });
        });

        req.on('error', function (e) {
            reject(e);
            console.log('problem with request: ' + e.message);
        });

        req.write(qs.stringify(param));

        req.end();
    });

};
module.exports = network;