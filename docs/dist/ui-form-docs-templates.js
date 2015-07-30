angular.module('ui.form.docs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-form/docs/examples/simple-form/template.html',
    "<h2>A very simple form</h2>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-7\">\n" +
    "        <ui-form ng-model=\"vm.data\" debug=\"vm.debug\" errors=\"vm.errors\" loading=\"vm.loading\">\n" +
    "            <ui-field-text property=\"title\"\n" +
    "                           required=\"true\"\n" +
    "                           label=\"Title\"\n" +
    "                           placeholder=\"My perfect application\"\n" +
    "                           help=\"This is a help message\"></ui-field-text>\n" +
    "            <ui-field-text property=\"email\"\n" +
    "                           required=\"true\"\n" +
    "                           label=\"Email\"\n" +
    "                           placeholder=\"email@example.com\"\n" +
    "                           help=\"This field only allows an email address using pattern attribute.\"\n" +
    "                           pattern=\" '^[a-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{2,5}$' \"></ui-field-text>\n" +
    "            <ui-field-text property=\"sku\"\n" +
    "                           readonly=\"true\"\n" +
    "                           label=\"SKU\"\n" +
    "                           help=\"This field is read-only\"></ui-field-text>\n" +
    "            <ui-field-textarea property=\"content\"\n" +
    "                               label=\"Content\"\n" +
    "                               help=\"And this is another help message\"></ui-field-textarea>\n" +
    "        </ui-form>\n" +
    "        <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"vm.saveWithErrors()\">Save, but errors</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-5\">\n" +
    "        <pre>{{ vm.data | json }}</pre>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ui-form/docs/guide/getting-started/template.html',
    "<h2>Getting Started</h2>"
  );


  $templateCache.put('ui-form/docs/main.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-3\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"list-group\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.form.docs.welcome\" class=\"list-group-item\">Welcome</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">\n" +
    "                    Examples\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.form.docs.examples.simple_form\" class=\"list-group-item\">A very simple form</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">\n" +
    "                    Guide\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.form.docs.guide.getting_started\" class=\"list-group-item\">Getting Started</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">\n" +
    "                    API\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "            <ul class=\"list-group\">\n" +
    "                <li class=\"list-group-item\">Soon...</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-9\" ui-view></div>\n" +
    "</div>"
  );


  $templateCache.put('ui-form/docs/welcome.html',
    "<h2>Welcome to ui-form!</h2>"
  );

}]);
