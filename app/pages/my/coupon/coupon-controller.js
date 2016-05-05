angular.module('coupon.controller', ['coupon.service'])
    .controller('CouponController', ['$scope', 'CouponFty', function($scope, CouponFty){

        AllOrders();
        function AllOrders() {
            CouponFty.couponsService()
                .then(function (json) {
                    $scope.orders = json.data;
                },function (error){
                    console.log(error);
                })
        }

        //title li
        $scope.coupon_titles = [{
            'id':'1',
            'name':'未使用'
        },{
            'id':'2',
            'name':'已过期'
        },{
            'id':'3',
            'name':'已使用'
        }];

        /*
         * nav 样式
         * */
        $scope.currentId = 1;
        $scope.coupon_status_css = "pro-body-des-act";
        $scope.coupon_title_right = "coupon-title-right-zuo";
        $scope.coupon_price = "coupon-price-zuo";

        $scope.clickme = function(id) {
            $scope.currentId = id;
        };

        //排序
        $scope.couponsOrderBy = function(result){
            if(result == 1){
                $scope.orderByResult = "ACTIVATION";
                $scope.coupon_status_css = "pro-body-des-act";
                $scope.coupon_title_right = "coupon-title-right-zuo";
                $scope.coupon_price = "coupon-price-zuo";
            }else if(result == 2){
                $scope.orderByResult = "OVERDUE";
                $scope.coupon_status_css = "pro-body-des-over";
                $scope.coupon_title_right = "coupon-title-right-zhong";
                $scope.coupon_price = "coupon-price-zhong";
            }else if(result == 3){
                $scope.orderByResult = "USED";
                $scope.coupon_status_css = "pro-body-des-used";
                $scope.coupon_title_right = "coupon-title-right-you";
                $scope.coupon_price = "coupon-price-you";
            }
        };



    }]);