var ctx;
$(function() {
    ctx = getTopPage().path;
    //lastTab绑定显示隐藏Tabs事件
    $("#li_lastTab").mouseenter(function () {
        showTabs(this)
    });

    //lastTab绑定隐藏隐藏Tabs事件
    $("#li_lastTab").parent().mouseleave(function () {
        hidTabs();
    });

    addTab("a","首页","/",true,true,true);
    addTab("b","测试新增b","/test",true,true);
    addTab("c","测试可关闭","/",false,true);
    //初始化Tab栏
    refreshTabSize();

    //页面长度变化时自动调整显示Tab事件
    $(window).resize(function(){
        refreshTabSize();
    });


});

/**
 * 新增Tab页,如果已经存在刷新页面内容,如果不存在则增加对应的Tab页
 * @param tabId         tab唯一标识
 * @param tabId         tab名称
 * @param url           tab页对应页面
 * @param isColsable    是否可关闭(默认可关闭,false可关闭，true不可关闭)
 * @param isRefresh     是否刷新页面(默认刷新)
 * @param isOpen        是否打开页面(默认不打开)
 */
function addTab(tabId,tabName,url,isColsable,isRefresh,isOpen){
    //如果已经存在tabId,则进行页面是否刷新判断,否则新增tabId对应的tab页
    if($('#li_'+tabId).length > 0){
        if(isRefresh != false && url != ''){
            $('#frame_'+tabId).attr('src',url);
        }
    }
    else{
        var tab = '<a data-toggle="tab" onclick="refreshTab(\''+tabId+'\')">'+tabName;

        if(!isColsable){
            tab += '<img class="closeTab" src="'+ctx+'/images/empty.png" onclick="closeTab(this)">';
        }
        tab += '</a>';

        $('#li_lastTab').before('<li id="li_'+tabId+'" target="'+tabId+'">'+tab+'</li>');

        var fram = '<iframe id="frame_'+tabId+'" src="'+ctx+url+'" frameborder="0" style="height: 100%;width: 99%"></iframe>';
        $('#frames').append(fram);
    }

    if(isOpen){
        refreshTab(tabId);
    }

    refreshTabSize();
}

function refreshTabSize(){
    var maxWidth = $('#tabs').outerWidth(true)-$('#li_lastTab').outerWidth(true);
    var currentWidth = 0;

    $('#hidTabs').html('');

    $('#tabs').find('li').each(function(){
        currentWidth += $(this).outerWidth(true);

        if(currentWidth>maxWidth && $(this).attr('id') != "li_lastTab"){
            var a = $(this).clone(true);
            a.show();
            $('#hidTabs').append(a);
            $(this).hide();
        }else{
            if($(this).attr('id') != "li_lastTab" || $('#hidTabs').find('a').length>0){
                $(this).show();
            }else{
                $(this).hide();
            }

        }
    });
}

/**
 * 刷新选中Tab
 * @param tabId
 */
function refreshTab(tabId){
    $('#tabs').find('li').each(function(){
        if($(this).attr("id") != 'li_lastTab'){
            $(this).attr('class',"");
        }

    });

    $('#li_'+tabId).attr('class',"active");

    $('iframe').each(function(){
        $(this).css('display',"none");
    });
    $('#frame_'+tabId).css('display',"block");
}

function showTabs(obj){
    var top = $(obj).offset().top + $('#tabs').outerHeight(true)-1;
    var left = $(obj).offset().left - ($('#hidTabs').outerWidth(true)-$('#li_lastTab').outerWidth(true)+1);

    $('#hidTabs').css("top",top + "px");
    $('#hidTabs').css("left",left + "px");
    $('#hidTabs').show();
}

function hidTabs(){
    $('#hidTabs').hide();
}

function closeTab(obj){
    var target = $(obj).parent().parent().attr("target");

    $("#frame_"+target).remove();
    $("#li_"+target).remove();

    refreshTabSize();

    preventTopEvent(window.event);
}