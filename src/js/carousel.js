//define(['jquery'], function($) {
//var $= require('jquery');
var $= require('./jquery-3.2.1.min.js');
var  newCarousel=(function(){



    function Carousel($target) {
        this.$target = $target;
        this.init()
        this.bind()
    }
    Carousel.prototype = {
        init: function() {
            var $imgCt = this.$imgCt = this.$target.find('.img-ct'),
                $imgs = this.$imgs = this.$target.find('.img-ct li'),
                $preBtn = this.$preBtn = this.$target.find('.btn-pre'),
                $nextBtn = this.$nextBtn = this.$target.find('.btn-next'),
                $bullet = this.$bullet = this.$target.find('.bullet'),
                $bulletLis = this.$bulletLis = this.$target.find('.bullet li');

            this.imgLength = $imgs.length

            this.pageIndex = 0;
            this.isAnimate = false;
            this.$imgs.eq(this.pageIndex).fadeIn(500);

            var _this = this;
            this.id1 = setInterval(function() {
                _this.nextImg()
                _this.smallImg(_this.pageIndex)
            }, 3000)
        },
        bind: function() {
            var _this = this;
            this.$preBtn.on('click', function palyPre(e) {
                e.preventDefault()
                clearTimeout(_this.id1)
                _this.preImg()
                _this.smallImg(_this.pageIndex)
            })
            this.$nextBtn.on('click', function palyNext(e) {
                e.preventDefault()
                clearTimeout(_this.id1)
                _this.nextImg()
                _this.smallImg(_this.pageIndex)
            })
            this.$bulletLis.on('click', function(e) {
                _this.$imgs.css('display', 'none')
                e.preventDefault()
                clearTimeout(_this.id1)
                var index = $(this).index()
                _this.smallImg(index)
                _this.$imgs.eq(index).fadeIn(400)
                _this.pageIndex = index;
            })
        },
        nextImg: function() {
            var _this = this;
            if (this.isAnimate) {
                return
            }
            this.isAnimate = true;
            this.pageIndex++;
            this.$imgs.eq(this.pageIndex - 1).fadeOut(400, function() {
                _this.$imgs.eq(_this.pageIndex).fadeIn(400)
                if (_this.pageIndex === _this.imgLength) {
                    _this.pageIndex = 0;
                    _this.$imgs.eq(_this.pageIndex).fadeIn(400)
                    _this.smallImg(_this.pageIndex)
                }
                _this.isAnimate = false;
            })
        },
        preImg: function() {
            var _this = this;
            if (this.isAnimate) {
                return
            }
            this.isAnimate = true;
            this.pageIndex--;
            this.$imgs.eq(this.pageIndex + 1).fadeOut(400, function() {
                _this.$imgs.eq(_this.pageIndex).fadeIn(400)
                if (_this.pageIndex < 0) {
                    _this.$imgs.eq(_this.imgLength - 1).fadeIn(400)
                    _this.pageIndex = _this.imgLength - 1;
                }
                _this.isAnimate = false;
            })
        },
        smallImg: function(node) {
            this.$bulletLis
                .removeClass('active')
                .eq(node)
                .addClass('active');
        }

    }




    var carousel = (function() {

        return {
            init: function($target) {
                $target.each(function(index, node) {
                    new Carousel($(node));
                })
            }
        }
    })()


    return carousel;
//})

})()


module.exports= newCarousel;