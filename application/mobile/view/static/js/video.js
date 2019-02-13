let lastplay = {
    number : localStorage.getItem("lastplay.number") || 0,
    // current_time : localStorage.getItem("lastplay.current_time") || 0,
    // lesson_episode_id : $(".lesson_episode_id").attr("value"),
    // lastplay_title : $(".lastplay_title").attr("value"),
    // lesson_id : $(".lesson_id").attr("value"),
    // ended: 0,
    // order_id : $(".order_id").attr("value")
}

let $video = $(".video").get(0);
function videoInit() {
    // $(".video-play-btn").height($(".video").height())
    console.log(lastplay)
    // $(".video").get(0).src = $(".wrap .video-btn").eq(lastplay.number ).attr("data-video");
    // $(".wrap .video-btn").eq(lastplay.number).addClass("btn_active");
    $(".video").get(0).src = $(".wrap .video-btn").eq(0).attr("data-video");
    $(".wrap .video-btn").eq(0).addClass("btn_active");
    $(".clas").text($(".wrap .video-btn").eq(0).attr("data-title"));
}
videoInit(); 

// 点击播放按钮 -- 播放
$(".video-play-play").on("click", function () {
    // videoCtrl("play");
    $video.play();
})
// $(".continue").on("click", function () {
//     videoCtrl("play");
// })

// 暂停
$(".video").on("click", function () {
    $video.pause();
})

// 点击分集按钮
$(".wrap").delegate(".video-btn", "click", function() {
    var $src = "http://jiazheng.staraise.com.cn" + $(this).attr("data-video");

    $(".video").prop("src", $src)

    console.log($(".wrap .video-btn").eq($(this).index()).attr("data-title"))
    $(".clas").text($(".wrap .video-btn").eq($(this).index).attr("data-title"))

    $(".btn_active").removeClass("btn_active");
    $(this).addClass("btn_active");
    // $(".video-play-btn").hide();
    // $(".hint-wrap").hide();

    // lastplay.number = $(".wrap .video-btn").index($(this));
    // localStorage.setItem("lastplay.number",lastplay.number);
    $video.currentTime = 0;
    $video.play();
})

// 开始播放
// $video.onplay = function () {
//     // $video.currentTime = lastplay.current_time;
// }

// 暂停
// $video.onabort = function () {
//     // lastplay.current_time = Math.floor($video.currentTime);
//     // localStorage.setItem("lastplay.current_time",lastplay.current_time);
// }

// 视频播放完
// $video.onended = function() {
//     videoCtrl("stop");
//     // lastplay.current_time = 0;
//     // localStorage.setItem("lastplay.current_time",lastplay.current_time);
// }

// 监听页面关闭
window.onbeforeunload = function(e) {
    // lastplay.current_time = Math.floor($video.currentTime);
    // localStorage.setItem("lastplay.current_time", lastplay.current_time);

    // $.ajax({
    //     type: 'POST',
    //     data: lastplay,
    //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
    //     success: function() {
    //         console.log("ajax成功");
    //         console.log(lastplay);
    //     },
    //     error: function(e) {
    //         console.log("error");
    //     }
    // })
}

// video 播放控制函数
function videoCtrl(ctrl) {
    // videoStatus();
    if(ctrl == "play") {
        // $video.currentTime = lastplay.current_time;
        $(".video-play-btn").hide();
        $(".hint-wrap").hide();
        $video.play();
    }
    if(ctrl == "stop") {
        $(".video-play-btn").show();
        // lastplay.current_time = Math.floor($video.currentTime);
        // localStorage.setItem("lastplay.current_time",lastplay.current_time);
        $video.pause();
    }
}

// 分集导航切换
$(".order ul").delegate("li", "nativeclick", function () {
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