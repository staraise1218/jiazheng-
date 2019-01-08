// guofeng
// video 控制
var video = document.getElementsByClassName("video")[0], // video 组件
    play_btn = document.getElementsByClassName("video-play-btn")[0],  // 遮罩层
    play_btn_img = document.getElementsByClassName("video-play-play")[0], // 播放按钮
    continue_wrap = document.getElementsByClassName("hint-wrap")[0], // 继续播放wrap
    continue_btn = document.getElementsByClassName("continue")[0]; // 继续播放按钮

var is_buy = true,          // 是否购买过该视频，播放完变回false
    lesson_id = 0,          // 课程id	
    lesson_episode_id = 0,  // 集数id
    number = 0,             // 集数	
    current_time = 66,      // 播放当前时间	
    ended = 0               // 是否结束 0 未结束 1 已结束	

var postData = {
    is_buy: is_buy,
    lesson_id: lesson_id,
    lesson_episode_id: lesson_episode_id,
    number: number,
    current_time: current_time,
    ended: ended
}

// function createDome() {
//     var oUl = $(".wrap");
//     var oLi = document.createElement("li");
//     var str = '';
//     for(var i = 1; i < episodeArr.length; i++) {
//         str += '<a href="#">' + i + '</a>'
//     }
//     oLi.innerHTML = str;
//     console.log(oLi)
//     console.log(oUl)
//     oUl[0].appendChild(oLi);
// }

// 初始化函数
function init() {
    current(current_time);
    // createDome();
    continueBtnIsnone();
}

init();

// 设置从……开始播放
function current(time) {
    video.currentTime = time;
}
// 开始播放  点击video中按钮
play_btn_img.onclick = function (e) {
    current(current_time);
    video_play(e)
}
// 开始播放  点击继续播放按钮
continue_btn.onclick = function (e) {
    current(current_time);
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
    console.log(current_time);  // 记录current_time
    console.log("播放暂停");
    $.ajax({
        type: 'POST',
        data: postData,
        url: 'jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog'
    })
}

if(video.ended == true) {
    console.log("视频播放完了");
    ended = 1;
    is_buy = false;
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
    play_block()
};

// 监听页面关闭
window.onbeforeunload=function(e){
    var e = window.event||e;
    current_time = video.currentTime;
    localStorage.setItem("qqq", current_time);
    $.ajax({
        type: 'POST',
        data: postData,
        url: 'jiazheng.staraise.com.cn/mobile/lesson/ajaxPlayedLog'
    })
}


// router 课程集数
var chapter_btn = document.getElementsByClassName("chapter-part-title")[0],
    chapter_content = document.getElementsByClassName("content-wrap")[0];

var chapter_count = 90;
var chapterArray = [];


/*
* @description: 课程集数选择
* @author: Guofeng
* @update: Guofeng (2019-01-08)
*/
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

