// // video 控制
// var video = $(".video")[0], // video 组件
//     play_btn = $(".video-play-btn")[0],  // 遮罩层
//     play_btn_img = $(".video-play-play")[0], // 播放按钮
//     continue_wrap = $(".hint-wrap")[0], // 继续播放wrap
//     continue_btn = $(".continue")[0], // 继续播放按钮
//     video_btn = $(".video-btn"),
//     video_btn_wrap = $(".wrap")[0],
//     number_len = $('.wrap li .video-btn').length;

// var is_play = false,
//     can_play = true,
//     item_btn_change = false;

// var lastplay_title = $(".lastplay_title").get(0).value,
//     lastplay_number = $(".lastplay_number").get(0).value == "" ? $(".wrap .active a:eq(0)").attr("number") : $(".lastplay_number").get(0).value; // 当前播放集数

// var lesson_id = $(".lesson_id").get(0).value, // 课程id
//     lesson_episode_id = $(".lesson_episode_id").get(0).value == "" ? $(".wrap .active a:eq(0)").attr("lesson_episode_id") : $(".lesson_episode_id").get(0).value,// 集数id
//     number = +lastplay_number,               // 当前集数
//     current_time = $(".current_time").get(0).value,  // （获取上一次）播放时间
//     ended = 0,                              // 是否结束 0 未结束 1 已结束
//     lesson_id = $(".lesson_id").get(0).value

// var postData = {
//     order_id: $(".order_id").get(0).value,
//     lesson_id: lesson_id,
//     lesson_episode_id: lesson_episode_id,
//     number: number,
//     current_time: current_time,
//     ended: ended
// }

// // 初始化函数
// function init() {
//     continueBtnIsnone();
//     if(current_time != 0) {
//         console.log("current_time :" +current_time + " --> 初始化播放时间成功");
//         current(current_time);
//     } else {
//         current(0)
//         console.log("current_time : " + current_time + " --> init()")
//     }
// }


// // 视频加载完成  oncanplay
// video.onloadeddata = function(){
//     init();
//     console.log("current_time :"+ current_time + ": --> 视频--加载完成")
// }

// // 分集，事件代理函数
// $(video_btn_wrap).delegate("a","click",function(){
//     number = $(this).attr("number");
//     if(number == lastplay_number) {
//         if(!is_play) {
//             if(item_btn_change) {
//                 console.log("number : " + number + " --> 第...集")
//                 video.currentTime = 0;
//                 item_btn_change = false;
//                 can_play = true;
//                 video.src = $(this).attr("data-video");
//             }
//         }
//     }   
// });

// // 设置从……开始播放
// function current(time) {
//     video.currentTime = time;
// }
// // 开始播放  点击video中按钮
// play_btn_img.onclick = function (e) {
//     video_play(e);
// }
// // 开始播放  点击继续播放按钮
// continue_btn.onclick = function (e) {
//     video_play(e);
// }
// // 判断继续播放部分是否显示
// function continueBtnIsnone() {
//     if(current_time == 0) {
//         continue_wrap.style.display = 'none';
//     } else {
//         continue_wrap.style.display = "flex";
//     }
// }
// // 视频播放
// function video_play (e) {
//     if(can_play) {
//         is_play = true;
//         video.play();
//         play_none();
//         e.stopPropagation();
//         console.log("current_time : " + current_time + " --> 视频开始播放");
//     }
// }

// // 暂停 记录时间
// video.onclick = function () {
//     is_play = false;
//     video.pause();
//     play_block();
//     current_time = Math.floor(video.currentTime);
//     postData.current_time = current_time;
//     console.log('播放暂停 current_time :' + current_time);  // 记录current_time
//     console.log(postData)
//     // $.ajax({
//     //     type: 'POST',
//     //     data: postData,
//     //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
//     //     success: function () {
//     //         console.log(postData)
//     //     },
//     //     error: function (e) {
//     //         console.log("error -- 暂停");
//     //     }
//     // })
// }

