// video 控制
var video = document.getElementsByClassName("video")[0], // video 组件
    play_btn = document.getElementsByClassName("video-play-btn")[0],  // 遮罩层
    play_btn_img = document.getElementsByClassName("video-play-play")[0], // 播放按钮
    continue_wrap = document.getElementsByClassName("hint-wrap")[0], // 继续播放wrap
    continue_btn = document.getElementsByClassName("continue")[0]; // 继续播放按钮

var flag = true;  // 是否购买过该视频，播放完变回false
var count = 0;  // 记录播放过的时间
var full_time = 0;  // 当前视频总长

init();

// 初始化函数
function init() {
    current(count);
}

// 设置从……开始播放
function current(time) {
    video.currentTime = time;
}

// 开始播放  点击video中按钮
play_btn_img.onclick = function (e) {
    if(flag) {
        video.play();
        play_none()
        e.stopPropagation();
        console.log("视频开始播放");
    }
}

// 开始播放  点击继续播放按钮
continue_btn.onclick = function (e) {
    video.play();
    play_none();
    e.stopPropagation();
    console.log("视频开始播放");
}

// 暂停 记录时间
video.onclick = function () {
    video.pause();
    play_block();
    count = video.currentTime;
    console.log(count);
    console.log("播放暂停");
}

if(video.ended == true) {
    console.log("视频播放完了")
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
    console.log("视频播放完成");
    flag = false;
};

// 监听页面关闭
window.onbeforeunload=function(e){
　　var e = window.event||e;
    count = video.currentTime;
    localStorage.setItem("qqq",count);
}



// router 课程集数
var chapter_btn = document.getElementsByClassName("chapter-part-title")[0],
    chapter_content = document.getElementsByClassName("content-wrap")[0];

var chapter_count = 90;
var chapterArray = [];
// 15 集 一个 btn  <li><a></a></li>
// 第一个 class ---> active

// 15 集 一个 ul 
// 第一个 class item active

var chooseBtn = document.getElementById("active");
var chooseBtnUl = document.getElementsByClassName('chapter-part-title')[0];
var chooseBtnArr = chooseBtnUl.getElementsByTagName('li');
var chooseBox = document.getElementsByClassName("content-wrap")[0].getElementsByClassName('active')[0];


chooseBtnUl.addEventListener('click', function (e) {
    if(e.target.tagName == "LI") {
        for(var i = 0; i < chooseBtnArr.length; i++) {
            chooseBtnArr[i].className = ""
        }
        e.target.className = "active";
    }
    
})


