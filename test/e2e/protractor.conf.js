exports.config = {
    allScriptsTimeout: 11000,
    baseUrl: 'http://localhost:8000/docs/',
    capabilities: {
        'browserName': 'firefox'
    },

    specs: ['specs/**/*.spec.js'],

    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true
    },

    onPrepare: function() {
        browser.driver.manage().window().setSize(1366, 768);
    }
};