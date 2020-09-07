(() => {
  'use strict';

  return function init ( panel ) {
    let viewEL = panel.$.view;

    Editor.import('packages://ui-kit-preview/panel/webview-preview.tmpl').then(
      content => {
        viewEL.innerHTML = content;

        let onlineView = viewEL.querySelector('#online');

        let btnEL = viewEL.querySelector('#github');
        btnEL.addEventListener('confirm', () => {
          onlineView.src = 'https://github.com';
        });

        btnEL = viewEL.querySelector('#electron');
        btnEL.addEventListener('confirm', () => {
          onlineView.src = 'http://electron.atom.io';
        });
      }
    );
  };
})();
