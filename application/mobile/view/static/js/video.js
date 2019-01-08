// video 控制
var video = document.getElementsByClassName("video")[0], // video 组件
    play_btn = document.getElementsByClassName("video-play-btn")[0],  // 遮罩层
    play_btn_img = document.getElementsByClassName("video-play-play")[0], // 播放按钮
    continue_wrap = document.getElementsByClassName("hint-wrap")[0], // 继续播放wrap
    continue_btn = document.getElementsByClassName("continue")[0]; // 继续播放按钮

var flag = true,  // 是否购买过该视频，播放完变回false
    count = 0,  // 记录播放过的时间
    full_time = 0,  // 当前视频总长
    isOver = false,  // 视频是否播放完成
    nowEpisode = null;  // 当前集数



var episodeArr = [
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih',
    'asfgahdifhafih'
]

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
    current(count);
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
    video_play(e)
}
// 开始播放  点击继续播放按钮
continue_btn.onclick = function (e) {
    video_play(e);
}
// 判断继续播放部分是否显示
function continueBtnIsnone() {
    if(count == 0) {
        continue_wrap.style.display = 'none';
    } else {
        continue_wrap.style.display = "flex";
    } 
}
// 视频播放
function video_play (e) {
    $.ajax({
        type: 'GET',
        url: '',
        success: function () {
            
        }
    })
    if(flag) {
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
    count = video.currentTime;
    console.log(count);  // 记录count
    console.log("播放暂停");
}

if(video.ended == true) {
    console.log("视频播放完了");
    isOver = true;
}

// 获取当前视频时长
window.onload = function() {
    full_time = video.duration;
    // console.log(video.duration);
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
    flag = false;
};

// 监听页面关闭
window.onbeforeunload=function(e){
　　var e = window.event||e;
    count = video.currentTime;
    localStorage.setItem("qqq", count);
    $.ajax({
        type: 'POST',
        url: '',
        success: function () {

        }
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

