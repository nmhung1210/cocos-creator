#!/usr/bin/env node

const yargs = require("yargs");
const execSync = require("child_process").execSync;
const resolve = require("path").resolve;
const fs = require("fs");
const run = cmd => execSync(cmd, {
    stdio: "inherit"
});

const argv = yargs.usage('\nUsage: $0 [path] - Open cocos creator.')
    .command('build <path>', ' - Build project by path', (yargs) => {
        yargs
            .positional('path', {
                describe: 'Path to project'
            })
    }, (argv) => {
        const projectRoot = resolve(process.cwd(), argv.path);
        process.chdir(resolve(__dirname, "..", "creator"));
        run(`npx electron --no-sandbox . --nologin --path="${projectRoot}" --build="platform=${argv.platform};debug=false" `);
    }).option('platform', {
        alias: 'p',
        type: 'string',
        default: 'web-mobile',
        description: 'Build platform <web-mobile|web-desktop|fb-instant-games|android|android-instant|ios|mac|win32>'
    }).argv;

if (argv._.length === 1 && argv._[0]) {
    const projectRoot = resolve(process.cwd(), argv._[0]);
    if (fs.existsSync(projectRoot) && fs.statSync(projectRoot).isDirectory) {
        process.chdir(resolve(__dirname, "..", "creator"));
        run(`npx electron --no-sandbox . --nologin --path="${projectRoot}"`);
    } else {
        console.error(`Project at ${projectRoot} does not exist!`);
    }
} else {
    process.chdir(resolve(__dirname, "..", "creator"));
    run(`npx electron --no-sandbox . --nologin`);
}


