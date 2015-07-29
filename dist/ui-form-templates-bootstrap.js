angular.module('ui.form').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-form/field-checkbox/field-checkbox.html',
    "<div class=\"form-group\" ng-class=\"{ 'has-error': vm.errors.errors.length }\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "        <div class=\"checkbox\">\n" +
    "            <label ng-if=\"vm.label\">\n" +
    "                <input type=\"checkbox\" class=\"checkbox-inline\" ng-model=\"vm.data\" ng-true-value=\" '1' \"> {{ ::vm.label | translate }}\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <span ng-repeat=\"error in vm.errors.errors track by $index\" class=\"help-block\">\n" +
    "            {{  error | translate }}\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('ui-form/field-choice/field-choice.html',
    "<ui-field-row>\n" +
    "\n" +
    "    <!-- Single value select without expanding -->\n" +
    "    <select ng-if=\"!vm.multiple() && !vm.expanded()\"\n" +
    "            class=\"form-control\"\n" +
    "            ng-model=\"vm.data\"\n" +
    "            ng-options=\"option[vm.valueProperty].toString() as option[vm.labelProperty] | translate for option in vm.options\">\n" +
    "    </select>\n" +
    "\n" +
    "    <!-- Multiple value select without expanding -->\n" +
    "    <select ng-if=\"vm.multiple() && !vm.expanded()\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"vm.data\"\n" +
    "        multiple\n" +
    "        ng-options=\"option[vm.valueProperty].toString() as option[vm.labelProperty] | translate for option in vm.options\">\n" +
    "    </select>\n" +
    "\n" +
    "    <!-- Single value select via radio button -->\n" +
    "    <div ng-if=\"!vm.multiple() && vm.expanded()\"\n" +
    "         class=\"form\">\n" +
    "        <label ng-repeat=\"option in vm.options\">\n" +
    "            <input type=\"radio\" ng-model=\"vm.data\" value=\" {{ option[vm.valueProperty].toString() }} \"> {{ option[vm.labelProperty] | translate }}\n" +
    "        </label><br />\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Multiple value select via checkbox button -->\n" +
    "    <div ng-if=\"vm.multiple() && vm.expanded()\"\n" +
    "         class=\"form\">\n" +
    "        <label ng-repeat=\"option in vm.options\">\n" +
    "            <input type=\"checkbox\" ng-model=\"vm.data[$index]\" value=\" {{ option[vm.valueProperty].toString() }} \"> {{ option[vm.labelProperty] | translate }}\n" +
    "        </label><br />\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Loading spinner when fetching remote values -->\n" +
    "    <ui-form-loading ng-if=\"vm.loading\"></ui-form-loading>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-collection/field-collection.html',
    "<ui-field-row>\n" +
    "    <ul class=\"field-set\">\n" +
    "        <li ng-repeat=\"$item in vm.data track by $index\" class=\"row\">\n" +
    "            <ui-fieldset class=\"col-sm-11\" property=\"{{ $index }}\">\n" +
    "                <ui-transclude-here></ui-transclude-here>\n" +
    "            </ui-fieldset>\n" +
    "            <a class=\"col-sm-1 btn icon icon-close pull-right flip\" ng-click=\"vm.removeItem($index)\"></a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div class=\"btn-group\">\n" +
    "        <button ng-click=\"vm.addItem()\" class=\"btn btn-default field-collection-add-button\">\n" +
    "            <i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "            {{ 'ui.form.field.collection.add_button' | translate }}\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-color/field-color.html',
    "<ui-field-row>\n" +
    "    <input type=\"email\" class=\"form-control\" ng-model=\"vm.data\" />\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-datepicker/field-datepicker.html',
    "<ui-field-row>\n" +
    "    <div ng-switch=\"vm.calendar()\">\n" +
    "        <div ng-switch-default>\n" +
    "            <datepicker ng-model=\"vm.data\" min-date=\"vm.minDate()\" show-weeks=\"true\"></datepicker>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-switch-when=\"persian\">\n" +
    "            <persian-datepicker ng-model=\"vm.data\" min-date=\"vm.minDate()\" show-weeks=\"true\" starting-day=\"6\"></persian-datepicker>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- TODO: Add more calendars here -->\n" +
    "    </div>\n" +
    "</ui-field-row>\n"
  );


  $templateCache.put('ui-form/field-editor/field-editor.html',
    "<ui-field-row>\n" +
    "    <text-angular ng-model=\"vm.data\"></text-angular>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-email/field-email.html',
    "<ui-field-row>\n" +
    "    <input type=\"email\" class=\"form-control\" ng-model=\"vm.data\" />\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-image/field-image.html',
    "<ui-field-row>\n" +
    "    <div ui-field-image-uploader>\n" +
    "\n" +
    "        <!-- Gallery of all current & uploading items -->\n" +
    "        <ul class=\"gallery clearfix\">\n" +
    "\n" +
    "            <!-- If single-item image field -->\n" +
    "            <li ng-if=\"!vm.multiple() && vm.data\">\n" +
    "                <div class=\"thumbnail\">\n" +
    "                    <img ng-src=\"{{ vm.data | thumbnail: 'admin_upload_preview' }}\" />\n" +
    "                    <a ng-click=\"vm.removeImage()\" class=\"delete\">&times;</a>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- If multiple-item image field -->\n" +
    "            <li ng-if=\"vm.multiple()\" ng-repeat=\"image in vm.data track by $index\">\n" +
    "                <div class=\"thumbnail\">\n" +
    "                    <img ng-src=\"{{ image | thumbnail: 'admin_upload_preview' }}\" />\n" +
    "                    <a ng-click=\"vm.removeImage(image)\" class=\"delete\">&times;</a>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Items in upload queue -->\n" +
    "            <li ng-repeat=\"item in queue track by item.id\" tooltip=\"{{ item.file.lastError }}\" tooltip-enable=\"item.file.status === plupload.FAILED\">\n" +
    "                <div class=\"thumbnail\" ng-class=\"{ 'failed': item.file.status === plupload.FAILED }\">\n" +
    "                    <a ng-click=\"cancelUpload(item)\" class=\"delete\">&times;</a>\n" +
    "                    <ui-field-image-preview image=\"item.file\"></ui-field-image-preview>\n" +
    "                    <progressbar ng-if=\"item.file.status === plupload.UPLOADING\" max=\"100\" value=\"item.percent\" type=\"info\">{{ item.percent }}%</progressbar>\n" +
    "                    <button ng-if=\"item.file.status === plupload.FAILED\" class=\"btn btn-danger retry\" ng-click=\"retryUpload(item)\"><i class=\"glyphicon glyphicon-refresh\"></i></button>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Help when there's nothing in gallery -->\n" +
    "            <li class=\"instructions\" ng-if=\"vm.multiple() ? (!vm.data.length && !queue.length) : (!vm.data)\">\n" +
    "                {{ 'ui.form.field.image.instructions' | translate }}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <!-- Buttons of our image field -->\n" +
    "        <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-default field-image-upload-button\">\n" +
    "                <i class=\"glyphicon glyphicon-upload\"></i>\n" +
    "                {{ 'ui.form.field.image.upload_button' | translate }}\n" +
    "            </button>\n" +
    "            <button ng-if=\"vm.browseButton()\" ng-click=\"vm.browseButton()(vm, $scope)\" class=\"btn btn-default field-image-browser-button\">\n" +
    "                <i class=\"glyphicon glyphicon-folder-open\"></i>\n" +
    "                {{ 'ui.form.field.image.browse_button' | translate }}\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-number/field-number.html',
    "<ui-field-row>\n" +
    "    <div class=\"input-group\">\n" +
    "        <span class=\"input-group-addon\" ng-if=\"vm.append()\">{{ vm.append() }}</span>\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"vm.data\" fcsa-number=\"{ preventInvalidInput: true }\" />\n" +
    "        <span class=\"input-group-addon\" ng-if=\"vm.prepend()\">{{ vm.prepend() }}</span>\n" +
    "    </div>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-password/field-password.html',
    "<ui-field-row>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <input type=\"password\" class=\"form-control\" ng-model=\"vm.data\" />\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <input type=\"password\" class=\"form-control\" ng-model=\"vm.confirmValue\" placeholder=\"{{ vm.confirmLabel }}\" />\n" +
    "    </div>\n" +
    "</ui-field-row>\n"
  );


  $templateCache.put('ui-form/field-row/field-row.html',
    "<div class=\"form-group\" ng-class=\"{ 'has-error': vm.errors.errors.length }\">\n" +
    "    <label ng-if=\"vm.label\" class=\"col-sm-2 control-label\">{{ ::vm.label | translate }}</label>\n" +
    "    <div ng-class=\"{ 'col-sm-10' : vm.label, 'col-sm-12' : !vm.label }\">\n" +
    "        <ng-transclude></ng-transclude>\n" +
    "        <span ng-repeat=\"error in vm.errors.errors track by $index\" class=\"help-block\">\n" +
    "            {{  error | translate }}\n" +
    "        </span>\n" +
    "        <p ng-if=\"vm.help\" class=\"help-block\">{{ vm.help | translate }}</p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ui-form/field-tab/field-tab.html',
    "<ui-field-row>\n" +
    "    <tabset>\n" +
    "        <tab ng-repeat=\"$tab in vm.tabs track by $index\">\n" +
    "            <tab-heading>\n" +
    "                <span ng-class=\"{ 'text-danger': vm.hasAnyError() }\">{{ $tab[vm.labelProperty] | translate }}</span>\n" +
    "            </tab-heading>\n" +
    "            <ui-fieldset class=\"col-sm-11\" property=\"{{ $tab[vm.valueProperty] }}\">\n" +
    "                <ui-transclude-here></ui-transclude-here>\n" +
    "            </ui-fieldset>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "    <div ng-if=\"!vm.tabs.length\" translate=\"ui.form.field.tabs.loading\"></div>\n" +
    "    <ui-form-loading ng-if=\"vm.loading\"></ui-form-loading>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-text/field-text.html',
    "<ui-field-row>\n" +
    "    <input type=\"text\" class=\"form-control\"\n" +
    "           ng-model=\"vm.data\"\n" +
    "           ng-pattern=\"vm.pattern()\"\n" +
    "           ng-required=\"vm.required()\"\n" +
    "           ng-disabled=\"vm.disabled()\"\n" +
    "           ng-readonly=\"vm.readonly()\"\n" +
    "           placeholder=\"{{ ::vm.placeholder | translate }}\" />\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-textarea/field-textarea.html',
    "<ui-field-row>\n" +
    "    <textarea class=\"form-control\"\n" +
    "              ng-model=\"vm.data\"\n" +
    "              ng-required=\"vm.required()\"\n" +
    "              ng-pattern=\"vm.pattern()\"\n" +
    "              placeholder=\"{{ ::vm.placeholder | translate }}\"></textarea>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-tree/field-tree-node.html',
    "<i class=\"tree-node-icon\"\n" +
    "   ng-click=\"node.children.length > 0 && toggle(this)\">\n" +
    "</i>\n" +
    "<div class=\"tree-node-anchor\"\n" +
    "   ng-click=\"vm.toggleNode(node)\">\n" +
    "    <i ng-if=\"vm.selectedNodes.indexOf(node) > -1\" class=\"text-info glyphicon glyphicon-ok\"></i>\n" +
    "    <i ng-if=\"node.children.length > 0\" class=\"text-muted glyphicon glyphicon-folder-open\"></i>\n" +
    "    {{ node[vm.labelProperty] }}\n" +
    "</div>\n" +
    "<ol ui-tree-nodes=\"\" ng-model=\"node.children\" ng-class=\"{ 'hidden': collapsed }\">\n" +
    "    <li class=\"tree-node\"\n" +
    "        ui-tree-node=\"\"\n" +
    "        ng-repeat=\"node in node.children\"\n" +
    "        ng-include=\"'ui-form/field-tree/field-tree-node.html'\"\n" +
    "        ng-class=\"{\n" +
    "            'tree-node-leaf': !node.children || !node.children.length,\n" +
    "            'tree-node-last': $last,\n" +
    "            'tree-node-open': !collapsed,\n" +
    "            'tree-node-closed': collapsed\n" +
    "        }\">\n" +
    "    </li>\n" +
    "</ol>"
  );


  $templateCache.put('ui-form/field-tree/field-tree.html',
    "<ui-field-row>\n" +
    "    <!-- Angular UI Tree -->\n" +
    "    <div ui-tree=\"\" callbacks=\"vm.callbacks\" data-drag-delay=\"500\" data-drag-enabled=\"false\">\n" +
    "        <ol ui-tree-nodes=\"\" ng-model=\"vm.nodes\">\n" +
    "            <li class=\"tree-node\"\n" +
    "                ui-tree-node=\"\"\n" +
    "                ng-repeat=\"node in vm.nodes\"\n" +
    "                ng-include=\"'ui-form/field-tree/field-tree-node.html'\"\n" +
    "                ng-class=\"{\n" +
    "                    'tree-node-leaf': !node.children || !node.children.length,\n" +
    "                    'tree-node-last': $last,\n" +
    "                    'tree-node-open': !collapsed,\n" +
    "                    'tree-node-closed': collapsed\n" +
    "                }\">\n" +
    "            </li>\n" +
    "        </ol>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Loading spinner when fetching remote values -->\n" +
    "    <ui-form-loading ng-if=\"vm.loading\"></ui-form-loading>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/field-unit-value/field-unit-value.html',
    "<ui-field-row>\n" +
    "    <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"vm.maskedData\" fcsa-number=\"{ preventInvalidInput: true }\" />\n" +
    "        <div class=\"input-group-btn\">\n" +
    "            <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
    "                {{ vm.selectedUnit.label | translate }} <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li ng-repeat=\"unit in ::vm.units track by $index\">\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"vm.selectUnit(unit)\">\n" +
    "                        {{ unit.label | translate }}\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ui-field-row>"
  );


  $templateCache.put('ui-form/fieldset/fieldset.html',
    "<div class=\"form-fieldset\">\n" +
    "    <div class=\"fieldset-legend col-sm-2\" ng-class=\"{ 'hidden': !vm.legend() }\">\n" +
    "        <span class=\"h3\">{{ vm.legend().title | translate }}</span>\n" +
    "        <p class=\"text-muted\">{{ vm.legend().info | translate }}</p>\n" +
    "    </div>\n" +
    "    <div class=\"fieldset-controls\" ng-class=\"{ 'col-sm-10' : vm.legend() }\">\n" +
    "        <ui-transclude-here></ui-transclude-here>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ui-form/form/form.html',
    "\n" +
    "<form novalidate class=\"form-horizontal\" ng-class=\"{ 'loading': vm.loading }\" autocomplete=\"false\">\n" +
    "\n" +
    "    <!-- Form errors and validation messages -->\n" +
    "    <div class=\"alert alert-danger\" role=\"alert\"\n" +
    "         ng-repeat=\"error in vm.errors.errors track by $index\">\n" +
    "        {{ error | translate }}\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Transclude the form content here -->\n" +
    "    <ui-transclude-here></ui-transclude-here>\n" +
    "\n" +
    "    <!-- A loading wrapper when form is in loading mode -->\n" +
    "    <ui-form-loading ng-if=\"vm.loading\"></ui-form-loading>\n" +
    "\n" +
    "    <!-- Debug -->\n" +
    "    <hr ng-if=\"vm.debug()\" />\n" +
    "    <div class=\"debug-wrapper\" ng-if=\"vm.debug()\" dir=\"ltr\">\n" +
    "        <h2 class=\"h2\">Form Data</h2>\n" +
    "        <pre>{{ vm | json }}</pre>\n" +
    "        <hr />\n" +
    "        <h2 class=\"h2\">Form Errors</h2>\n" +
    "        <pre>{{ vm.errors | json }}</pre>\n" +
    "    </div>\n" +
    "\n" +
    "</form>"
  );


  $templateCache.put('ui-form/loading/loading.html',
    "<svg version=\"1.1\"\n" +
    "\tclass=\"svg-loader\"\n" +
    "\txmlns=\"http://www.w3.org/2000/svg\"\n" +
    "\txmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
    "\tx=\"0px\"\n" +
    "\ty=\"0px\"\n" +
    "\tviewBox=\"0 0 80 80\"\n" +
    "\txml:space=\"preserve\">\n" +
    "\n" +
    "\t<path\n" +
    "\t\tfill=\"#082430\"\n" +
    "\t\td=\"M40,72C22.4,72,8,57.6,8,40C8,22.4,\n" +
    "\t\t22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2\n" +
    "\t\ts-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,\n" +
    "\t\t28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z\"\n" +
    "\t>\n" +
    "\t\t<animateTransform\n" +
    "\t\t\tattributeType=\"xml\"\n" +
    "\t\t\tattributeName=\"transform\"\n" +
    "\t\t\ttype=\"rotate\"\n" +
    "\t\t\tfrom=\"0 40 40\"\n" +
    "\t\t\tto=\"360 40 40\"\n" +
    "\t\t\tdur=\"0.6s\"\n" +
    "\t\t\trepeatCount=\"indefinite\"\n" +
    "\t\t/>\n" +
    "\t</path>\n" +
    "</svg>"
  );

}]);
