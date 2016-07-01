angular.module('seller.session', [])
    .value('UserInfo', {
        register_date: ''
    })
    .value('BalanceSession', {
        balance: '0'
    })

    //提现和信息页标识
    .value("DWStatus", {
        d_w_status: null
    })
;

