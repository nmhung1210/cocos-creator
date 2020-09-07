'use strict';

module.exports = {
  load () {
  },

  unload () {
  },

  messages: {
    open () {
      Editor.Panel.open('asset-db-debugger');
    },

    'query-info' ( event ) {
      var results = [];
      for ( var p in Editor.assetdb._path2uuid ) {
        var url = Editor.assetdb._url(p);
        results.push({ url: url, uuid: Editor.assetdb._path2uuid[p] });
      }
      results.sort( function ( a, b ) {
        return a.url.localeCompare(b.url);
      });
      event.reply(null, results);
    },
  },
};
