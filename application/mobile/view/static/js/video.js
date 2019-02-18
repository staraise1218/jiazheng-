let lastplay = {
    number : localStorage.getItem("lastplay.number") || 0
}

let $video = $(".video").get(0);
function videoInit() {
    console.log(lastplay)
    $(".video").get(0).src = $(".wrap .video-btn").eq(0).attr("data-video");
    $(".wrap .video-btn").eq(0).addClass("btn_active");
    $(".clas").text($(".wrap .video-btn").eq(0).attr("data-title"));
}
videoInit(); 

// 点击播放按钮 -- 播放
$(".video-play-play").on("click", function () {
    $video.play();
})

// 暂停
$(".video").on("click", function () {
    $video.pause();
})

// 点击分集按钮
$(".wrap").delegate(".video-btn", "click", function() {
    var $src = "http://jiazheng.staraise.com.cn" + $(this).attr("data-video");
    $(".video").prop("src", $src)
    console.log($(".wrap .video-btn").eq($(this).index()).attr("data-title"))
    $(".clas").text($(".wrap .video-btn").eq($(this).index()).attr("data-title"))
    $(".btn_active").removeClass("btn_active");
    $(this).addClass("btn_active");
    $video.currentTime = 0;
    $video.play();
})

// 分集导航切换
$(".order ul").delegate("li", "click", function () {
    $(".order ul .active").removeClass("active");
    $(this).addClass("item active");
    // let $w = $(".wrap").width();
    // let $lw = $(".wrap li").width();
    // $(".wrap").animate({"left":-($lw*$(this).index())})
    var index = $(this).index();
    $('.wrap .liactive').removeClass('liactive')
    $('.wrap li:eq(index)').addClass('liactive')
})