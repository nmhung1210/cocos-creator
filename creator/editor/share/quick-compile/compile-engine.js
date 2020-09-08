const e = require('path'),
  n = require('./index.js'),
  i = require('./plugins/babel'),
  o = require('./plugins/module'),
  r = require('./engine-utils/delete-engine-cache');
let l = !0;
if (!('undefined' == typeof Editor)) {
  const e = Editor.Profile.load('global://features.json');
  l = void 0 === (l = e.get('bundle-quick-compiler-engine')) || l;
}
module.exports = async (s) => {
  if (!s.enginePath) throw new Error('Please specify the engine path');
  let u = new n();
  function t(n) {
    return e.join(s.enginePath, n || '');
  }
  let d = [
      t('external/box2d/box2d.js'),
      t('extensions/dragonbones/lib/dragonBones.js'),
      t('extensions/spine/lib/spine.js'),
    ],
    a = s.excludes || [],
    c = {
      root: t(),
      entries: [t('index.js')],
      out: t('bin/.cache/dev'),
      excludes: a,
      plugins: [
        i({ exludesForSourceMap: d }),
        o({
          bundle: l,
          modularName: 'engine',
          exludesForSourceMap: d,
          excludes: s.moduleExcludes,
          prefix: 'engine-dev',
          onSourceMap(n, i) {
            (i.sources = [e.join('engine-dev', e.relative(t(), n.src))]),
              (i.sourceRoot = '/');
          },
        }),
        r(t),
      ],
      clear: !1,
      onlyRecordChanged: !0,
    };
  return (
    s.enableWatch ? await u.watch(c) : await u.build(c),
    (u.modulePlugin = c.plugins[1]),
    u
  );
};
