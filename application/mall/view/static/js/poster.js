 /*
  * @description: 轮播图
  * @author: Guofeng
  * @update: Guofeng (2019-01-03)
  */
 // var nowIndex = 0,
 //     w = $('.poster').width(),   // 7.5rem
 //     len = $('.item').length,    // 3
 //     slider_timer = undefined,
 //     flag = true;
 // function init_poster() {
 //     bindEvent();
 //     slider_auto();
 // }
 // init_poster()

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
 //     $('.poster')
 //         .mouseenter(function () {
 //             $('.btn').css({display: 'block'});
 //             clearTimeout(slider_timer);
 //         })
 //         .mouseleave(function () {
 //             $('.btn').css({display: 'none'});
 //             clearTimeout(slider_timer);
 //             slider_auto();
 //         })
 //     $('.btn a').mouseover(function () {
 //         clearTimeout(slider_timer);
 //         slider_auto();
 //     })
 // }
 // function move(direction) {
 //     if(flag) {
 //         flag = false;
 //         var a = 1;
 //         if(direction == 'prev' || direction == 'next') {
 //             if(direction == 'prev'){
 //                 if(nowIndex == 0) {
 //                     $('.img-box').css({left: -(w * len)});
 //                     nowIndex = len - 1;
 //                 }else {
 //                     nowIndex = nowIndex - 1;
 //                 }
 //             }else {
 //                 if(nowIndex == 2) {
 //                     a = 0;
 //                     $('.img-box').animate({left: -(w * len)}, function () {
 //                         $(this).css({left: 0});
 //                         clearTimeout(slider_timer);
 //                         slider_auto();
 //                         flag = true;
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
 //             $('.img-box').animate({left: -(w * nowIndex)}, function () {
 //                 clearTimeout(slider_timer);
 //                 slider_auto();
 //                 flag = true;
 //             });
 //         }
 //     }

 // }
 // function changeOrderStyle(index) {
 //     $('.activePoster').removeClass('activePoster');
 //     $('.item').eq(index).addClass('activePoster');
 // }
 // function slider_auto() {
 //     slider_timer = setTimeout(function () {
 //         move('next');
 //         changeOrderStyle(nowIndex);
 //     }, 3000)
 // }

 // // init();



 // // window.onload = function () {
 //     // var touch = new Touch(document.getElementsByTagName("li"),80).init();
 //     var touch = new Touch(document.getElementsByClassName("posterItem"),80).init();

 //     //向左滑动触发事件
 //     touch.swipeLeft = function (dom) {
 //         // alert(dom.innerText);
 //         move('next')
 //         // alert("左")
 //     };

 //     //向右滑动事件
 //     touch.swipeRight = function (dom) {
 //         // alert(dom.innerText);
 //         move('prev')
 //     }
 // // };

 // function Touch(dom,range) {
 //     this.init = function () {
 //         var that = this;
 //         for(var i = 0; i<dom.length; i++){
 //             (function (dom) {
 //                 function touchstart(event) {
 //                     var e = event || window.event;
 //                     if(e.targetTouches.length === 1){
 //                         var startX = e.targetTouches[0].clientX,
 //                             startY = e.targetTouches[0].clientY;
 //                         function touchmove(e) {
 //                             var moveEndX = e.targetTouches[0].clientX,
 //                                 moveEndY = e.targetTouches[0].clientY;
 //                             if((that.getAngle(startX,startY,moveEndX,moveEndY) >= 135 || that.getAngle(startX,startY,moveEndX,moveEndY) <= -135) && that.getRange(startX,startY,moveEndX,moveEndY) >= range){
 //                                 that.swipeLeft(dom);
 //                                 dom.removeEventListener("touchmove",touchmove);
 //                             }else if((that.getAngle(startX,startY,moveEndX,moveEndY) >= -45 && that.getAngle(startX,startY,moveEndX,moveEndY) <= 45)&& that.getRange(startX,startY,moveEndX,moveEndY) >= range){
 //                                 that.swipeRight(dom);
 //                                 dom.removeEventListener("touchmove",touchmove);
 //                             }
 //                         }

 //                         function touchend() {
 //                             dom.removeEventListener("touchend",touchend);
 //                             dom.removeEventListener("touchmove",touchmove);
 //                         }

 //                         dom.addEventListener("touchmove",touchmove);
 //                         dom.addEventListener("touchend",touchend);
 //                     }
 //                 }

 //                 dom.addEventListener("touchstart",touchstart);
 //             })(dom[i]);
 //         }

 //         return this;
 //     };

 //     //计算滑动的角度
 //     this.getAngle = function (px1, py1, px2, py2) {
 //         //两点的x、y值
 //         x = px2-px1;
 //         y = py2-py1;
 //         hypotenuse = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
 //         //斜边长度
 //         cos = x/hypotenuse;
 //         radian = Math.acos(cos);
 //         //求出弧度
 //         angle = 180/(Math.PI/radian);
 //         //用弧度算出角度
 //         if (y<0) {
 //             angle = -angle;
 //         } else if ((y == 0) && (x<0)) {
 //             angle = 180;
 //         }
 //         return angle;
 //     };

 //     //计算两点之间的距离
 //     this.getRange = function (px1,py1,px2,py2) {
 //         return Math.sqrt(Math.pow(Math.abs(px1 - px2), 2) + Math.pow(Math.abs(py1 - py2), 2));
 //     };

 //     this.swipeLeft = function (dom) {};

 //     this.swipeRight = function (dom) {}
 // }



 // ******************************************************************************************
 // @ ## sw poster



 /**
  * jQuery plugin "Swipe slider".
  * Image slider that supports swiping function to change slides.
  */
 (function($) {

     $.fn.swipeslider = function(options) {
         var slideContainer = this;
         var slider = this.find('.sw-slides'); // reference to slider
         var defaultSettings = {
             /**
             / How long one slide will change the other.
             */
             transitionDuration: 500,
             /**
             / Enable autoplay
             */
             autoPlay: true,
             /**
              * How frequently slides will be changed.
              */
             autoPlayTimeout: 4000,
             /**
              * Transition effect.
              */
             timingFunction: 'ease-out',
             /**
              * Show 'Next' and 'Previous' buttons.
              */
             prevNextButtons: true,
             /**
              * Show slide switches.
              */
             bullets: true,
             /**
              * Enable swipe function.
              */
             swipe: true,
             /**
              * Overall height of the slider. Set it to percent to make it responsive.
              * Otherwise the slider will keep the height.
              */
             sliderHeight: '7rem'
         };

         var settings = $.extend(defaultSettings, options);

         // Privates //
         /** Sliding states:
          * 0 - sliding not started
          * 1 - sliding started
          * 2 - slide released
          */
         var slidingState = 0;
         var startClientX = 0;
         var startPixelOffset = 0;
         var pixelOffset = 0;
         var currentSlide = 0;
         var slideCount = 0;
         // Overall width of sliders.
         var slidesWidth = 0;
         // Flag for disbling swipe function while transition animation is playing.
         var allowSwipe = true;
         var transitionDuration = settings.transitionDuration;
         var swipe = settings.swipe;
         var autoPlayTimeout = settings.autoPlayTimeout;
         // ID of timeout function that waits for animation to end.
         var animationDelayID = undefined;
         var allowSlideSwitch = true;
         var autoPlay = settings.autoPlay;
         /** 
          * Set initial values.
          */
         (function init() {
             $(slideContainer).css('width', "100%");

             slidesWidth = slider.width();

             // Change slide width when window changes.
             $(window).resize(resizeSlider);

             if (settings.prevNextButtons) {
                 insertPrevNextButtons();
             }

             // Add last slide before first and first before last to seamless and engless transition
             slider.find('.sw-slide:last-child').clone().prependTo(slider);
             slider.find('.sw-slide:nth-child(2)').clone().appendTo(slider);
             slideCount = slider.find('.sw-slide').length;

             if (settings.bullets) {
                 insertBullets(slideCount - 2);
             }

             setTransitionDuration(transitionDuration);
             setTimingFunction(settings.timingFunction);
             setTransitionProperty('all');

             if (swipe) {
                 // Add event handlers to react when user swipe.
                 slider.on('mousedown touchstart', swipeStart);
                 $('html').on('mouseup touchend', swipeEnd);
                 $('html').on('mousemove touchmove', swiping);
             }

             // Jump to slide 1 (since another slide was added to the beginning of row);
             jumpToSlide(1);

             enableAutoPlay();
         })();

         /**
          * Changes slider size to response on window change.
          */
         function resizeSlider() {
             // Slide width is being changed automatically. Tough slidesWidth used to calculate a distance of transition effect.
             slidesWidth = slider.width();
             switchSlide();
         }

         /**
          * Triggers when user starts swipe.
          * @param event browser event object
          */
         function swipeStart(event) {
             if (!allowSwipe) {
                 return;
             }

             disableAutoPlay();
             // If it is mobile device redefine event to first touch point
             if (event.originalEvent.touches)
                 event = event.originalEvent.touches[0];

             // Check if slide started on slider 
             if (slidingState == 0) {
                 slidingState = 1; // Status 1 = slide started.
                 startClientX = event.clientX;
             }
         }

         /** Triggers when user continues swipe.
          * @param event browser event object
          */
         function swiping(event) {
             var pointerData;

             // Get pointer data from event.
             if (event.originalEvent.touches) {
                 pointerData = event.originalEvent.touches[0];
             } else {
                 pointerData = event;
             }

             // Distance of slide from the first touch
             var deltaSlide = pointerData.clientX - startClientX;

             // If sliding started first time and there was a distance.
             if (slidingState == 1 && deltaSlide != 0) {
                 slidingState = 2; // Set status to 'actually moving'
                 startPixelOffset = currentSlide * -slidesWidth; // Store current offset of slide
             }

             //  When user move image
             if (slidingState == 2) {
                 event.preventDefault(); // Disable default action to prevent unwanted selection. Can't prevent touches.

                 // Means that user slide 1 pixel for every 1 pixel of mouse movement.
                 var touchPixelRatio = 1;
                 // Check for user doesn't slide out of boundaries
                 if ((currentSlide == 0 && pointerData.clientX > startClientX) ||
                     (currentSlide == slideCount - 1 && pointerData.clientX < startClientX)) {
                     // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
                     touchPixelRatio = 3;
                 }

                 // How far to translate slide while dragging.
                 pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
                 enableTransition(false);
                 // Apply moving and remove animation class
                 translateX(pixelOffset);
             }
         }

         /** Triggers when user finishes swipe.
          * @param event browser event object
          */
         function swipeEnd(event) {
             if (slidingState == 2) {
                 // Reset sliding state.
                 slidingState = 0;

                 // Calculate which slide need to be in view.
                 currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;

                 // Make sure that unexisting slides weren't selected.
                 currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);

                 // Since in this example slide is full viewport width offset can be calculated according to it.
                 pixelOffset = currentSlide * -slidesWidth;

                 disableSwipe();
                 switchSlide();
                 enableAutoPlay();
             }

             slidingState = 0;

         }

         /** 
          * Disables reaction on swipe while transition effect is playing.
          */
         function disableSwipe() {
             allowSwipe = false;
             window.setTimeout(enableSwipe, transitionDuration)
         }

         /** 
          * Enables reaction on swipe.
          */
         function enableSwipe() {
             allowSwipe = true;
         }

         /**
          * Disables autoplay function.
          * Used while performing manual operations.
          */
         function disableAutoPlay() {
             allowSlideSwitch = false;
             window.clearTimeout(animationDelayID);
         }

         /**
          * Enables autoplay function.
          * Used to prevent auto play when user performs manual switching.
          */
         function enableAutoPlay() {
             if (autoPlay) {
                 allowSlideSwitch = true;
                 startAutoPlay();
             }
         }

         /**
          * Launches autoPlay function with delay.
          */
         function startAutoPlay() {
             if (allowSlideSwitch) {
                 animationDelayID = window.setTimeout(performAutoPlay, autoPlayTimeout);
             }
         }

         /**
          * Switches between slides in autoplay mode.
          */
         function performAutoPlay() {
             switchForward();
             startAutoPlay();
         }

         /**
          * Switches slideshow one slide forward.
          */
         function switchForward() {
             currentSlide += 1;
             switchSlide();
         }

         /**
          * Switches slideshow one slide backward.
          */
         function switchBackward() {
             currentSlide -= 1;
             switchSlide();
         }

         /**
          * Switches slideshow to currentSlide.
          */
         function switchSlide() {
             enableTransition(true);
             translateX(-currentSlide * slidesWidth);

             if (currentSlide == 0) {
                 window.setTimeout(jumpToEnd, transitionDuration);
             } else if (currentSlide == slideCount - 1) {
                 window.setTimeout(jumpToStart, transitionDuration);
             }
             setActiveBullet(currentSlide);
         }

         /**
          * Switches slideshow to the first slide.
          * Remark: the first slide from html elements, not the slide that was added for smooth transition effect.
          */
         function jumpToStart() {
             jumpToSlide(1);
         }

         /**
          * Switches slideshow to the last slide.
          * Remark: the last slide from html elements, not the slide that was added for smooth transition effect.
          */
         function jumpToEnd() {
             jumpToSlide(slideCount - 2);
         }

         /**
          * Switches slideshow to exact slide number.
          * Remark: respecting two slides that were added for smooth transaction effect.
          */
         function jumpToSlide(slideNumber) {
             enableTransition(false);
             currentSlide = slideNumber;
             translateX(-slidesWidth * currentSlide);
             window.setTimeout(returnTransitionAfterJump, 50);
         }

         /**
          * Returns transition effect after jumpToSlide function call.
          */
         function returnTransitionAfterJump() {
             enableTransition(true);
         }

         /** 
          * Enables or disables transition
          * @param {bool} true to enable traintion.
          */
         function enableTransition(enable) {
             if (enable) {
                 setTransitionProperty('all');
             } else {
                 setTransitionProperty('none');
             }
         }

         function translateX(distance) {
             slider.css('transform', 'translateX(' + distance + 'px)');
         }

         function setTransitionDuration(duration) {
             slider.css('transition-duration', duration + 'ms');
         }

         function setTimingFunction(functionDescription) {
             slider.css('transition-timing-function', functionDescription);
         }

         function setTransitionProperty(property) {
             slider.css('transition-property', property);
         }

         function insertPrevNextButtons() {
             // slider.after('<span class="sw-next-prev sw-prev"></span>');
             slideContainer.find('.sw-prev').click(function() {
                 if (allowSlideSwitch) {
                     disableAutoPlay();
                     switchBackward();
                     enableAutoPlay();
                 }
             });
             // slider.after('<span class="sw-next-prev sw-next"></span>');
             slideContainer.find('.sw-next').click(function() {
                 if (allowSlideSwitch) {
                     disableAutoPlay();
                     switchForward();
                     enableAutoPlay();
                 }
             });
         }

         function insertBullets(count) {
             slider.after('<ul class="sw-bullet"></ul>');
             var bulletList = slider.parent().find('.sw-bullet');
             for (var i = 0; i < count; i++) {

                 if (i == 0) {
                     bulletList.append('<li class="sw-slide-' + i + ' active"></li>');
                 } else {
                     bulletList.append('<li class="sw-slide-' + i + '"></li>');
                 }

                 var item = slideContainer.find('.sw-slide-' + i);

                 (function(lockedIndex) {
                     item.click(function() {
                         disableAutoPlay();
                         currentSlide = lockedIndex + 1;
                         switchSlide();
                         enableAutoPlay();
                     });
                 })(i);
             }
         }

         function setActiveBullet(number) {
             var activeBullet = 0;

             if (number == 0) {
                 activeBullet = slideCount - 3;
             } else if (number == slideCount - 1) {
                 activeBullet = 0;
             } else {
                 activeBullet = number - 1;
             }

             slideContainer.find('.sw-bullet').find('li').removeClass('active');
             slideContainer.find('.sw-slide-' + activeBullet).addClass('active');
         }

         return slideContainer;
     }
 }(jQuery));