'use strict';

const Path = require('path');
allowReturnOutsideFunctionInBrowserifyTransform();
const Fs = require('fs');

const preludePath = Path.resolve(__dirname, '../browserify_prelude.js');
const prelude = Fs.readFileSync(preludePath, 'utf8');

function allowReturnOutsideFunctionInBrowserifyTransform () {
    var paths = [
        'browserify/node_modules/syntax-error/node_modules/acorn',
        'syntax-error/node_modules/acorn',
        'acorn'
    ];
    function patch (path) {
        var acorn = require(path);
        var parse = acorn.parse;
        if (typeof parse === 'function') {
            if (acorn.parse.name !== 'monkeyPatchedParse') {
                acorn.parse = function monkeyPatchedParse(input, options) {
                    if (options) {
                        options.allowReturnOutsideFunction = true;
                    }
                    else {
                        options = {
                            allowReturnOutsideFunction: true
                        };
                    }
                    return parse(input, options);
                };
            }
        }
        else {
            console.error('Can not find acorn.parse to patch');
        }
    }

    var patched = false;
    for (var i = 0; i < paths.length; i++) {
        try {
            patch(paths[i]);
            patched = true;
        }
        catch (e) {
        }
    }
    if (!patched) {
        console.error('Can not find acorn to patch');
    }
}

/*
 * @param [options.sourcemaps = true]
 * @param [options.babelifyOpt]
 * @param [options.aliasifyConfig]
 */
module.exports = function createBundler(entryFiles, options) {
    // https://github.com/substack/node-browserify#methods
    var browserifyOpt = {
        extensions: ['.js', '.json', '.ts'],
        entries: [].concat(entryFiles),
        debug: (options && 'sourcemaps' in options) ? options.sourcemaps : true,
        detectGlobals: false,    // dont insert `process`, `global`, `__filename`, and `__dirname`
        bundleExternal: false,   // dont bundle external modules
        //standalone: 'engine-framework',
        //basedir: tempScriptDir

        // define custom prelude to optimize script evaluate time
        prelude: prelude,
        preludePath: Path.relative(process.cwd(), preludePath),
    };

    var presets = [
        [
            require('@babel/preset-env'),
            {
                "loose": true,
            }
        ],
        require('@babel/preset-typescript'),
    ];

    var plugins = [
    //     // < 6.16.0
    //     [ 'babel-plugin-parser-opts', { allowReturnOutsideFunction: true } ]
        // make sure that transform-decorators-legacy comes before transform-class-properties.
        [
            require('@babel/plugin-proposal-decorators'),
            { legacy: true },
        ],
        [
            require('@babel/plugin-proposal-class-properties'),
            { loose: true },
        ],
        [
            require('babel-plugin-add-module-exports'),
        ],
    ];

    var Babelify;
    try {
        Babelify = require('babelify');
    } catch (e) {
        console.error('Please run "npm install babelify".');
        throw e;
    }
    var aliasify;
    try {
        aliasify = require('aliasify');
    } catch (e) {
        console.error('Please run "npm install aliasify".');
        throw e;
    }

    var b;
    if (options && options.cacheDir) {
        // https://github.com/royriojas/persistify
        const Persistify = require('persistify');
        b = Persistify(browserifyOpt, {
            recreate: false,
            cacheId: require('../../package.json').version + entryFiles,
            cacheDir: options.cacheDir
        });
    }
    else {
        const Browserify = require('browserify');
        b = new Browserify(browserifyOpt);
    }

    return b
        .exclude(Path.join(__dirname, '../../package.json'))
        .transform(Babelify, (options && options.babelifyOpt) || {
            extensions: ['.js', '.ts'],
            presets: presets,
            plugins: plugins,

            // >= 6.16.0
            // parserOpts: {
            //     allowReturnOutsideFunction: true,
            // },

            ast: false,
            babelrc: false,
            highlightCode: false,
            sourceMaps: true,
            compact: false
        })
        .transform(aliasify, (options && options.aliasifyConfig) || {});
};
