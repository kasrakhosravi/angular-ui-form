describe('Field Choice', function() {
    var $compile, $rootScope, scope, element;

    function compileChoiceField(config) {
        scope = $rootScope.$new();
        var formElement = angular.element(
            '<ui-field-choice ng-model="data" ' + config + '></ui-field-choice>'
        );
        element = $compile(formElement)(scope);
    }

    beforeEach(module('ui.form'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    // Inline Options
    it('should fill select options from provided key-valued inline options', function () {
        compileChoiceField(
            'inline-options="inlineOptions"'
        );

        scope.$apply(function () {
            scope.inlineOptions = {
                foo: 'bar',
                baz: 'ban'
            };
        });

        expect(element.find('option').length).toBe(3);
    });

    it('should fill select options from provided simple array of inline options', function () {
        compileChoiceField(
            'inline-options="inlineOptions"'
        );

        scope.$apply(function () {
            scope.inlineOptions = ['foo', 'bar'];
        });

        expect(element.find('option').length).toBe(3);
    });

    it('should fill select options from provided associated-array of inline options', function () {
        compileChoiceField(
            'inline-options="inlineOptions" label-property="label" value-property="value"'
        );

        scope.$apply(function () {
            scope.inlineOptions = [
                {label: 'foo', value: 'bar'},
                {label: 'baz', value: 'ban'}
            ];
        });

        expect(element.find('option').length).toBe(3);
        });

    it('should have value of selected option', function () {
        compileChoiceField(
            'inline-options="inlineOptions" label-property="label" value-property="value"'
        );

        scope.$apply(function () {
            scope.inlineOptions = [
                {label: 'foo', value: 'bar'},
                {label: 'baz', value: 'ban'}
            ];
        });

        scope.$apply(function () {
            scope.data = 'bar';
        });

        expect(element.find('select').val()).toBe('0');

        scope.$apply(function () {
            scope.data = 'ban';
        });

        expect(element.find('select').val()).toBe('1');
    });

    // Inline Options, Required
    it('should have an extra field when it is a combo box (single and not expanded)', function() {
        compileChoiceField(
            'inline-options="inlineOptions" required="required"'
        );

        scope.$apply(function () {
            scope.inlineOptions = {
                foo: 'bar',
                baz: 'ban'
            };
        });

        expect(element.find('option').length).toBe(3);

        scope.$apply(function () {
            scope.required = true;
        });

        expect(element.find('option').length).toBe(2);
    });

    it('should select the first item when vm.data is undefined', function () {
        compileChoiceField(
            'inline-options="inlineOptions" label-property="label" value-property="value" required="true"'
        );

        scope.$apply(function () {
            scope.inlineOptions = [
                {label: 'foo', value: 'bar'},
                {label: 'baz', value: 'ban'}
            ];
        });

        scope.$apply(function () {
            scope.data = undefined;
        });

        expect(element.find('select').val()).toBe('0');
    });

    it('should select the first item when vm.data is null', function () {
        compileChoiceField(
            'inline-options="inlineOptions" label-property="label" value-property="value" required="true"'
        );

        scope.$apply(function () {
            scope.inlineOptions = [
                {label: 'foo', value: 'bar'},
                {label: 'baz', value: 'ban'}
            ];
        });

        scope.$apply(function () {
            scope.data = null;
        });

        expect(element.find('select').val()).toBe('0');
    });

    it('should select the first item when vm.data is an empty string', function () {
        compileChoiceField(
            'inline-options="inlineOptions" label-property="label" value-property="value" required="true"'
        );

        scope.$apply(function () {
            scope.inlineOptions = [
                {label: 'foo', value: 'bar'},
                {label: 'baz', value: 'ban'}
            ];
        });

        scope.$apply(function () {
            scope.data = "";
        });

        expect(element.find('select').val()).toBe('0');
    });
});