// function play_none() {
//     play_btn.style.display = "none";
//     continue_wrap.style.display = "none";
//     play_btn_img.style.display = "none";
//     continue_btn.style.display = "none";
// }

// function play_block() {
//     play_btn.style.display = "flex";
//     play_btn_img.style.display = "inline-block";
// }

// // 视频播放完成 记录时间
// video.onended = function() {
//     is_play = false;
//     can_play = false;
//     item_btn_change = true;

//     console.log("current_time :" + current_time + ": --> 视频播放完成"); // 记录播放完成
//     postData.ended = 1;
//     postData.current_time = 0;
//     number += 1;
//     lastplay_number = postData.number += 1;

//     play_block();
//     console.log(postData);
//     // $.ajax({
//     //     type: 'POST',
//     //     data: postData,
//     //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
//     //     success: function () {
//     //         console.log(postData)
//     //     },
//     //     error: function (e) {
//     //         console.log("error -- 播放完成");
//     //     }
//     // })
// };

// // 监听页面关闭
// window.onbeforeunload=function(e){
//     var e = window.event||e;
//     current_time = video.currentTime;
//     localStorage.setItem("current_time", current_time);
//     current_time = Math.floor(video.currentTime);
//     postData.current_time = current_time;
//     console.log(postData);
//     // $.ajax({
//     //     type: 'POST',
//     //     data: postData,
//     //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
//     //     success: function () {
//     //         console.log(postData)
//     //     },
//     //     error: function (e) {
//     //         console.log("error -- 关闭页面");
//     //     }
//     // })
// }


// // router 课程集数
// var chapter_btn = document.getElementsByClassName("chapter-part-title")[0],
//     chapter_content = document.getElementsByClassName("content-wrap")[0];

// var chapter_count = 90;
// var chapterArray = [];


// // @description: 课程集数选择

// var nowIndex = 0,
//     w = $('.chapter-part').width(),
//     len = $('.item').length,
//     slider_timer = undefined,
//     flag_poster = true;
// bindEvent();
// function bindEvent() {
//     $('.prevBtn').add($('.nextBtn')).add($('.item')).on('click', function () {
//         if($(this).attr('class') == 'prevBtn') {
//             move('prev');
//         }else if($(this).attr('class') == 'nextBtn') {
//             move('next');
//         }else {
//             var index = $(this).index();
//             move(index);
//         }
//         changeOrderStyle(nowIndex);
//     })
//     $('.chapter-part')
//         .mouseenter(function () {
//             $('.btn').css({display: 'block'});
//             clearTimeout(slider_timer);
//         })
//         .mouseleave(function () {
//             $('.btn').css({display: 'none'});
//             clearTimeout(slider_timer);
//         })
//     $('.btn a').mouseover(function () {
//         clearTimeout(slider_timer);
//     })
// }
// function move(direction) {
//     if(flag_poster) {
//         flag_poster = false;
//         var a = 1;
//         if(direction == 'prev' || direction == 'next') {
//             if(direction == 'prev'){
//                 if(nowIndex == 0) {
//                     $('.wrap').css({left: -(w * len)});
//                     nowIndex = len - 1;
//                 }else {
//                     nowIndex = nowIndex - 1;
//                 }
//             }else {
//                 if(nowIndex == 2) {
//                     a = 0;
//                     $('.wrap').animate({left: -(w * len)}, function () {
//                         $(this).css({left: 0});
//                         clearTimeout(slider_timer);
//                         flag_poster = true;
//                     })
//                     nowIndex = 0;
//                 }else {
//                     nowIndex = nowIndex + 1;
//                 }
//             }
//         }else {
//             nowIndex = direction;
//         }
//         if(a) {
//             $('.wrap').animate({left: -(w * nowIndex)}, function () {
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
//     slider_timer = setTimeout(function () {
//         move('next');
//         changeOrderStyle(nowIndex);
//     }, 300)
// }


