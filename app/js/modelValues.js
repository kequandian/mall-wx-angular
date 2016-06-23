angular.module('modelValues', [])

    .constant('text11', {
    })

    .value('orderList',{
        order_info:null,
        pay_list:null,
        payed_list:null,
        finis_list:null
    })

    .value("queryData", {
        queryInfo: "info"
    })

    //提现和信息页标识
    .value("DWStatus", {
        d_w_status: null
    })

    //退款退货状态
    .filter("refundStatus", function() {
        return function(input) {
            if(input == "CANCELED_RETURN_PENDING") {
                return "退货中";
            }
            else if(input == "CANCELED_REFUND_PENDING") {
                return "退款中";
            }
            else if(input == "CLOSED_REFUNDED") {
                return "已退款";
            }
        }
    })

    //搜索结果
    .value("searchInfo", {
        search_info: null
    })

;