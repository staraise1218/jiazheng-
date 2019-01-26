// // video --- 》 视频播放 js
// var video = $(".video")[0], // video 组件
//     play_btn = $(".video-play-btn")[0], // 遮罩层
//     play_btn_img = $(".video-play-play")[0], // 播放按钮
//     continue_wrap = $(".hint-wrap")[0], // 蓝色继续播放wrap
//     continue_btn = $(".continue")[0], // video 继续播放按钮
//     video_btn = $(".video-btn"), // 视频选集按钮
//     video_btn_wrap = $(".wrap")[0], // 视频选集 wrap
//     number_len = $('.wrap li .video-btn').length; // 选集长度
// // ajax 获取  
// var lastplay = {
//         title: $(".lastplay_title").get(0).value, // 上次播放的标题
//         lesson_id: $(".lesson_id").get(0).value, // 上次课程id
//         lesson_episode_id: $(".lesson_episode_id").get(0).value == "" ? $(".wrap .active span:eq(0)").attr("lesson_episode_id") : $(".lesson_episode_id").get(0).value, // 上次集数id
//         number: $(".lastplay_number").get(0).value == "" ? $(".wrap .active span:eq(0)").attr("number") : $(".lastplay_number").get(0).value, // 上次播放集数
//         current_time: $(".current_time").get(0).value // 上次播放时间
//     }
// // alert(lastplay)
// // ajax 返回数据 
// var postData = {
//         order_id: $(".order_id").get(0).value, // 
//         lesson_id: lastplay.lesson_id, // 课程id
//         number: lastplay.number, // 当前集数
//         current_time: lastplay.current_time, // 当前播放时间
//         ended: 0, // 是否播放完 0为播放完， 1播放完
//         lesson_episode_id: $(".lesson_episode_id").get(0).value == "" ? $(".wrap .active span:eq(0)").attr("lesson_episode_id") : $(".lesson_episode_id").get(0).value // 上次集数id
//     }
// // alert(postData)

// // 初始化函数
// function init() {
//     // 选集按钮高亮
//     $(".wrap span").eq(lastplay.number - 1).addClass("btn_active")
//     // 判断继续播放是否显示
//     // alert(lastplay.current_time);
//     if (lastplay.current_time == 0) {
//         // continue_wrap.style.display = 'none';
//     } else {
//         continue_wrap.style.display = "flex";
//     }
// }
// init();

// // 视频加载
// video.onloadeddata = function() {
//     video.currentTime = $(".current_time").get(0).value || localStorage.getItem("lastplay.current_time");
//     console.log("lastplay.current_time :" + lastplay.current_time + ": --> 视频--加载完成")
// }

// // 开始播放  点击video中按钮
// play_btn_img.onclick = function() {
//     video.currentTime = $(".current_time").get(0).value || localStorage.getItem("lastplay.current_time");
//     video.play();
//     play_none();
// }

// // 开始播放  点击继续播放按钮
// $(".continue").click(function() {
//     // alert(video.readyState)
//     // if (video.readyState == 4) {
//     //     console.log("readystate == 4")
//     //     video.play();
//     //     play_none();
//     //     alert(video.readyState)
//     // }
//     video.play();
//     play_none();

// })


// // 暂停 记录时间
// video.onclick = function() {
//     video.pause();
//     play_block();

//     // 记录
//     lastplay.current_time = postData.current_time = Math.floor(video.currentTime);
//     localStorage.setItem("lastplay.current_time", postData.current_time);
//     // alert(postData)
//     // alert(lastplay)
// }


// // 视频播放完成 记录时间
// video.onended = function() {
//     postData.ended = 1;
//     lastplay.current_time = postData.current_time = 0;
//     play_block();

//     // 记录    
//     localStorage.setItem("lastplay.current_time", postData.current_time);
//     localStorage.setItem("postData.ended", postData.ended);

//     console.log("视频播放完成"); // 记录播放完成
// };

// // 监听页面关闭
// window.onbeforeunload = function(e) {
//         var e = window.event || e;

//         // 记录
//         lastplay.current_time = postData.current_time = Math.floor(video.currentTime);
//         localStorage.setItem("lastplay.current_time", postData.current_time);

//         $.ajax({
//             type: 'POST',
//             data: postData,
//             url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
//             success: function() {
//                 console.log(postData)
//             },
//             error: function(e) {
//                 console.log("error -- 关闭页面");
//             }
//         })
//     }

// // 分集，事件代理函数
// $(video_btn_wrap).delegate("span", "click", function() {
//     $(".btn_active").removeClass("btn_active")
//     $(this).addClass("btn_active");

    
//     lastplay.number = postData.number = $(this).attr("number");
//     postData.lesson_episode_id = lastplay.lesson_episode_id = $(".lesson_episode_id").get(0).value == "" ? $(".wrap .active span:eq(0)").attr("lesson_episode_id") : $(".lesson_episode_id").get(0).value // 上次集数id
//     video.src = "http://jiazheng.staraise.com.cn" + $(this).attr("data-video");
//     // 记录
//     video.currentTime = 0;
//     play_none();
//     video.play();
    