// video 控制
var video = $(".video")[0],                     // video 组件
    play_btn = $(".video-play-btn")[0],         // 遮罩层
    play_btn_img = $(".video-play-play")[0],    // 播放按钮
    continue_wrap = $(".hint-wrap")[0],         // 蓝色继续播放wrap
    continue_btn = $(".continue")[0],           // video 继续播放按钮
    video_btn = $(".video-btn"),                // 视频选集按钮
    video_btn_wrap = $(".wrap")[0],             // 视频选集 wrap
    number_len = $('.wrap li .video-btn').length; // 选集长度

var lastplay_title = $(".lastplay_title").get(0).value,     // 上次播放的标题
    lesson_id = $(".lesson_id").get(0).value,               // 上次课程id
    lesson_episode_id = $(".lesson_episode_id").get(0).value == "" ? $(".wrap .active a:eq(0)").attr("lesson_episode_id") : $(".lesson_episode_id").get(0).value, // 上次集数id
    number = $(".lastplay_number").get(0).value == "" ? $(".wrap .active a:eq(0)").attr("number") : $(".lastplay_number").get(0).value, // 上次播放集数
    current_time = $(".current_time").get(0).value;         // 上次播放时间

// ajax 返回数据
var postData = {
    order_id: $(".order_id").get(0).value,  // 
    lesson_id: lesson_id,                   // 课程id
    lesson_episode_id: lesson_episode_id,   // 集数id
    number: number,                         // 当前集数
    current_time: current_time,             // 当前播放时间
    ended: 0                                // 是否播放完 0为播放完， 1播放完
}


// 视频加载完成 
video.onloadeddata = function(){
    init();
    console.log("current_time :"+ current_time + ": --> 视频--加载完成")
}

// 初始化函数
function init() {
    video.currentTime = $(".current_time").get(0).value;
    // video.currentTime = localStorage.getItem("postData.current_time");
    // 判断继续播放是否显示
    if(current_time == 0) {
        continue_wrap.style.display = 'none';
    } else {
        continue_wrap.style.display = "flex";
    }
}


// 开始播放  点击video中按钮
play_btn_img.onclick = function () {
    video.play();
    play_none();
}
// 开始播放  点击继续播放按钮
continue_btn.onclick = function (e) {
    video.play();
    play_none();
}

// 暂停 记录时间
video.onclick = function () {
    video.pause();
    play_block();
    
    current_time = Math.floor(video.currentTime);
    postData.current_time = current_time;
    console.log('播放暂停 current_time :' + current_time); 
    
    // 记录
    localStorage.setItem("postData.order_id", postData.order_id);
    localStorage.setItem("postData.lesson_id", postData.lesson_id);
    localStorage.setItem("postData.lesson_episode_id", postData.lesson_episode_id);
    localStorage.setItem("postData.number", postData.number);
    localStorage.setItem("postData.current_time", postData.current_time);
    localStorage.setItem("postData.ended", postData.ended);

    // $.ajax({
    //     type: 'POST',
    //     data: postData,
    //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
    //     success: function () {
    //         console.log(postData)
    //     },
    //     error: function (e) {
    //         console.log("error -- 暂停");
    //     }
    // })
}


// 视频播放完成 记录时间
video.onended = function() {
    postData.ended = 1;
    postData.current_time = 0;
    
    // 记录
    localStorage.setItem("postData.order_id", postData.order_id);
    localStorage.setItem("postData.lesson_id", postData.lesson_id);
    localStorage.setItem("postData.lesson_episode_id", postData.lesson_episode_id);
    localStorage.setItem("postData.number", postData.number);
    localStorage.setItem("postData.current_time", postData.current_time);
    localStorage.setItem("postData.ended", postData.ended);
    
    play_block();
    console.log("视频播放完成"); // 记录播放完成
    
    // $.ajax({
    //     type: 'POST',
    //     data: postData,
    //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
    //     success: function () {
    //         console.log(postData)
    //     },
    //     error: function (e) {
    //         console.log("error -- 播放完成");
    //     }
    // })
};

