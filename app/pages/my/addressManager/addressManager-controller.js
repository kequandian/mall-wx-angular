angular.module('addressManager.controller', ['addressManager.service'])

    .controller('AddressManagerController', ['$scope', '$state', 'AddressManagerFty', function($scope,$state, AddressManagerFty){

        productCategory();
        function productCategory(){
            AddressManagerFty.addressListService()
                .then(function(json){
                    //alert(angular.toJson(json));
                }, function(error){
                    //alert("获取失败")
                })

        }

    }]);