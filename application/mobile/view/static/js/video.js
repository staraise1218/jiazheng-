// video 控制
var video = $(".video")[0], // video 组件
    play_btn = $(".video-play-btn")[0],  // 遮罩层
    play_btn_img = $(".video-play-play")[0], // 播放按钮
    continue_wrap = $(".hint-wrap")[0], // 继续播放wrap
    continue_btn = $(".continue")[0], // 继续播放按钮
    video_btn = $(".video-btn"),
    video_btn_wrap = $(".wrap")[0]

var lastplay_title = $(".lastplay_title").get(0).value,
    lastplay_number = $(".lastplay_number").get(0).value;

var is_buy = true,                          // 是否购买课程
    lesson_id = $(".lesson_id").get(0).value, // 课程id
    lesson_episode_id = $(".lesson_episode_id").get(0).value, // 集数id
    number = lastplay_number,                             // 集数
    current_time = $(".current_time").get(0).value,  // （获取上一次）播放时间
    ended = 0,                              // 是否结束 0 未结束 1 已结束
    lesson_id = $(".lesson_id").get(0).value

var postData = {
    order_id: $(".order_id").get(0).value,
    lesson_id: lesson_id,
    lesson_episode_id: lesson_episode_id,
    number: number,
    current_time: current_time,
    ended: ended
}


console.log(current_time)
// 初始化函数
function init() {
    if(current_time) {
        console.log(current_time + " 初始化播放时间");
        current(current_time);
    } else {
        current(0)
    }
    continueBtnIsnone();
}

init();

// 分集，事件代理函数
$(video_btn_wrap).delegate("a","click",function(){
    video.src = $(this).attr("data-video");
    number = $(this).attr("number")
});

// 设置从……开始播放
function current(time) {
    video.currentTime = time;
}
// 开始播放  点击video中按钮
play_btn_img.onclick = function (e) {
    // current_time =current_time;
    video_play(e);
}
// 开始播放  点击继续播放按钮
continue_btn.onclick = function (e) {
    // current(current_time);
    video_play(e);
}
// 判断继续播放部分是否显示
function continueBtnIsnone() {
    if(current_time == 0) {
        continue_wrap.style.display = 'none';
    } else {
        continue_wrap.style.display = "flex";
    }
}
// 视频播放
function video_play (e) {
    if(is_buy) {
        video.play();
        play_none()
        e.stopPropagation();
        console.log("视频开始播放");
    }
}

// 暂停 记录时间
video.onclick = function () {
    video.pause();
    play_block();
    current_time = video.currentTime;
    console.log('播放暂停 current_time :' + current_time);  // 记录current_time
    console.log(postData)
    // debugger
    $.ajax({
        type: 'POST',
        data: postData,
        url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
        success: function () {
            console.log(postData)
        },
        error: function (e) {
            console.log("error -- 暂停");
        }
    })
}

if(video.ended == true) {
    console.log("视频播放完了");
    ended = 1;
    is_buy = false;
    $.ajax({
        type: 'POST',
        data: postData,
        url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
        success: function () {
            console.log(postData)
        },
        error: function (e) {
            console.log("error -- 播放完成");
        }
    })
}


function play_none() {
    play_btn.style.display = "none";
    continue_wrap.style.display = "none";
    play_btn_img.style.display = "none";
    continue_btn.style.display = "none";
}

function play_block() {
    play_btn.style.display = "flex";
    play_btn_img.style.display = "inline-block";

}


video.onended = function() {
    console.log("视频播放完成"); // 记录播放完成
    is_buy = false;
    ended = 1;
    play_block()
};

// 监听页面关闭
window.onbeforeunload=function(e){
    var e = window.event||e;
    current_time = video.currentTime;
    localStorage.setItem("current_time", current_time);
    $.ajax({
        type: 'POST',
        data: postData,
        url: 'http://jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog',
        success: function () {
            console.log(postData)
        },
        error: function (e) {
            console.log("error -- 关闭页面");
        }
    })
}


// router 课程集数
var chapter_btn = document.getElementsByClassName("chapter-part-title")[0],
    chapter_content = document.getElementsByClassName("content-wrap")[0];

var chapter_count = 90;
var chapterArray = [];


// @description: 课程集数选择

var nowIndex = 0,
    w = $('.chapter-part').width(),
    len = $('.item').length,
    slider_timer = undefined,
    flag = true;
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
    if(flag) {
        flag = false;
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
                        flag = true;
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
                flag = true;
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
    }, 1000)
}

