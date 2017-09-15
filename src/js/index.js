/**
 * 首页功能
 */



//define(['jquery', 'carousel', 'loadmore', 'gotop', 'exposure'], function($, Carousel, LoadMore, GoTop, Exposure) {

import '../css/carousel.css';
import '../css/exposure.css';
import '../css/gotop.css';
import '../css/loadmore.css';
import '../css/css.css';


var $= require('./jquery-3.2.1.min.js');

var Carousel= require('./carousel.js'),
    Exposure= require('./exposure.js'),
    GoTop= require('./gotop.js'),
    LoadMore=require('./loadmore.js');

    //轮播图
    Carousel.init($('.carousel'));

    //加载新闻
    new LoadMore($('#news'));

    //回到顶部
    GoTop;

    //曝光
    Exposure.init($('.section1'), function($node) {
        $('.nav_right ul>li').removeClass('active')
        $('.nav_right ul>li').eq(0).addClass('active')
    })
    Exposure.init($('.section2'), function($node) {
        $('.nav_right ul').children().removeClass('active')
        $('.nav_right ul').children().eq(1).addClass('active')
    })
    Exposure.init($('.section3'), function($node) {
        $('.nav_right ul').children().removeClass('active')
        $('.nav_right ul').children().eq(2).addClass('active')
    })
    Exposure.init($('#news'), function($node) {
        $('.nav_right ul').children().removeClass('active')
        $('.nav_right ul').children().eq(3).addClass('active')
    })
    Exposure.init($('.section4'), function($node) {
        // $('.nav_right ul').children().removeClass('active')
        // $('.nav_right ul').children().eq(4).addClass('active')
        $('.nav_right ul>li').removeClass('active')
        $('.nav_right ul>li').eq(4).addClass('active')
    })

    Exposure.init($('.section5'), function($node) {
        $('.nav_right ul>li').removeClass('active')
        $('.nav_right ul>li').eq(5).addClass('active')
    })




    Exposure.init($('.carousel'), function($node) {
        $('.nav_right ul').children().removeClass('active')

    })

    //改变导航条背景色
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 700) {
            $('.header-nav').addClass('header-active')

        } else if ($(window).scrollTop() < 500) {
            $('.header-nav').removeClass('header-active')
        }
    })

//})