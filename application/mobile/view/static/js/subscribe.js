var oUl = $(".wrapper ul").get(0);
// 
var last_btn_index = 0;
var dataPost = {
    page: "",
    cat_id: ""
}

init()
// 初始化函数
function init() {
    dataPost.cat_id = $(".nav-wrap ul li:eq(0) a").attr("cat_id");
    dataPost.page = 1;
    console.log("初始化 dataPost.page : " + dataPost.cat_id);
    AjaxFunc();
    console.log("**********************************************")
}


// 点击导航切换 id
$(".nav-wrap").delegate("a", "click", function (e) {
    var index=$(".item_nav").index($(this));
    console.log("获取cat_id :"  + $(this).attr("cat_id"));
    console.log("index :" + index);
    if(last_btn_index != index) {
        last_btn_index = index;
        oUl.innerHTML = "";
        dataPost.cat_id = $(this).attr("cat_id");
        dataPost.page = 1;
        AjaxFunc();
    }
})

function AjaxFunc() {
    $.ajax({
        type: "POST",
        url: "http://jiazheng.staraise.com.cn/index.php/api/aunt/getlist",
        data: dataPost,
        success: function (data) {
            if(data.data != 0) {
                createDom(data.data)
                console.log(data)
                console.log("ajax 数据获取成功")
                dataPost.page++;
            } else {
                console.log("ajax 数据为空")
            }
        },
        error: function () {
            console.log("error")
        }
    })
}





function createDom(data) {
    for (var i = 0; i < data.length; i++) {
        var str = '',
            tagStr = '',
            oLi = document.createElement("li"),
            tagArr = data[i].tag;
        // console.log(tagArr)
        // console.log(data)
        for(var j = 0; j < tagArr.length; j++) {
            tagStr += '<span>'+ tagArr[j] +'</span>'
        }
        // console.log(tagArr)

        str += 
            '<div class="poster">\
                <img src="'+ data[i].thumb + '" alt="poster">\
            </div>\
            <div class="right">\
                <div class="title">\
                    <strong style="margin-right:0.2rem">'+ data[i].title + '</strong>\
                    <span>'+ data[i].leixing + '</span>\
                </div>\
                <div class="price price-symbol" style="color:#8B8B8B">\
                    '+ data[i].description+'\
                </div>\
                <div class="skill">\
                '+ tagStr +'\
                </div>\
                <div class="right-pay-wrap">\
                    <div class="pay">\
                        <button class="pay-btn">联系家政经纪人</button>\
                    </div>\
                </div>\
            </div>'
        oLi.innerHTML = str;
        oUl.appendChild(oLi);
    }
}




// 获取滚动条当前的位置 
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度 
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度 
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//滚动事件触发
window.onscroll = function () {
    if (getScrollTop() + getClientHeight() == getScrollHeight()) {
        console.log(dataPost)
        AjaxFunc()
    }
}
// if(getScrollTop() == 0) {
//     AjaxFunc()
// }
