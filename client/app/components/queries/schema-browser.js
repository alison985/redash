import template from './schema-browser.html';

function SchemaBrowserCtrl($rootScope, $scope) {
  'ngInject';

  this.versionToggle = false;
  this.versionFilter = 'abcdefghijklmnop';

  this.showTable = (table) => {
    table.collapsed = !table.collapsed;
    $scope.$broadcast('vsRepeatTrigger');
  };

  this.getSize = (table) => {
    let size = 22;

    if (!table.collapsed) {
      size += 18 * table.columns.length;
    }

    return size;
  };

  this.isEmpty = function isEmpty() {
    return this.schema === undefined || this.schema.length === 0;
  };
  this.flipToggleVersionedTables = (versionToggle, toggleString) => {
    if (versionToggle === false) {
      this.versionToggle = true;
      this.versionFilter = toggleString;
    } else {
      this.versionToggle = false;
      this.versionFilter = 'abcdefghijklmnop';
    }
  };

  this.itemSelected = ($event, hierarchy) => {
    $rootScope.$broadcast('query-editor.paste', hierarchy.join('.'));
    $event.preventDefault();
    $event.stopPropagation();
  };
}

const SchemaBrowser = {
  bindings: {
    schema: '<',
    tabletogglestring: '<',
    onRefresh: '&',
    flipToggleVersionedTables: '&',
  },
  controller: SchemaBrowserCtrl,
  template,
};

export default function init(ngModule) {
  ngModule.component('schemaBrowser', SchemaBrowser);
}
