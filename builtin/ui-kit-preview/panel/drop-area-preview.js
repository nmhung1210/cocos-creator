(() => {
  'use strict';

  return function init ( panel ) {
    let viewEL = panel.$.view;

    Editor.import('packages://ui-kit-preview/panel/drop-area-preview.tmpl').then(
      content => {
        viewEL.innerHTML = content;

        // foo, bar
        ['foo', 'bar'].forEach(name => {
          let el = viewEL.querySelector(`#${name}`);

          el.addEventListener('dragstart', event => {
            // NOTE: important!
            event.stopPropagation();

            Editor.UI.DragDrop.start(event.dataTransfer, {
              effect: 'copy',
              type: name,
              items: name,
            });
          });

          el.addEventListener('dragend', () => {
            Editor.UI.DragDrop.end();
          });
        });

        // multi
        let el = viewEL.querySelector(`#multi`);

        el.addEventListener('dragstart', event => {
          // NOTE: important!
          event.stopPropagation();

          Editor.UI.DragDrop.start(event.dataTransfer, {
            effect: 'copy',
            type: 'foo',
            items: [
              { name: 'foo-001' },
              { name: 'foo-002' },
              { name: 'foo-003' },
              { name: 'foo-004' },
              { name: 'foo-005' },
              { name: 'foo-006' },
              { name: 'foo-007' },
            ],
            buildImage: true,
          });
        });

        el.addEventListener('dragend', () => {
          Editor.UI.DragDrop.end();
        });

        // ui-drop-area
        let elList = viewEL.querySelectorAll('ui-drop-area');
        elList.forEach(el => {
          el.addEventListener('drop-area-move', event => {
            Editor.UI.DragDrop.updateDropEffect(event.detail.dataTransfer, 'copy');
          });
        });
      }
    );
  };
})();
