describe('Field Text', function() {
    var $compile,
        $rootScope;

    beforeEach(module('ui.form'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should hold a value', function() {
        var scope = $rootScope.$new();

        var formElement = angular.element(
            '<ui-field-text ng-model="data"></ui-field-text>'
        );

        var element = $compile(formElement)(scope);

        scope.$apply(function () {
            scope.data = 'foo';
        });

        expect(element.find('input[type=text]').val()).toEqual('foo');
    });

    it('should have a placeholder', function() {
        var scope = $rootScope.$new();

        var formElement = angular.element(
            '<ui-field-text ng-model="data" placeholder="foo"></ui-field-text>'
        );

        var element = $compile(formElement)(scope);

        scope.$apply(function () {
            scope.data = '';
        });

        expect(element.find('input[type=text]').prop('placeholder')).toEqual('foo');
    });

    it('should have a placeholder when input is cleared after having some data', function() {
        var scope = $rootScope.$new();

        var formElement = angular.element(
            '<ui-field-text ng-model="data" placeholder="foo"></ui-field-text>'
        );

        var element = $compile(formElement)(scope);

        scope.$apply(function () {
            scope.data = 'bar';
        });

        scope.$apply(function () {
            scope.data = '';
        });

        expect(element.find('input[type=text]').prop('placeholder')).toEqual('foo');
    });

});
