var form = require('../../helpers/example.po.js');

describe('ui-form', function() {

    describe('simple-form', function() {

        it('should create a new simple form', function () {
            var sampleForm = {
                title: 'Developer',
                email: 'example@example.com',
                content: 'I love programming'
            };

            browser.get('#/ui/form/docs/examples/simple-form');

            form.setFormData(sampleForm);

            expect(form.getFormData()).toEqual(sampleForm);

        });

    });

});
