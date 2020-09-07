const fs = require('fs');

var _ = require('lodash');

function _createPackageInfo(result) {
  return {
    enabled: result.enabled,
    hasTests: result.info.tests && result.info.tests.length > 0,
    info: result.info,
  };
}

function createVue(elem) {
  return new window.Vue({
    el: elem,

    data: {
      filterText: '',
      packages: [],
      filterPackages: [],
    },

    compiled() {
      let self = this;
      Editor.Package.queryInfos(function (err, results) {
        var packages = results.map(function (item) {
          return _createPackageInfo(item);
        });
        self.packages = packages;
        self._applyFilter();
      });
    },

    methods: {
      focusOnSearch (event) {
        if (event) {
          event.stopPropagation();
        }

        Editor.UI.focus(this.$els.search);
      },

      _onReload (item) {
        let pkgName = item.info.name;
        Editor.Package.reload(pkgName);
      },

      _onTest (event) {
        event.stopPropagation();

        // var item = this.$els.list.itemForElement(event.target);
        // Editor.Panel.open('tester', {
        //   name: item.info.name,
        // });

        // TODO
      },

      _enabledText (enabled) {
        if (enabled) {
          return 'Disable';
        }
        else {
          return 'Enable';
        }
      },

      _sortPackages (a, b) {
        return a.info.name.localeCompare(b.info.name, 'en', {numeric: true});
      },

      _applyFilter () {
        let packages = this.packages;
        let filterText = this.filterText;

        if (!filterText) {
          // 更新过滤后的包列表
          this.filterPackages = packages;
          return;
        }

        var tmpPackages = [];
        var filter = filterText.toLowerCase();
        for (var i = 0; i < packages.length; ++i) {
          if (packages[i].info.name.toLowerCase().match(filter)) {
            tmpPackages.push(packages[i]);
          }
        }

        // 更新过滤后的包列表
        this.filterPackages = tmpPackages;
        return;
      },

      _onSearchChange (event) {
        let value = event.target.value;
        this.filterText = value;
        this._applyFilter();
      },
    },
  });
}

Editor.Panel.extend({
  template: fs.readFileSync(Editor.url('packages://package-manager/panel/package-manager.html'), 'utf8'),

  style: fs.readFileSync(Editor.url('packages://package-manager/panel/package-manager.css'), 'utf8'),

  ready() {
    this._vm = createVue(this.shadowRoot);
  },

  messages: {
    'editor:package-loaded' ( event, name ) {
      let self = this;
      Editor.Package.queryInfo(name, function ( err, result ) {
        self._vm.packages.push(_createPackageInfo(result));
      });
    },

    'editor:package-unloaded' ( event, name ) {
      var idx = _.findIndex( this.packages, function ( item ) {
        return item.info.name === name;
      });
      this._vm.packages.splice(idx, 1);
    },
  },
});