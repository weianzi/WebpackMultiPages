
'use strict';
require('../js/libs/jquery.backgroundvideo.min'); //视频背景
require('../js/libs/smoothscroll'); //滚动条平滑
require('../css/public.less');
require('../css/index.less');

$(function(){
    //视频背景
    var videobackground = new $.backgroundVideo($('body'), {
      "align": "centerXY",
      "width": 1280,
      "height": 720,
      "path": "video/",
      "filename": "video",
      "types": ["mp4","webm"]
    });



})

