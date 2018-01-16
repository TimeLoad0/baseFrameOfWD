//iframe距离浏览器顶部距离，头部高度+tab页高度
var topValue = 70 + 48;

$(function(){
    //初始化Tab页
    initTab();

    //初始菜单
    initMenu();

    //初始化页面事件
    initPageEvent();

    //页面大小变化触发事件
    window.onresize = function() {
        //调整框架高度
        resizeFrameHeight();

        //初始化Tab页滚动条
        initScrollShow();

        //初始化Tab页滚动条状态
        initScrollState();
    }
});


function initTab(){
    Tab.addTab('test','文章管理', '/',false);
    Tab.addTab('test1','测试', '/test');
}

function initMenu(){
    var data = [
        {menuNo:'1',title:'首页',url:'/test',icon:'home',parentNo:'0',level:1},
        {menuNo:'2',title:'系统管理',url:'/',icon:'cog',parentNo:'0',level:1},
        {menuNo:'21',title:'系统',url:'/test',icon:'cog',parentNo:'2',level:2},
        {menuNo:'211',title:'系统1',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'212',title:'系统2',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'213',title:'系统1',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'214',title:'系统2',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'215',title:'系统1',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'216',title:'系统2',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'217',title:'系统1',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'218',title:'系统2',url:'/test',icon:'file',parentNo:'21',level:3},
        {menuNo:'22',title:'组织管理',url:'/test',icon:'file',parentNo:'2',level:2},
        {menuNo:'3',title:'角色用户管理',url:'/test',icon:'folder',parentNo:'0',level:1},
        {menuNo:'31',title:'角色',url:'/test',icon:'file',parentNo:'3',level:2},
        {menuNo:'32',title:'用户',url:'/test',icon:'file',parentNo:'3',level:2}
    ];

    $(".main-menu").empty();

    var context = recursiveMenu(data,1,"0");
    $(".main-menu").html(context);

    var context = recursiveThinMenu(data,1,"0");
    $(".main-menu-extend").html(context);
}

