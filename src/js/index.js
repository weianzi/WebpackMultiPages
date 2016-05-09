
require('../css/common.css');
require('../css/a.less');
var Comp1 = require('./components/comp1.js');

console.log('我是首页, 我开始调用了组件Comp1了');

$(function(){
    $('body').css({marginTop:'50px'});

    $('#btn').click(() => {
        alert('点击了按钮');
    });
});

Comp1();


//
//
// 'use strict'
// import '../../css/common.css';   //IE8 不行
// import '../../css/a.css';
// import Comp1 from '../components/comp1.js'

// setTimeout( ()=> {  //IE8 可以
//     console.log('我是页面A, 我开始调用了组件Comp1了');
// }, 2000)

// Comp1();