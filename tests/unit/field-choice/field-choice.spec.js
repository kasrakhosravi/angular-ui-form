describe('Field Choice', function() {
    var $compile,
        $rootScope,
        scope,
        element;

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

    describe('inlineOptions', function() {
        var scope,
            element;

        beforeEach(inject(function () {
            scope = $rootScope.$new();
            var formElement = angular.element(
                '<ui-field-choice ng-model="data" inline-options="inlineOptions" required="true"></ui-field-choice>'
            );
            element = $compile(formElement)(scope);
        }));

        it('should fill select options from provided key-valued inline options', function () {
            compileChoiceField(
                'inline-options="inlineOptions"'
            );

            scope.$apply(function () {
                scope.inlineOptions = {
                    foo: 'bar',
                    baz: 'ban'
                };

                scope.data = 'ban';
            });

            expect(element.find('option').length).toBe(2);
        });

        it('should fill select options from provided associated-array of inline options',
            function () {
                compileChoiceField(
                    'inline-options="inlineOptions" label-property="label" value-property="value"'
                );

                scope.$apply(function () {
                    scope.inlineOptions = [
                        {label: 'foo', value: 'bar'},
                        {label: 'baz', value: 'ban'}
                    ];

                    scope.data = 'ban';
                });

                expect(element.find('option').length).toBe(2);
            }
        );

        it('should fill select options from provided simple array of inline options', function () {
            compileChoiceField(
                'inline-options="inlineOptions" label-property="label" value-property="value"'
            );

            scope.$apply(function () {
                scope.inlineOptions = ['foo', 'bar'];
            });

            expect(element.find('option').length).toBe(2);
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

    });
});
