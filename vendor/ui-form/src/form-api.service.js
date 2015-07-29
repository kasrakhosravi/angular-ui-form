(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .service('formApi', formApi);

    function formApi($http) {
        return {
            get: get
        };

        // -- Public Methods -- //

        /**
         * @param {string} url Url to send a GET request to.
         * @param {Array} parameters [Optional] Query string parameters to add to end of the url.
         * @param {Array} options [Optional] Additional $http options.
         * @returns {Deferred.promise}
         */
        function get(url, parameters, options) {
            return $http.get(buildUrl(url, parameters), options)
                .then(function (response) {
                    return response.data;
                })
            ;
        }

        // -- Private Methods -- //

        function buildUrl(url, parameters) {
            var qs = '', key, value;

            for (key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    value = parameters[key];
                    qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }

            if (qs.length > 0) {
                qs = qs.substring(0, qs.length - 1); //chop off last "&"
                url = url + '?' + qs;
            }

            return url;
        }
    }

})(angular);
