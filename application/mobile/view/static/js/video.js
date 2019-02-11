let lastplay = {
    current_time : localStorage.getItem("lastplay.current_time") || 0,
    number : localStorage.getItem("lastplay.number") || $(".lastplay_number").attr("value") || 1,
    lesson_episode_id : $(".lesson_id").get(0).value,
    lesson_episode_id : $(".lesson_episode_id").attr("value"),
    lastplay_title : $(".lastplay_title").attr("value"),
    lesson_id : $(".lesson_id").attr("value"),
    ended: "",
    order_id : $(".order_id").attr("value")
}

let $video = $(".video").get(0);
function videoInit() {
    // $(".video-play-btn").height($(".video").height())
    $(".lastplay-number-con").text("第"+ (+lastplay.number+1) + "集 " + lastplay.current_time);
    $(".video").get(0).src = $(".wrap .video-btn").eq(lastplay.number).attr("data-video");
    // $video.currentTime = lastplay.current_time;
    $(".wrap .video-btn").eq(lastplay.number).addClass("btn_active");
    console.log(lastplay)
}
videoInit(); 

// 点击播放按钮 -- 播放
$(".video-play-play").on("touchstart", function () {
    videoCtrl("play");
})
$(".continue").on("touchstart", function () {
    videoCtrl("play");
})

// 暂停
$(".video").on("touchstart", function () {
    videoCtrl("stop");
})

// 点击分集按钮
$(".wrap").delegate(".video-btn", "touchstart", function() {
    console.log($(this))
    console.log($(this).index())
    var $src = "http://jiazheng.staraise.com.cn" + $(this).attr("data-video");

    $(".video").prop("src", $src)
    $(".video").get(0).currentTime = 0;
    
    console.log($(this).attr("data-video"))
    console.log($(".video"))
    console.log($(this))

    $(".btn_active").removeClass("btn_active");
    $(this).addClass("btn_active");
    
    $(".video-play-btn").hide();
    $(".hint-wrap").hide();
    
    lastplay.number = $(".wrap .video-btn").index($(this));
    lastplay.ended = 0;
    localStorage.setItem("lastplay.number",lastplay.number);
    localStorage.setItem("lastplay.ended",lastplay.ended);

    $video.currentTime = 0;
    $video.play();
    $.ajax({
        type: 'POST',
        data: lastplay,
        url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
        success: function() {
            console.log("ajax成功");
            console.log(lastplay);
        },
        error: function(e) {
            console.log("error");
        }
    })
})

// 开始播放
$video.onplay = function () {
    lastplay.ended = 0;
    localStorage.setItem("lastplay.ended",lastplay.ended);
    $video.currentTime = lastplay.current_time;
}

// 暂停
$video.onabort = function () {
    lastplay.current_time = Math.floor($video.currentTime);
    localStorage.setItem("lastplay.current_time",lastplay.current_time);
}

// 视频播放完
$video.onended = function() {
    videoCtrl("stop");
    lastplay.ended = 1;
    lastplay.current_time = 0;
    localStorage.setItem("lastplay.ended",lastplay.ended);
    localStorage.setItem("lastplay.current_time",lastplay.current_time);
}

// 监听页面关闭
window.onbeforeunload = function(e) {
    lastplay.current_time = Math.floor($video.currentTime);
    localStorage.setItem("lastplay.current_time", lastplay.current_time);

    $.ajax({
        type: 'POST',
        data: lastplay,
        url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
        success: function() {
            console.log("ajax成功");
            console.log(lastplay);
        },
        error: function(e) {
            console.log("error");
        }
    })
}

// video 播放控制函数
function videoCtrl(ctrl,el) {
    // videoStatus();
    if(ctrl == "play") {
        $video.currentTime = lastplay.current_time;
        $(".video-play-btn").hide();
        $(".hint-wrap").hide();
        lastplay.ended = 0;
        localStorage.setItem("lastplay.ended",lastplay.ended);
        $video.play();
    }
    if(ctrl == "stop") {
        $(".video-play-btn").show();
        lastplay.current_time = Math.floor($video.currentTime);
        localStorage.setItem("lastplay.current_time",lastplay.current_time);
        $video.pause();
    }
}

// 分集导航切换
$(".order ul").delegate("li", "touchstart", function () {
    $(".order ul .active").removeClass("active");
    $(this).addClass("item active");
    let $w = $(".wrap").width();
    let $lw = $(".wrap li").width();
    $(".wrap").animate({"left":-($lw*$(this).index())})
})

function videoStatus () {
    if($video.readyState == 0 ) {
        alert("没有关于视频是否就绪的信息")
    } 
    if ($video.readyState == 1 ) {
        alert("关于视频就绪的元素据")
    }
    if ($video.readyState == 2 ) {
        alert("关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒")
    }
    if ($video.readyState == 3 ) {
        alert("当前及至少下一帧的数据是可用的")
    } 
    if ($video.readyState == 4 ) {
        alert("可用的数据足以开始播放")
    }


    if($video.networkState == 0) {
            alert("视频尚未初始化")
    }
    if($video.networkState == 1) {
        alert("视频是活动的且已选区资源，但并未使用网络")
    }
    if($video.networkState == 2) {
        alert("浏览器正在下载数据/毫秒")
    }
    if($video.networkState == 3) {
        alert(" 未找到视频来源")
    }
}