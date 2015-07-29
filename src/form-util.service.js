(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .factory('formUtil', formUtil);

    function formUtil($injector, $parse) {
        var objectPath = objectPathFactory();

        return {
            bindValidityErrors: bindValidityErrors,
            defaults: generateDefaultsFn(),
            formatNumber: formatNumber,
            humanize: humanize,
            objectValues: objectValues,
            twoWayBind: twoWayBind,
            deepGet: objectPath.get,
            deepSet: objectPath.set
        };

        /**
         * Binds a field's FormController to validity errors of an element inside that ui-field.
         * @param {object} $scope The scope in which this element belongs to. Usually its holding directive.
         * @param {object} $element The element to look for validity errors on its ngModel controller.
         */
        function bindValidityErrors($scope, $element) {
            var ngModel = $element.controller('ngModel'),
                vm = $scope.vm;

            $scope.$watchCollection(
                function () {
                    return ngModel.$error;
                },
                function (errors) {
                    vm.resetErrors();
                    for (var name in errors) {
                        vm.raiseError('ui.form.error.' + name);
                    }
                }
            );
        }

        function generateDefaultsFn() {
            return _.partialRight(_.merge, function recursiveDefaults() {
                // Ensure dates and arrays are not recursively merged
                if (_.isArray(arguments[0]) || _.isDate(arguments[0])) {
                    return arguments[0];
                }
                return _.merge(arguments[0], arguments[1], recursiveDefaults);
            });
        }

        function formatNumber(number, decimals, decPoint, thousandsSep) {
            number = (number + '')
                .replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
                dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                            .toFixed(prec);
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                .split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '')
                    .length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
            }
            return s.join(dec);
        }

        function humanize(input, walkOnKeys) {
            var textuals = [],
                inputCopy = angular.copy(input),
                textMapper = function (value) {
                    return value;
                };

            if (typeof inputCopy === 'object') {
                var keys = ['statusText', 'message', 'errors', 'children', 'data'],
                    key, index, error;
                for (index in keys) {
                    if (keys.hasOwnProperty(index)) {
                        key = keys[index];
                        if (inputCopy.hasOwnProperty(key)) {
                            error = humanize(inputCopy[key], key === 'children');
                            if (error) {
                                textuals.push(error);
                                delete inputCopy[key];
                            }
                        }
                    }
                }

                var subject, subjectErrors;
                for (subject in inputCopy) {
                    if (inputCopy.hasOwnProperty(subject)) {
                        if (parseFloat(subject) > -1 &&
                            typeof inputCopy[subject] === 'string') {
                            textuals.push(inputCopy[subject]);
                        } else if (walkOnKeys) {
                            subjectErrors = humanize(inputCopy[subject]);
                            if (subjectErrors) {
                                textuals.push('[' + subject + ']: ' + subjectErrors);
                            }
                        }
                    }
                }
            } else {
                textuals.push(inputCopy.toString ? inputCopy.toString() : inputCopy);
            }

            if ($injector.has('$translate')) {
                textMapper = $injector.get('$translate').instant;
            }

            return textuals.map(textMapper).join('\n');
        }

        function objectValues(input) {
            var tmpArr = [], key;

            for (key in input) {
                if (input.hasOwnProperty(key)) {
                    tmpArr[tmpArr.length] = input[key];
                }
            }

            return tmpArr;
        }

        function twoWayBind(parentScope, parentName, bindingContext, scopeName, isCollection) {
            var lastValue,
                parentGet, parentSet, compare;

            parentGet = $parse(parentName);

            if (parentGet.literal) {
                compare = angular.equals;
            } else {
                compare = function(a, b) { return a === b || (a !== a && b !== b); };
            }

            parentSet = parentGet.assign || function() {
                // reset the change, or we will throw this exception on every $digest
                lastValue = bindingContext[scopeName] = parentGet(parentScope);
                throw new Error('Expression `' + scopeName + '` is non-assignable!');
            };

            lastValue = bindingContext[scopeName] = parentGet(parentScope);

            var parentValueWatch = function parentValueWatch(parentValue) {
                if (!compare(parentValue, bindingContext[scopeName])) {
                    // we are out of sync and need to copy
                    if (!compare(parentValue, lastValue)) {
                        // parent changed and it has precedence
                        bindingContext[scopeName] = parentValue;
                    } else {
                        // if the parent can be assigned then do so
                        parentSet(parentScope, parentValue = bindingContext[scopeName]);
                    }
                }
                return lastValue = parentValue;
            };

            parentValueWatch.$stateful = true;

            var unwatch;
            if (isCollection) {
                unwatch = parentScope.$watchCollection(parentName, parentValueWatch);
            } else {
                unwatch = parentScope.$watch(
                    $parse(parentName, parentValueWatch),
                    null,
                    parentGet.literal
                );
            }

            parentScope.$on('$destroy', unwatch);
        }
    }

    function objectPathFactory() {
        var
            toStr = Object.prototype.toString,
            _hasOwnProperty = Object.prototype.hasOwnProperty;

        function isEmpty(value) {
            if (!value) {
                return true;
            }
            if (isArray(value) && value.length === 0) {
                return true;
            } else if (!isString(value)) {
                for (var i in value) {
                    if (_hasOwnProperty.call(value, i)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        function toString(type) {
            return toStr.call(type);
        }

        function isNumber(value) {
            return typeof value === 'number' || toString(value) === '[object Number]';
        }

        function isString(obj) {
            return typeof obj === 'string' || toString(obj) === '[object String]';
        }

        function isObject(obj) {
            return typeof obj === 'object' && toString(obj) === '[object Object]';
        }

        function isArray(obj) {
            return typeof obj === 'object' && typeof obj.length === 'number' &&
                toString(obj) === '[object Array]';
        }

        function isBoolean(obj) {
            return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
        }

        function getKey(key) {
            var intKey = parseInt(key);
            if (intKey.toString() === key) {
                return intKey;
            }
            return key;
        }

        function set(obj, path, value, doNotReplace) {
            if (isNumber(path)) {
                path = [path];
            }
            if (isEmpty(path)) {
                return obj;
            }
            if (isString(path)) {
                return set(obj, path.split('.').map(getKey), value, doNotReplace);
            }
            var currentPath = path[0];

            if (path.length === 1) {
                var oldVal = obj[currentPath];
                if (oldVal === void 0 || !doNotReplace) {
                    obj[currentPath] = value;
                }
                return oldVal;
            }

            if (obj[currentPath] === void 0) {
                //check if we assume an array
                if (isNumber(path[1])) {
                    obj[currentPath] = [];
                } else {
                    obj[currentPath] = {};
                }
            }

            return set(obj[currentPath], path.slice(1), value, doNotReplace);
        }

        function del(obj, path) {
            if (isNumber(path)) {
                path = [path];
            }

            if (isEmpty(obj)) {
                return void 0;
            }

            if (isEmpty(path)) {
                return obj;
            }
            if (isString(path)) {
                return del(obj, path.split('.'));
            }

            var currentPath = getKey(path[0]);
            var oldVal = obj[currentPath];

            if (path.length === 1) {
                if (oldVal !== void 0) {
                    if (isArray(obj)) {
                        obj.splice(currentPath, 1);
                    } else {
                        delete obj[currentPath];
                    }
                }
            } else {
                if (obj[currentPath] !== void 0) {
                    return del(obj[currentPath], path.slice(1));
                }
            }

            return obj;
        }

        var objectPath = function(obj) {
            return Object.keys(objectPath).reduce(function(proxy, prop) {
                /*istanbul ignore else*/
                if (typeof objectPath[prop] === 'function') {
                    proxy[prop] = objectPath[prop].bind(objectPath, obj);
                }

                return proxy;
            }, {});
        };

        objectPath.has = function (obj, path) {
            if (isEmpty(obj)) {
                return false;
            }

            if (isNumber(path)) {
                path = [path];
            } else if (isString(path)) {
                path = path.split('.');
            }

            if (isEmpty(path) || path.length === 0) {
                return false;
            }

            for (var i = 0; i < path.length; i++) {
                var j = path[i];
                if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
                    obj = obj[j];
                } else {
                    return false;
                }
            }

            return true;
        };

        objectPath.ensureExists = function (obj, path, value) {
            return set(obj, path, value, true);
        };

        objectPath.set = function (obj, path, value, doNotReplace) {
            return set(obj, path, value, doNotReplace);
        };

        objectPath.insert = function (obj, path, value, at) {
            var arr = objectPath.get(obj, path);
            at = ~~at;
            if (!isArray(arr)) {
                arr = [];
                objectPath.set(obj, path, arr);
            }
            arr.splice(at, 0, value);
        };

        objectPath.empty = function(obj, path) {
            if (isEmpty(path)) {
                return obj;
            }
            if (isEmpty(obj)) {
                return void 0;
            }

            var value, i;
            if (!(value = objectPath.get(obj, path))) {
                return obj;
            }

            if (isString(value)) {
                return objectPath.set(obj, path, '');
            } else if (isBoolean(value)) {
                return objectPath.set(obj, path, false);
            } else if (isNumber(value)) {
                return objectPath.set(obj, path, 0);
            } else if (isArray(value)) {
                value.length = 0;
            } else if (isObject(value)) {
                for (i in value) {
                    if (_hasOwnProperty.call(value, i)) {
                        delete value[i];
                    }
                }
            } else {
                return objectPath.set(obj, path, null);
            }
        };

        objectPath.push = function (obj, path /*, values */) {
            var arr = objectPath.get(obj, path);
            if (!isArray(arr)) {
                arr = [];
                objectPath.set(obj, path, arr);
            }

            arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
        };

        objectPath.coalesce = function (obj, paths, defaultValue) {
            var value;

            for (var i = 0, len = paths.length; i < len; i++) {
                if ((value = objectPath.get(obj, paths[i])) !== void 0) {
                    return value;
                }
            }

            return defaultValue;
        };

        objectPath.get = function (obj, path, defaultValue) {
            if (isNumber(path)) {
                path = [path];
            }
            if (isEmpty(path)) {
                return obj;
            }
            if (isEmpty(obj)) {
                return defaultValue;
            }
            if (isString(path)) {
                return objectPath.get(obj, path.split('.'), defaultValue);
            }

            var currentPath = getKey(path[0]);

            if (path.length === 1) {
                if (obj[currentPath] === void 0) {
                    return defaultValue;
                }
                return obj[currentPath];
            }

            return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
        };

        objectPath.del = function(obj, path) {
            return del(obj, path);
        };

        return objectPath;
    }

})(angular);