//     // 记录
//     localStorage.setItem("lastplay.lesson_episode_id", postData.lesson_episode_id);     // 播放集数id
//     localStorage.setItem("lastplay.number", lastplay.number); // 播放的集数
// });

// // 播放按钮 继续播放 wrap 隐藏
// function play_none() {
//     play_btn.style.display = "none";
//     continue_wrap.style.display = "none";
//     play_btn_img.style.display = "none";
//     continue_btn.style.display = "none";
// }

// // 播放按钮显示
// function play_block() {
//     play_btn.style.display = "flex";
//     play_btn_img.style.display = "inline-block";
// }


// // @description: 课程集数选择
// var nowIndex = 0,
//     w = $('.chapter-part').width(),
//     len = $('.item').length,
//     slider_timer = undefined,
//     flag_poster = true;
// bindEvent();

// function bindEvent() {
//     $('.prevBtn').add($('.nextBtn')).add($('.item')).on('click', function() {
//         if ($(this).attr('class') == 'prevBtn') {
//             move('prev');
//         } else if ($(this).attr('class') == 'nextBtn') {
//             move('next');
//         } else {
//             var index = $(this).index();
//             move(index);
//         }
//         changeOrderStyle(nowIndex);
//     })
//     $('.chapter-part')
//         .mouseenter(function() {
//             $('.btn').css({ display: 'block' });
//             clearTimeout(slider_timer);
//         })
//         .mouseleave(function() {
//             $('.btn').css({ display: 'none' });
//             clearTimeout(slider_timer);
//         })
//     $('.btn a').mouseover(function() {
//         clearTimeout(slider_timer);
//     })
// }

// function move(direction) {
//     if (flag_poster) {
//         flag_poster = false;
//         var a = 1;
//         if (direction == 'prev' || direction == 'next') {
//             if (direction == 'prev') {
//                 if (nowIndex == 0) {
//                     $('.wrap').css({ left: -(w * len) });
//                     nowIndex = len - 1;
//                 } else {
//                     nowIndex = nowIndex - 1;
//                 }
//             } else {
//                 if (nowIndex == 2) {
//                     a = 0;
//                     $('.wrap').animate({ left: -(w * len) }, function() {
//                         $(this).css({ left: 0 });
//                         clearTimeout(slider_timer);
//                         flag_poster = true;
//                     })
//                     nowIndex = 0;
//                 } else {
//                     nowIndex = nowIndex + 1;
//                 }
//             }
//         } else {
//             nowIndex = direction;
//         }
//         if (a) {
//             $('.wrap').animate({ left: -(w * nowIndex) }, function() {
//                 clearTimeout(slider_timer);
//                 flag_poster = true;
//             });
//         }
//     }
// }

// function changeOrderStyle(index) {
//     $('.active').removeClass('active');
//     $('.item').eq(index).addClass('active');
// }

// function slider_auto() {
//     slider_timer = setTimeout(function() {
//         move('next');
//         changeOrderStyle(nowIndex);
//     }, 300)
// }


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

    $(".video-play-btn").height($(".video").height())
    $(".lastplay-number-con").text("第"+ (+lastplay.number+1) + "集 " + lastplay.current_time);
    $video.src = $(".wrap .video-btn").eq(lastplay.number).attr("data-video");
    $video.currentTime = lastplay.current_time;
    $(".wrap .video-btn").eq(lastplay.number).addClass("btn_active");
    console.log(lastplay)
}






// 点击播放按钮 -- 播放
$(".video-play-play").on("click", function () {
    videoStatus()
    videoCtrl("play");
})
$(".continue").on("click", function () {
    videoCtrl("play");
})


// 暂停
$(".video").on("click", function () {
    videoCtrl("stop");
})

// 点击分集按钮
$(".wrap").delegate(".video-btn", "click", function() {
    videoCtrl("change",$(this));


})

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
    var e = window.event || e;

    // 记录
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
            console.log("error -- 关闭页面");
        }
    })
}

// video 播放控制函数
function videoCtrl(ctrl,el) {
    if(ctrl == "play") {
        $video.currentTime = lastplay.current_time;
        $video.play();
        $(".video-play-btn").hide();
        $(".hint-wrap").hide();
        lastplay.ended = 0;
        localStorage.setItem("lastplay.ended",lastplay.ended);
    }
    
    if(ctrl == "stop") {
        $video.pause();
        $(".video-play-btn").show();
        lastplay.current_time = Math.floor($video.currentTime);
        localStorage.setItem("lastplay.current_time",lastplay.current_time);
    }
    
    if(ctrl == "change") {
        $(".btn_active").removeClass("btn_active");
        el.addClass("btn_active");
        
        $(".video-play-btn").hide();
        $(".hint-wrap").hide();
        
        lastplay.number = $(".wrap .video-btn").index(el);
        lastplay.ended = 0;
        localStorage.setItem("lastplay.number",lastplay.number);
        localStorage.setItem("lastplay.ended",lastplay.ended);

        $("video").prop("src",el.attr("data-video")).prop("currentTime",0);
        $video.play();
    }
}


// 分集导航切换
$(".order ul").delegate("li", "click", function () {
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


videoInit();