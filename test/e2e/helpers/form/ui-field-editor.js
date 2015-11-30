var _ = require('lodash');
var util = require('../util');
var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        var element = pageObject.getElement().element(by.css('[contenteditable]')),
            result;

        result = element
            .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"))
            .sendKeys(protractor.Key.BACK_SPACE)
            .sendKeys(data);

        browser.sleep(1000);

        return result;
    },

    getData: function(pageObject) {
        return pageObject.getElement().element(by.model('vm.data')).element(by.css('textarea[ng-model=html]'))
            .getAttribute('value')
            .then(function (data) {
                return stripTags(data);
            });

        function stripTags(input, allowed) {
            allowed = (((allowed || '') + '')
                .toLowerCase()
                .match(/<[a-z][a-z0-9]*>/g) || [])
                .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
            return input.replace(commentsAndPhpTags, '')
                .replace(tags, function($0, $1) {
                    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
                });
        }
    },

    clearData: function(pageObject) {
        var element = pageObject.getElement().element(by.css('[contenteditable]')),
            result;

        result = element
            .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"))
            .sendKeys(protractor.Key.BACK_SPACE)
            .clear();

        return result;
    },

    getErrors: DefaultHelper.getErrors
};