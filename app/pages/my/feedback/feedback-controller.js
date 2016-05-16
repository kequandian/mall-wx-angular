angular.module('feedback.controller', ['feedback.service'])

    .controller('FeedbackController', ['$scope', '$state', 'FeedbackFty', function($scope, FeedbackFty){

        //title li
        $scope.feedback_nav = [{
            'id':'1',
            'name':'产品体验问题'
        },{
            'id':'2',
            'name':'商城功能问题'
        }];

        //nav 样式
        $scope.currentId = 1;
        $scope.aboutProducts = false;
        $scope.aboutShop = true;
        $scope.clickme = function(id) {
            $scope.currentId = id;
            if(id == 1){
                $scope.aboutProducts = false;
                $scope.aboutShop = true;
            }else if(id == 2){
                $scope.aboutProducts = true;
                $scope.aboutShop = false;
            }
        };
    }]);