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
        searchStatus: null
    })

    //首页分类区域
    .value('areasStatus',{
        areas_status : null
    })

    //首页商品分页number
    .value('homeProductPageNumber',{
        h_p_page_number : 1
    })

;