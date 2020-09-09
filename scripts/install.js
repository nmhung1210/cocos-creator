const execSync = require("child_process").execSync;
const resolve = require("path").resolve;
const { existsSync, copySync } = require("fs-extra");

const run = cmd => execSync(cmd, {
  stdio: "inherit"
});

if (!existsSync('node_modules')) {
  run("npm i");

}
copySync(resolve(__dirname, "..", "node_modules", "engine"), resolve(__dirname, "..", "engine"));
copySync(resolve(__dirname, "..", "node_modules", "cocos2d-x"), resolve(__dirname, "..", "cocos2d-x"));

process.chdir(resolve(__dirname, "..", "creator"));
run(`npm i && npm run rebuild`);

process.chdir(resolve(__dirname, "..", "engine"));
run(`npm i && npm run build-mapping`);

