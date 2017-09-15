//define(['jquery'], function($) {
 //var $= require('jquery');
 var $= require('./jquery-3.2.1.min.js');
var newLoadmore=(function(){


    function LoadNews($ct) {
        this.$ct = $ct
        this.init()
        this.bind()

    }
    LoadNews.prototype = {
        init: function() {
            var $newsContent = this.$newsContent = this.$ct.find('#news-content'),
                $item = this.$item = this.$ct.find('#news-content>.item'),
                $load = this.$load = this.$ct.find('.load');


            this.curPage = 1;
            this.perPageCount = 10;
            this.colSumHeight = [];

            this.nodeWidth = this.$item.outerWidth(true)
            this.colNum = parseInt(this.$newsContent.width() / this.nodeWidth)

            for (var i = 0; i < this.colNum; i++) {
                this.colSumHeight[i] = 0

            }

            this.start()
        },

        bind: function() {
            var _this = this;
            this.$load.on('click', function() {
                _this.start()
            })
        },

        start: function() {
            var _this = this;
            this.getData(function(newsList) {
                $.each(newsList, function(idx, news) {
                    var $node = _this.getNode(news)
                    $node.find('img').on('load', function() {

                        _this.$newsContent.append($node)

                        _this.waterFallPlace($node)
                    })
                })
            })
        },
        getData: function(callback) {
            var _this = this;
            $.ajax({
                url: ' https://platform.sina.com.cn/slide/album_tech',
                dataType: "jsonp",
                jsonp: 'jsoncallback',
                data: {
                    app_key: '1271687855',
                    num: _this.perPageCount,
                    page: _this.curPage
                }
            }).done(function(ret) {
                if (ret && ret.status && ret.status.code === "0") {
                    callback(ret.data);
                    _this.curPage++
                } else {
                    console.log('get error data');
                }
            })
        },

        getNode: function(item) {
            var html = '';
            html += '<li class="item">';
            html += '<a href="' + item.url + '"class="link"><img src="' + item.img_url + '" alt=""></a>';
            html += '<h4 class="header">' + item.short_name + '</h4>'
            html += '<p class="desp">' + item.short_intro + '</p>'
            html += '</li>'

            return $(html)
        },

        waterFallPlace: function($node) {
            var _this = this;
            $node.each(function() {
                var $cur = $(this)

                var index = 0,
                    minSumHeight = _this.colSumHeight[0];
                for (var i = 0; i < _this.colSumHeight.length; i++) {
                    if (_this.colSumHeight[i] < minSumHeight) {
                        index = i
                        minSumHeight = _this.colSumHeight[i]
                    }
                }
                $cur.css({
                    left: _this.nodeWidth * index,
                    top: minSumHeight,
                    opacity: 1
                });
                _this.colSumHeight[index] += $cur.outerHeight(true)
                _this.$newsContent.height(Math.max.apply(null, _this.colSumHeight))
            })
        }
    }


    return LoadNews;
//})

})()

module.exports= newLoadmore;