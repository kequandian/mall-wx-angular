angular.module('seller.session', [])
    .value('UserInfo', {
        register_date: '',
        recommender_id:null,
        recommender_name:null,
        info:null
    })
    //提现和信息页标识
    .value("DWStatus", {
        d_w_status: null
    })
;

