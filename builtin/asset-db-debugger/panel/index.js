const fs = require('fs');

function createVue (elem) {
    return new window.Vue({
        el: elem,
        data: {
            keyName: 'URL',
            valueName: 'UUID',
            infoList: [],
            searchValue: '',
        },
        methods: {
            urlUuidAction () {
                this.keyName = 'URL';
                this.valueName = 'UUID';
                Editor.Ipc.sendToMain('asset-db-debugger:query-info', (err, results) => {
                    if (err) {
                        Editor.error(err);
                        return;
                    }
                    var tmpList = [];
                    for ( var i = 0; i < results.length; ++i ) {
                        var info = results[i];
                        tmpList.push( { key: info.url, value: info.uuid } );
                    }
                    this.infoList = tmpList;
                });
            },
        
            uuidUrlAction () {
                this.keyName = 'UUID';
                this.valueName = 'URL';
                Editor.Ipc.sendToMain('asset-db-debugger:query-info', (err, results) => {
                    if (err) {
                        Editor.error(err);
                        return;
                    }
                    var tmpList = [];
                    for ( var i = 0; i < results.length; ++i ) {
                        var info = results[i];
                        tmpList.push( { key: info.uuid, value: info.url } );
                    }
                    this.infoList = tmpList;
                });
            },

            _onRefreshClick (event) {
                event.stopPropagation();
                this.switchOption(this.$els.selectbox.selectedText);
            },

            _onSelectedChanged (event) {
                let selectedName = event.target.value;
                this.switchOption(selectedName);
            },

            switchOption (selectedName) {
                if (selectedName === 'URL to UUID') {
                    this.urlUuidAction();
                }
                else if (selectedName === 'UUID to URL') {
                    this.uuidUrlAction();
                }
                else {
                    this.infoList.length = 0;
                }
            },

            filter (infoList, searchValue) {
                var text = searchValue.toLowerCase();
                var filterList = [];
                for ( var i = 0; i < this.infoList.length; ++i ) {
                    var info = this.infoList[i];
                    if ( info.key.toLowerCase().indexOf(text) !== -1 ) {
                        filterList.push(info);
                        continue;
                    }
            
                    if ( info.value.toLowerCase().indexOf(text) !== -1 ) {
                        filterList.push(info);
                        continue;
                    }
                    }
                    return filterList;
              },
        },

        compiled () {
            this.$els.selectbox.selectedIndex = 0;
            this.urlUuidAction();
        },
    });
}

Editor.Panel.extend({
    template: fs.readFileSync(Editor.url('packages://asset-db-debugger/panel/template.html'), 'utf8'),

    style: fs.readFileSync(Editor.url('packages://asset-db-debugger/panel/style.css'), 'utf8'),

    ready () {
        this._vm = createVue(this.shadowRoot);
    },
});