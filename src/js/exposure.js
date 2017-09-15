//define(['jquery'],function($){
//var $= require('jquery');
var $= require('./jquery-3.2.1.min.js');
var newExposure=(function(){


function Exposure($target, callback) {
        this.$target = $target;
        this.callback = callback;
        this.bind();
        this.check();
    }

    Exposure.prototype.bind = function() {
        var _this = this;
        $(window).on('scroll', function() {
            _this.check()
        })
    }

    Exposure.prototype.check = function() {
        var _this = this;
        if (this.isShow(this.$target)) {
            this.callback(this.$target)
        }
    }

    Exposure.prototype.isShow = function() {
        var windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            offsetTop = this.$target.offset().top,
            nodeHeight = this.$target.height();
        if (windowHeight + scrollTop - 500 > offsetTop && scrollTop < offsetTop + nodeHeight - 400) {
            return true
        } else {
            return false
        }
    }




    var exposure = (function() {
        return {
            init: function($targets, callback) {
                $targets.each(function(idx, target) {
                    new Exposure($(target), callback)
                })
            }

        }
    })()

    return exposure;


//})

})()

module.exports= newExposure;