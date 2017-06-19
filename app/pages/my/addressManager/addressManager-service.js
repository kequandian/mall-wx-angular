angular.module('addressManager.service', [])
    .factory('AddressManagerFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            getContacts: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/contact';
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            deleteContact: function (id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/contact/' + id;
                $http({
                    method: 'DELETE',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            addContact: function (data) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/contact';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            editContact: function (id, data) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/contact/' + id;
                $http({
                    method: 'PUT',
                    url: url,
                    data: data,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        //console.log('edit contact done.');
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                        console.log(data);
                    });
                return deferred.promise;
            },

            defaultContact: function(id){
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/default_contact/' + id;
                $http({
                    method: 'PUT',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        //console.log('edit contact done.');
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                        console.log(data);
                    });
                return deferred.promise;
            },

            getPCD: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/pcd?all=true';
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            //±£¥Ê≈‰ÀÕµÿ÷∑
            saveWholesalePCDService: function (pcdBody) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/wholesale_region';
                $http.post(url,pcdBody,{
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);