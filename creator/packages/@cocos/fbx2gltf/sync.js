const fs = require('fs-extra');
const ps = require('path');
const download = require('download');

/**
 * Download binaries.
 */
(async (version) => {
    const downloadGitHubReleasesAsset = async (asset, path) => {
        const url = `https://github.com/cocos-creator/FBX2glTF/releases/download/${version}/${asset}`;
        await fs.ensureDir(ps.dirname(path));
        console.log(`Downloading ${url} to ${path}...`);
        await fs.writeFile(path, await download(url));
    };

    await fs.emptyDir(ps.join(__dirname, 'bin'));

    await downloadGitHubReleasesAsset(
        'FBX2glTF-windows-x64.exe',
        ps.join(__dirname, 'bin', 'Windows_NT', 'FBX2glTF.exe'),
    );

    await downloadGitHubReleasesAsset(
        'FBX2glTF-darwin-x64',
        ps.join(__dirname, 'bin', 'Darwin', 'FBX2glTF'),
    );

    await fs.writeFile(ps.join(__dirname, 'bin', 'VERSION'), version);
})('v0.9.7-c1');
