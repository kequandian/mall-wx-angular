(function () {
    'use strict';
    var START_REQUEST_TAG = 'START_REQUEST';
    var END_REQUEST_TAG = 'END_REQUEST';

    angular.module('spinner', [])
        .factory('httpInterceptor', function ($q, $rootScope, $log) {

            var numLoadings = 0;

            return {
                request: function (config) {

                    numLoadings++;

                    // Show loader
                    $rootScope.$broadcast(START_REQUEST_TAG);
                    return config || $q.when(config)

                },
                response: function (response) {

                    if ((--numLoadings) === 0) {
                        // Hide loader
                        $rootScope.$broadcast(END_REQUEST_TAG);
                    }

                    return response || $q.when(response);

                },
                responseError: function (response) {

                    if (!(--numLoadings)) {
                        // Hide loader
                        $rootScope.$broadcast(END_REQUEST_TAG);
                    }

                    return $q.reject(response);
                }
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
        })
        .directive("loader", localSpinner);

    localSpinner.$inject = ['$rootScope'];

    function localSpinner($rootScope) {
        return function($scope, element, attrs) {
            $scope.$on(START_REQUEST_TAG, function () {
                if (element.hasClass("spinner-hidden")) {
                    element.removeClass("spinner-hidden")
                }
            });
            return $scope.$on(END_REQUEST_TAG, function () {
                if(!element.hasClass("spinner-hidden")){
                    element.addClass("spinner-hidden")
                }
            });
        }
    }

})();