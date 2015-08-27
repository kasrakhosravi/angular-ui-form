var form = require('../../helpers/example.po.js');

describe('ui-form', function() {

    describe('field-choice', function() {

        it('should fill field choices in field choice form', function () {
            var sampleFieldChoice = {
                Food: 'Burger',
                Addon: 'Double Whopper',
                Drink: 'Lemonade',
                Sides: [
                    'French Fries',
                    'Garden Salad',
                    'Cheese Sticks',
                    'Parmesan Bread Bites'
                ],
                Dessert: [
                    'Panna Cotta',
                    'Blueberry Tart',
                    'Raspberry Parfait',
                    'Chocolate Cake'
                ]
            };

            browser.get('#/ui/form/docs/examples/field-choice');

            form.setFormData(sampleFieldChoice);

            expect(form.getFormData()).toEqual(sampleFieldChoice);

        });

    });

});
