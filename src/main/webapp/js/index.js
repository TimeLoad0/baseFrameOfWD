var topValue = 70 + 48;//iframe距离浏览器顶部距离，头部高度+tab页高度

$(function(){
    //点击波纹效果
    Waves.displayEffect();

    //绑定页面点击事件,隐藏头部展开菜单
    $(document).bind("click", function () {
        $('.header_right ul li ul').each(function(){
            $(this).toggle(false);
        });
    });

    //头部功能绑定，点击展开隐藏菜单
    $('.header_right ul li a').each(function(){
        $(this).bind("click",function(){
            showMenu($(this))
        });
    });

    //初始化Tab页
    Tab.addTab('test','文章管理', '/test');
    Tab.addTab('test1','文章管理1', '/');
    Tab.addTab('test11','文章管理11', '/test');
    Tab.addTab('test111','文章管理111', '/');

    //页面 tabs li 绑定点击事件,切换Tab页
    $(document).on('click', '.tabs li', function() {
        // 切换选项卡
        $('.tabs li').removeClass('cur');
        $(this).addClass('cur');

        // 切换iframe
        $('.iframe').removeClass('cur');
        $('#iframe_' + $(this).data('key')).addClass('cur');
    });

    // 控制选项卡滚动位置 向左箭头
    $(document).on('click', '.tab_left>a', function() {
        $('.tabs>ul').animate({scrollLeft: $('.tabs>ul').scrollLeft() - 300}, 200, function() {
            initScrollState();
        });
    });
    // 控制选项卡滚动位置 向右箭头
    $(document).on('click', '.tab_right>a', function() {
        $('.tabs>ul').animate({scrollLeft: $('.tabs>ul').scrollLeft() + 300}, 200, function() {
            initScrollState();
        });
    });

    // 选项卡右键菜单
    var menu = new BootstrapMenu('.tabs li', {
        fetchElementData: function(item) {
            return item;
        },
        actionsGroups: [
            ['close', 'refresh'],
            ['closeOther', 'closeAll'],
            ['closeRight', 'closeLeft']
        ],
        actions: {
            close: {
                name: '关闭',
                iconClass: 'fa-close',
                onClick: function(item) {
                    Tab.closeTab($(item));
                }
            },
            closeOther: {
                name: '关闭其他',
                iconClass: 'fa-arrows-h',
                onClick: function(item) {
                    var key = $(item).data('key');
                    $('.tabs li').each(function() {
                        if ($(this).data('key') != key) {
                            Tab.closeTab($(this));
                        }
                    });
                }
            },
            closeAll: {
                name: '关闭全部',
                iconClass: 'fa-exchange',
                onClick: function() {
                    $('.tabs li').each(function() {
                        Tab.closeTab($(this));
                    });
                }
            },
            closeRight: {
                name: '关闭右侧所有',
                iconClass: 'fa-long-arrow-right',
                onClick: function(item) {
                    var key = $(item).data('key');
                    $($('.tabs li').toArray().reverse()).each(function() {
                        if ($(this).data('key') != key) {
                            Tab.closeTab($(this));
                        } else {
                            return false;
                        }
                    });
                }
            },
            closeLeft: {
                name: '关闭左侧所有',
                iconClass: 'fa-long-arrow-left',
                onClick: function(item) {
                    var key = $(item).data('key');
                    $('.tabs li').each(function() {
                        if ($(this).data('key') != key) {
                            Tab.closeTab($(this));
                        } else {
                            return false;
                        }
                    });
                }
            },
            refresh: {
                name: '刷新',
                iconClass: 'fa-refresh',
                onClick: function(item) {
                    var key = $(item).data('key');
                    var $iframe = $('#iframe_' + key).find('iframe');
                    $iframe.attr('src', $iframe.attr('src'));
                }
            }
        }
    });

    //页面大小变化触发事件
    window.onresize = function() {
        //调整框架高度
        resizeFrameHeight();

        //初始化Tab页滚动条
        initScrollShow();

        //初始化Tab页滚动条状态
        initScrollState();
    }
})

//显示头像隐藏菜单
function showMenu(obj){
    var left = $(obj).position().left;
    var	width = $(obj).next().outerWidth(true);
    var maxWidth = $('.header_content').outerWidth(true);

    if(left+width>maxWidth){
        $(obj).next().css('right','0');
    }
    else{
        $(obj).next().css('right','auto');
    }

    $('.header_right ul li ul').each(function(){
        if($(this).css('display') =='block' && !$(this).is($(obj).next())){
            $(this).toggle(false);
        }
    });
    $(obj).next().fadeToggle();
    preventTopEvent(window.event);
}

//初始化Tab页滚动条
function initScrollShow() {
    if (document.getElementById('tabs').scrollWidth > document.getElementById('tabs').clientWidth) {
        $('.tabs').addClass('scroll');
    } else {
        $('.tabs').removeClass('scroll');
    }
}

//初始化Tab页滚动条状态
function initScrollState() {
    if ($('.content_tab>ul').scrollLeft() == 0) {
        $('.tab_left>a').removeClass('active');
    } else {
        $('.tab_left>a').addClass('active');
    }
    if (($('.content_tab>ul').scrollLeft() + document.getElementById('tabs').clientWidth) >= document.getElementById('tabs').scrollWidth) {
        $('.tab_right>a').removeClass('active');
    } else {
        $('.tab_right>a').addClass('active');
    }
}

// 选项卡对象
var Tab = {
    addTab: function(key,title, url) {

        // 如果存在选项卡，则激活，否则创建新选项卡
        if ($('#tab_' + key).length == 0) {
            // 添加选项卡
            $('.tabs li').removeClass('cur');
            var tab = '<li id="tab_' + key +'" data-key="' + key + '" class="cur"><a class="waves-effect waves-light">' + title + '</a></li>';
            $('.tabs>ul').append(tab);
            // 添加iframe
            $('.iframe').removeClass('cur');
            var iframe = '<div id="iframe_' + key + '" class="iframe cur"><iframe class="tab_iframe" src="' + path + url + '" width="100%" frameborder="0" scrolling="auto" onload="changeFrameHeight(this)"></iframe></div>';
            $('.iframes').append(iframe);

            //初始化滚动栏
            initScrollShow();
            $('.tabs>ul').animate({scrollLeft: document.getElementById('tabs').scrollWidth - document.getElementById('tabs').clientWidth}, 200, function() {
                //初始化滚动栏状态
                initScrollState();
            });
        } else {
            $('#tab_' + key).trigger('click');
        }
    },
    closeTab: function($item) {
        var closeable = $item.data('closeable');
        if (closeable != false) {
            // 如果当前时激活状态则关闭后激活左边选项卡
            if($item.hasClass('cur')) {
                $item.prev().trigger('click');
            }
            // 关闭当前选项卡
            var key = $item.data('key');
            $('#iframe_' + key).remove();
            $item.remove();
        }
        initScrollShow();
    }
}

// iframe高度自适应
function changeFrameHeight(ifm) {
    ifm.height = document.documentElement.clientHeight - topValue;
}

// iframe高度自适应
function resizeFrameHeight() {
    $('.tab_iframe').css('height', document.documentElement.clientHeight - topValue);
}
