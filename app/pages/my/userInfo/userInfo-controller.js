angular.module('userInfo.controller', ['userInfo.service'])

    .controller('UserInfoController', ['$scope', 'UserInfoFty', function($scope, UserInfoFty){

        myInput();
        function myInput(){
            $("#my-input").calendar();
        }
    }]);