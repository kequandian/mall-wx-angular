/*
 功  能：通用功能
 */
angular.module('order.common', [])
    .factory('OrderCommon', [function () {
        return {
            //订单状态
            OrderStatus: function(value){
                var result;
                switch (value){
                    case "CREATED_PAY_PENDING":
                        result = "待付款";
                        break;
                    case "CLOSED_PAY_TIMEOUT":
                        result = "支付超时";
                        break;
                    case "CLOSED_CANCELED":
                        result = "已取消";
                        break;
                    case "PAID_CONFIRM_PENDING":
                        result = "已支付";
                        break;
                    case "CONFIRMED_DELIVER_PENDING":
                        result = "待发货";
                        break;
                    case "DELIVERING":
                        result = "发货中";
                        break;
                    case "DELIVERED_CONFIRM_PENDING":
                        result = "待确认";
                        break;
                    case "CANCELED_RETURN_PENDING":
                        result = "待退货";
                        break;
                    case "CLOSED_CONFIRMED":
                        result = "已确认收货";
                        break;
                    case "CANCELED_REFUND_PENDING":
                        result = "待退款";
                        break;
                    case "CLOSED_REFUNDED":
                        result = "已退款";
                        break;
                }
                return result;
            }
        }
    }]);
