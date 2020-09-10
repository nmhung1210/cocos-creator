#!/usr/bin/env node

const yargs = require("yargs");
const execSync = require("child_process").execSync;
const resolve = require("path").resolve;
const fs = require("fs");
const run = cmd => execSync(cmd, {
    stdio: "inherit"
});

const creatorDir = resolve(__dirname, "..", "creator");
const argv = yargs

    .command('build <path>', ' - Build project by path', (yargs) => {
        yargs
            .positional('path', {
                describe: 'Path to project'
            })
    }, (argv) => {
        const projectRoot = resolve(process.cwd(), argv.path);
        process.chdir(creatorDir);
        run(`npx electron --no-sandbox ${creatorDir} --nologin --path="${projectRoot}" --build="platform=${argv.platform};debug=false" `);
    })
    .usage('$0 [path]', ' - Open cocos creator.', yargs => {}, (argv) => {
        if (argv.path) {
            const projectRoot = resolve(process.cwd(), argv.path);
            if (fs.existsSync(projectRoot) && fs.statSync(projectRoot).isDirectory) {
                process.chdir(creatorDir);
                run(`npx electron --no-sandbox ${creatorDir} --nologin --path="${projectRoot}"`);
            } else {
                console.error(`Project at ${projectRoot} does not exist!`);
            }
        } else {
            process.chdir(creatorDir);
            run(`npx electron --no-sandbox ${creatorDir} --nologin`);
        }
    }).option('platform', {
        alias: 'p',
        type: 'string',
        default: 'web-mobile',
        description: 'Build platform <web-mobile|web-desktop|fb-instant-games|android|android-instant|ios|mac|win32>'
    }).argv;