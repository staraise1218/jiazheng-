var oUl = $(".wrapper ul").get(0)




var dataPost = {
    page: 1,
    cat_id: 1
}












$(".nav-wrap").delegate("li","click", function(e) {
    console.log($(this).index())
})

$.ajax({
    type: "POST",
    url: "http://jiazheng.staraise.com.cn/index.php/api/aunt/getlist",
    data: dataPost,
    success: function (data) {
        createDom(data.data)
    },
    error: function () {
        console.log("error")
    }
})



function createDom (data) {
    var str = '';
    console.log(data)
    for(var i = 0; i < data.length; i++) {
        str += 
        '<li>\
            <div class="poster">\
                <img src="'+data[i].thumb+'" alt="poster">\
            </div>\
            <div class="right">\
                <div class="title">\
                    <strong style="margin-right:0.2rem">'+ data[i].title +'</strong>\
                    <span>'+data[i].leixing+'</span>\
                </div>\
                <div class="price price-symbol" style="color:#8B8B8B">\
                </div>\
                <div class="skill">\
                    '+data[i].tag+'\
                </div>\
                <div class="right-pay-wrap">\
                    <div class="pay">\
                        <button class="pay-btn">联系家政经纪人</button>\
                    </div>\
                </div>\
            </div>\
        </li>'
    }
    oUl.innerHTML = str;
    console.log(str)
}