function initPageEvent(){
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

    //菜单左右伸缩
    $(".rightBar").mouseover(function () {
        $(".right_btn").show();
    });
    $(".rightBar").mouseout(function () {
        $(".right_btn").hide();
    });
    $(".right_btn").click(function(){
        $(".right_btn").hide();
        $(".right_btn").toggleClass("right_btn_style");
        $(".main-menu").toggleClass("active");
        $(".main-menu-extend").toggleClass("active");

        var findWidth = 0;

        //判断收缩还是展开,当前为最小和最大宽度为:50,190
        if($(".right_btn").hasClass("right_btn_style")){
            findWidth = 50;
            $(".content").css("padding-left",findWidth);
        }
        else{
            findWidth = 190;
        }

        $(".sidebar").width(findWidth);
        $(".rightBar").animate({left:findWidth});
        $(".content").animate({paddingLeft:findWidth});

    })

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

    $('.main-menu li>a').each(function(){
        $(this).bind("click",function(){
            $(this).parent().siblings().find('ul').slideUp();
            $(".main-menu").find('a').removeClass("active-a");
            $(this).parent().siblings().find('.fa-angle-up').addClass("fa-angle-down");

            $(this).next('ul').slideToggle();

            $(this).addClass("active-a");

            if($(this).find('.right').hasClass("fa-angle-down")){
                $(this).find('.right').removeClass("fa-angle-down");
                $(this).find('.right').addClass("fa-angle-up");
            }else{
                if($(this).find('.right').hasClass("fa-angle-up")){
                    $(this).removeClass("active-a");
                }

                $(this).find(".active-a").removeClass("active-a");
                $(this).find('.right').removeClass("fa-angle-up");
                $(this).find('.right').addClass("fa-angle-down");
            }
        });
    });

    //瘦菜单展开
    $(".main-menu-extend>.sub-menu-extend>a").mouseenter(function(){
        var top = $(this).position().top;
        var	left = $(this).outerWidth(true);
        var	height = $(this).outerHeight(true);
        $(this).next("ul").css("min-height",height);
        $(this).next("ul").css("max-height",300);
        $(this).next("ul").css("left",left);
        $(this).next("ul").css("top",top+70);
        $(this).next("ul").show();

    });

    //瘦菜单收缩
    $(".main-menu-extend>.sub-menu-extend").mouseleave(function(){
        $(this).children("ul").hide();
    });

    //瘦菜单子菜单展开或收缩
    $('.main-menu-extend>.sub-menu-extend>ul li>a').each(function(){
        $(this).bind("click",function(){
            $(this).next('ul').slideToggle();
            $('.main-menu-extend').find('.active-a').removeClass("active-a");

            $(this).addClass("active-a");

            if($(this).find('.right').hasClass("fa-angle-down")){
                $(this).find('.right').removeClass("fa-angle-down");
                $(this).find('.right').addClass("fa-angle-up");
            }else{
                if($(this).find('.right').hasClass("fa-angle-up")){
                    $(this).removeClass("active-a");
                }
                $(this).find('.right').removeClass("fa-angle-up");
                $(this).find('.right').addClass("fa-angle-down");
            }
        });
    });
}

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
    addTab: function(key,title, url,closeable) {

        // 如果存在选项卡，则激活，否则创建新选项卡
        if ($('#tab_' + key).length == 0) {
            // 添加选项卡
            $('.tabs li').removeClass('cur');
            var tab = '<li id="tab_' + key +'" data-key="' + key + '" data-closeable="' + (closeable==false?false:true) + '" class="cur"><a class="waves-effect waves-light">' + title + '</a></li>';
            $('.tabs>ul').append(tab);
            // 添加iframe
            $('.iframe').removeClass('cur');
            var iframeDiv = $('<div id="iframe_' + key + '" class="iframe cur"><iframe class="tab_iframe" src="' + path + url + '" width="100%" frameborder="0" scrolling="auto" onload="changeFrameHeight(this)"></iframe></div>');
            //添加遮罩层
            $(iframeDiv).append($('<div id="loadingCover"><div class="coverDiv" style="top:50px;"></div><div class="loaderDiv"><span></span><span></span><span></span><span></span></div></div>'));
            $('.iframes').append(iframeDiv);

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

    //移除遮罩层
    $('#loadingCover').remove();
}

// iframe高度自适应
function resizeFrameHeight() {
    $('.tab_iframe').css('height', document.documentElement.clientHeight - topValue);
}

function recursiveMenu(data,level,parentNo){
    var str = '';

    if(level >= 4){
        return "";
    }

    for(var i = 0;i < data.length;i++){
        if(data[i].level != level || (data[i].parentNo != parentNo)){
            continue;
        }

        var subStr = recursiveMenu(data,data[i].level+1,data[i].menuNo);

        str += '<li class="sub-menu">';

        str += '<a class="waves-effect" href="javascript:;"';
        if(subStr == ''){
            str += ' onclick="Tab.addTab(\''+data[i].menuNo+'\',\''+data[i].title+'\',\''+data[i].url+'\')"';
        }
        str += '>';

        str += '<i class="fa fa-'+data[i].icon+'"></i>';
        str += data[i].title;

        if(subStr != ''){
            str += '<i class="right fa fa-angle-down"></i>';
        }

        str += '</a>';

        if(subStr != ''){
            str += '<ul>';
            str += subStr;
            str += '</ul>';
        }

        str += '</li>';
    }
    return str;
}

function recursiveThinMenu(data){
    var str = '';

    for(var i = 0;i < data.length;i++){
        if(data[i].level != 1){
            continue;
        }

        var subStr = recursiveMenu(data,data[i].level+1,data[i].menuNo);

        str += '<li class="sub-menu-extend">';
        str += '<a class="waves-effect" href="javascript:;"';
        if(subStr == ''){
            str += ' onclick="Tab.addTab(\''+data[i].menuNo+'\',\''+data[i].title+'\',\''+data[i].url+'\')"';
        }
        str += '>'
        str += '<i class="fa fa-'+data[i].icon+' fa-2x"></i>';
        str += '</a>';

        str += '<ul class="sub-menu-extend-ul" style="left: 50px;top: 118px;">';
        str += '<a class="waves-effect" style="font-size: 15px;padding-top: 12px;" href="javascript:;" ';
        if(subStr == ''){
            str += ' onclick="Tab.addTab(\''+data[i].menuNo+'\',\''+data[i].title+'\',\''+data[i].url+'\')"';
        }
        str += '>'+data[i].title+'</a>';

        if(subStr != ''){
            str += subStr;
        }

        str += '</ul>';
        str += '</li>';
    }
    return str;
}


function fullPage() {
    if ($.util.supportsFullScreen) {
        if ($.util.isFullScreen()) {
            $.util.cancelFullScreen();
        } else {
            $.util.requestFullScreen();
        }
    } else {
        alert("当前浏览器不支持全屏 API，请更换至最新的 Chrome/Firefox/Safari 浏览器或通过 F11 快捷键进行操作。");
    }
}