// 监听页面关闭
window.onbeforeunload=function(e){
    var e = window.event||e;
    current_time = video.currentTime;
    
    postData.current_time = current_time;
    
    // 记录
    current_time = Math.floor(video.currentTime);
    localStorage.setItem("postData.order_id", postData.order_id);
    localStorage.setItem("postData.lesson_id", postData.lesson_id);
    localStorage.setItem("postData.lesson_episode_id", postData.lesson_episode_id);
    localStorage.setItem("postData.number", postData.number);
    localStorage.setItem("postData.current_time", postData.current_time);
    localStorage.setItem("postData.ended", postData.ended);

    // $.ajax({
    //     type: 'POST',
    //     data: postData,
    //     url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
    //     success: function () {
    //         console.log(postData)
    //     },
    //     error: function (e) {
    //         console.log("error -- 关闭页面");
    //     }
    // })
}




// 分集，事件代理函数
$(video_btn_wrap).delegate("a","click",function(){
    
    continue_wrap.style.display = "none";

    number = $(this).attr("number");
    console.log("number : " + number + " --> 第...集")
    postData.current_time = 0;
    video.src = $(this).attr("data-video");
    
    
    video.onloadeddata = function(){
        console.log("current_time :"+ current_time + ": --> 视频--加载完成")
        video.currentTime = 0;
        play_block();
    }
});



// 播放按钮 继续播放 wrap 隐藏
function play_none() {
    play_btn.style.display = "none";
    continue_wrap.style.display = "none";
    play_btn_img.style.display = "none";
    continue_btn.style.display = "none";
}
// 播放按钮显示
function play_block() {
    play_btn.style.display = "flex";
    play_btn_img.style.display = "inline-block";
}


// router 课程集数
// var chapter_btn = document.getElementsByClassName("chapter-part-title")[0],
//     chapter_content = document.getElementsByClassName("content-wrap")[0];

// var chapter_count = 90;
// var chapterArray = [];


// @description: 课程集数选择

var nowIndex = 0,
    w = $('.chapter-part').width(),
    len = $('.item').length,
    slider_timer = undefined,
    flag_poster = true;
bindEvent();
function bindEvent() {
    $('.prevBtn').add($('.nextBtn')).add($('.item')).on('click', function () {
        if($(this).attr('class') == 'prevBtn') {
            move('prev');
        }else if($(this).attr('class') == 'nextBtn') {
            move('next');
        }else {
            var index = $(this).index();
            move(index);
        }
        changeOrderStyle(nowIndex);
    })
    $('.chapter-part')
        .mouseenter(function () {
            $('.btn').css({display: 'block'});
            clearTimeout(slider_timer);
        })
        .mouseleave(function () {
            $('.btn').css({display: 'none'});
            clearTimeout(slider_timer);
        })
    $('.btn a').mouseover(function () {
        clearTimeout(slider_timer);
    })
}
function move(direction) {
    if(flag_poster) {
        flag_poster = false;
        var a = 1;
        if(direction == 'prev' || direction == 'next') {
            if(direction == 'prev'){
                if(nowIndex == 0) {
                    $('.wrap').css({left: -(w * len)});
                    nowIndex = len - 1;
                }else {
                    nowIndex = nowIndex - 1;
                }
            }else {
                if(nowIndex == 2) {
                    a = 0;
                    $('.wrap').animate({left: -(w * len)}, function () {
                        $(this).css({left: 0});
                        clearTimeout(slider_timer);
                        flag_poster = true;
                    })
                    nowIndex = 0;
                }else {
                    nowIndex = nowIndex + 1;
                }
            }
        }else {
            nowIndex = direction;
        }
        if(a) {
            $('.wrap').animate({left: -(w * nowIndex)}, function () {
                clearTimeout(slider_timer);
                flag_poster = true;
            });
        }
    }
}
function changeOrderStyle(index) {
    $('.active').removeClass('active');
    $('.item').eq(index).addClass('active');
}
function slider_auto() {
    slider_timer = setTimeout(function () {
        move('next');
        changeOrderStyle(nowIndex);
    }, 300)
}

