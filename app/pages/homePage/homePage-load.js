angular.module('homePage.load', []).service('LazyLoad', ['$q', '$ocLazyLoad',
    function ($q, $ocLazyLoad) {
        this.get = function () {
            var deferred = $q.defer();

            $ocLazyLoad.load('JqueryWeUI');

            deferred.resolve('success');

            return deferred.promise;
        };
    }]);