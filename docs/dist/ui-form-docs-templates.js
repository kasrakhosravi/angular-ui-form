angular.module('ui.form.docs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-form/docs/examples/field-choice/template.html',
    "<h2>Field Choice (ui-field-choice)</h2>\n" +
    "<hr />\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-7\">\n" +
    "        <ui-form ng-model=\"vm.data\" debug=\"vm.debug\" errors=\"vm.errors\" loading=\"vm.loading\">\n" +
    "            <ui-field-choice property=\"Food\"\n" +
    "                             label=\"Food\"\n" +
    "                             inline-options=\"[\n" +
    "                                {\n" +
    "                                    label: 'Pizza',\n" +
    "                                    value: 'Pizza'\n" +
    "                                },\n" +
    "                                {\n" +
    "                                    label: 'Burger',\n" +
    "                                    value: 'Burger'\n" +
    "                                },\n" +
    "                                {\n" +
    "                                    label: 'Pasta',\n" +
    "                                    value: 'Pasta'\n" +
    "                                }\n" +
    "                             ]\"\n" +
    "                             selected=\"vm.selectedFood\"\n" +
    "                             help=\"What would you like to order?\"></ui-field-choice>\n" +
    "            <div ng-switch=\"vm.selectedFood.value\">\n" +
    "                <ui-field-choice property=\"Addon\"\n" +
    "                             required=\"true\"\n" +
    "                             label=\"Addon (Pizza)\"\n" +
    "                             options-root=\"food.pizza\"\n" +
    "                             remote-url=\"http://ui-form-data.getsandbox.com/menu\"\n" +
    "                             value-property=\"topping\"\n" +
    "                             label-property=\"topping\"\n" +
    "                             ng-switch-when=\"Pizza\"\n" +
    "                             help=\"You have ordered a pizza with {{ vm.data.Pizza }}\"></ui-field-choice>\n" +
    "                <ui-field-choice property=\"Addon\"\n" +
    "                             required=\"true\"\n" +
    "                             label=\"Addon (Burger)\"\n" +
    "                             options-root=\"food.burger\"\n" +
    "                             remote-url=\"http://ui-form-data.getsandbox.com/menu\"\n" +
    "                             value-property=\"type\"\n" +
    "                             label-property=\"type\"\n" +
    "                             ng-switch-when=\"Burger\"\n" +
    "                             help=\"You have ordered a {{ vm.data.Burger }}\"></ui-field-choice>\n" +
    "                <ui-field-choice property=\"Addon\"\n" +
    "                             required=\"true\"\n" +
    "                             label=\"Addon (Pasta)\"\n" +
    "                             options-root=\"food.pasta\"\n" +
    "                             remote-url=\"http://ui-form-data.getsandbox.com/menu\"\n" +
    "                             value-property=\"type\"\n" +
    "                             label-property=\"type\"\n" +
    "                             ng-switch-when=\"Pasta\"\n" +
    "                             help=\"You have ordered a {{ vm.data.Pasta }}\"></ui-field-choice>\n" +
    "            </div>\n" +
    "            <ui-field-choice property=\"Sides\"\n" +
    "                             label=\"Sides\"\n" +
    "                             multiple=\"true\"\n" +
    "                             options-root=\"food.sides\"\n" +
    "                             remote-url=\"http://ui-form-data.getsandbox.com/menu\"\n" +
    "                             value-property=\"type\"\n" +
    "                             label-property=\"type\"\n" +
    "                             help=\"I suggest you to try few of our sides\"></ui-field-choice>\n" +
    "            <ui-field-choice property=\"Drink\"\n" +
    "                             label=\"Drink\"\n" +
    "                             required=\"true\"\n" +
    "                             expanded=\"true\"\n" +
    "                             options-root=\"food.drink\"\n" +
    "                             remote-url=\"http://ui-form-data.getsandbox.com/menu\"\n" +
    "                             value-property=\"type\"\n" +
    "                             label-property=\"type\"\n" +
    "                             help=\"You have ordered {{ vm.data.Drink }}. Anything else?\"></ui-field-choice>\n" +
    "            <ui-field-choice property=\"Dessert\"\n" +
    "                             label=\"Dessert\"\n" +
    "                             expanded=\"true\"\n" +
    "                             multiple=\"true\"\n" +
    "                             options-root=\"food.dessert\"\n" +
    "                             remote-url=\"http://ui-form-data.getsandbox.com/menu\"\n" +
    "                             value-property=\"type\"\n" +
    "                             label-property=\"type\"></ui-field-choice>\n" +
    "        </ui-form>\n" +
    "        <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"vm.saveWithErrors()\">Save, but errors</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-5\">\n" +
    "        <pre>{{ vm.data | json }}</pre>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<hr />\n" +
    "<iframe height='711' scrolling='no' src='//codepen.io/KasraKhosravi/embed/Jdzppy/?height=711&theme-id=17740&default-tab=html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/KasraKhosravi/pen/Jdzppy/'>ui-form (simple form example)</a> by Kasra (<a href='http://codepen.io/KasraKhosravi'>@KasraKhosravi</a>) on <a href='http://codepen.io'>CodePen</a>.\n" +
    "</iframe>"
  );


  $templateCache.put('ui-form/docs/examples/field-text/template.html',
    "<h2>Field Text (ui-field-text)</h2>\n" +
    "<hr />\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-7\">\n" +
    "        <ui-form ng-model=\"vm.data\" debug=\"vm.debug\" errors=\"vm.errors\" loading=\"vm.loading\">\n" +
    "            <ui-field-text property=\"name\"\n" +
    "                           label=\"Name\"\n" +
    "                           help=\"Nice to meet you {{ vm.data.name }}\"></ui-field-text>\n" +
    "            <ui-field-text property=\"title\"\n" +
    "                           label=\"Title\"\n" +
    "                           placeholder=\"Developer\"></ui-field-text>\n" +
    "            <ui-field-text property=\"company\"\n" +
    "                           readonly=\"true\"\n" +
    "                           label=\"Company (Disabled)\"\n" +
    "                           placeholder=\"Ravaj\"></ui-field-text>\n" +
    "            <ui-field-text property=\"address\"\n" +
    "                           label=\"Address\"></ui-field-text>\n" +
    "            <ui-field-text property=\"city\"\n" +
    "                           label=\"City\"></ui-field-text>\n" +
    "            <ui-field-text property=\"state\"\n" +
    "                           label=\"State\"></ui-field-text>\n" +
    "            <ui-field-text property=\"email\"\n" +
    "                           required=\"true\"\n" +
    "                           label=\"Email\"\n" +
    "                           placeholder=\"email@example.com\"\n" +
    "                           pattern=\" '^[a-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{2,5}$' \"></ui-field-text>\n" +
    "        </ui-form>\n" +
    "        <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"vm.saveWithErrors()\">Save, but errors</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-5\">\n" +
    "        <pre>{{ vm.data | json }}</pre>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<hr />\n" +
    "<iframe height='711' scrolling='no' src='//codepen.io/KasraKhosravi/embed/XbwRaW/?height=711&theme-id=17740&default-tab=html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/KasraKhosravi/pen/XbwRaW/'>XbwRaW</a> by Kasra (<a href='http://codepen.io/KasraKhosravi'>@KasraKhosravi</a>) on <a href='http://codepen.io'>CodePen</a>.\n" +
    "</iframe>"
  );


  $templateCache.put('ui-form/docs/examples/simple-form/template.html',
    "<h2>A very simple form</h2>\n" +
    "<hr />\n" +
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
    "</div>\n" +
    "<hr />\n" +
    "<iframe height='483' scrolling='no' src='//codepen.io/KasraKhosravi/embed/Jdzppy/?height=483&theme-id=17740&default-tab=html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/KasraKhosravi/pen/Jdzppy/'>ui-form (simple form example)</a> by Kasra (<a href='http://codepen.io/KasraKhosravi'>@KasraKhosravi</a>) on <a href='http://codepen.io'>CodePen</a>.\n" +
    "</iframe>"
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
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.form.docs.examples.field_choice\" class=\"list-group-item\">Field Choice</a>\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.form.docs.examples.field_text\" class=\"list-group-item\">Field Text</a>\n" +
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
