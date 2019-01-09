var oUl = $(".wrapper ul").get(0);

// 
var dataPost = {
    page: 1,
    cat_id: 2
}

init()
// 初始化函数
function init() {
    AjaxFunc();
}
// 点击导航切换 id
$(".nav-wrap").delegate("li", "click", function (e) {
    console.log($(this).index()+1);
    dataPost.cat_id = $(this).index()+1;
    AjaxFunc();
})

function AjaxFunc() {
    $.ajax({
        type: "POST",
        url: "http://jiazheng.staraise.com.cn/index.php/api/aunt/getlist",
        data: dataPost,
        success: function (data) {
            console.log(data)
            if(data.data != 0) {
                createDom(data.data)
                console.log(data.data)
                console.log("数据获取成功")
                dataPost.page++;
            } else {
                console.log("数据为空")
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
            oLi = document.createElement("li");
        // console.log(data)
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
                </div>\
                <div class="skill">\
                    '+ data[i].tag + '\
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
