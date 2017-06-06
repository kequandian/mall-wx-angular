angular.module('wholesale.controller', ['wholesale.service'])

        .controller('WholesaleController', ['$scope','$state','$stateParams', 'WholesaleFty',
        function($scope,$state,$stateParams, WholesaleFty){

            document.title = '商品批发';
            var isCrown = false;
            initCode();
            function initCode(){
                //isCrown = $stateParams.isCrown;
                console.log(isCrown)
                if(isCrown != null && isCrown){
                    $scope.is_crown = true;
                }else{
                    $scope.is_crown = false;
                }
            }


            $scope.goToWholesalwGoodsList = function(){
                $state.go('wholesaleGoodsList');
            }

        }]);