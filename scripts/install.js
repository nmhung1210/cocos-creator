const execSync = require("child_process").execSync;
const resolve = require("path").resolve;
const run = cmd => execSync(cmd, {
  stdio: "inherit"
});

process.chdir(resolve(__dirname, "..", "creator"));
run(`npm i`);

process.chdir(resolve(__dirname, "..", "engine"));
run(`npm i && npm run build:dev`);