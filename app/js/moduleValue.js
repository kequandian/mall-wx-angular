angular.module('moduleValueJs',[])
    //搜索结果
    .value("searchInfo", {
        search_info: null,
        search_name: null
    })
    .value("queryData", {
        queryInfo: "info"
    })
    .value('goodListParams',{
        typeNumber: null,
        searchStatus: null,
        promoted:false
    })

    //首页分类区域
    .value('areasStatus',{
        areas_status : null
    })

    //首页商品分页number
    .value('homeProductPageNumber',{
        h_p_page_number : 1
    })

    //保存可提现金额
    .value('withdrawBalance', {
        balance: 0,
        phone:-1
    })
    .value('BalanceSession', {
        balance: '0'
    })
    //商品分类 index
    .value('cateLeftIndex',{
        cate_nav_index : 0,
        goods_list_index: 0,
        cate_detail_data_id:0
    })
    .value('PointRate', {
        rate: 100
    })
    .value('MinWithdraw', {
        value: 100
    })

    //分类页
    .value('cateCacheCode',{
        index_first:0,
        index_second:0,
        cate_session:null,
        second_cate:null,
        product_list:null,
        product_id:-1,
        loading:false,
        load_more_btn_show: true
    })

    //首页系统公告
    .value('sysAnn',{
        content:null
    })

    //自动选取优惠券
    .value('AutoSelectCoupon',{
        is_auto:false
    })


;