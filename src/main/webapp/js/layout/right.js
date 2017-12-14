var ctx;
var tabOffset=0;
var maxOffset=0;

$(function() {
    ctx = getTopPage().path;

    tabOffset = 1;

    addTab("a","首页","/",true,true,true);
    addTab("b","测试新增b","/test",true,true);
    addTab("c","测试可关闭","/",false,true);
    // addTab("b1","测试新增b1","/test",true,true);
    // addTab("c1","测试可关闭1","/",false,true);
    // addTab("b2","测试新增b2","/test",true,true);
    // addTab("c2","测试可关闭2","/",false,true);
    // addTab("b3","测试新增b3","/test",true,true);
    // addTab("c3","测试可关闭3","/",false,true);
    // addTab("b4","测试新增b4","/test",true,true);
    // addTab("c4","测试可关闭4","/",false,true);
    // addTab("b5","测试新增b5","/test",true,true);
    // addTab("c5","测试可关闭5","/",false,true);
    // addTab("b6","测试新增b6","/test",true,true);
    // addTab("c6","测试可关闭6","/",false,true);
    // addTab("b7","测试新增b7","/test",true,true);
    // addTab("c7","测试可关闭7","/",false,true);
    // addTab("b8","测试新增b8","/test",true,true);
    // addTab("c8","测试可关闭8","/",false,true);

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
            $('#frame_'+tabId).attr('src',ctx+url);
        }
    }
    else{
        var tab = '<a data-toggle="tab" onclick="refreshTab(\''+tabId+'\')">'+tabName;

        if(!isColsable){
            tab += '<img class="closeTab" src="'+ctx+'/images/empty.png" onclick="closeTab(this)">';
        }
        tab += '</a>';

        $('#li_lastTab').before('<li id="li_'+tabId+'" target="'+tabId+'">'+tab+'</li>');

        var fram = '<iframe id="frame_'+tabId+'" src="'+ctx+url+'" frameborder="0" style="height: 100%;width: 99%;display:none"></iframe>';
        $('#frames').append(fram);

    }

    if(isOpen){
        refreshTab(tabId);
    }

    refreshTabSize();
}

function refreshTabSize(){
    var maxWidth = $('#tabs').outerWidth(true)-$('#li_firstTab').outerWidth();
    var currentWidth = 0;
    var currentOffset = 1;

    $('#tabs').find('li').each(function(){
        if($(this).attr('id') == "li_firstTab" || $(this).attr('id') == "li_lastTab"){
            return true;
        }

        $(this).attr("offset",currentOffset);

        if((currentWidth + $(this).outerWidth(true))  > maxWidth) {
            currentWidth = 0;
            currentOffset++
            $(this).attr("offset", currentOffset);
        }

        if(tabOffset == $(this).attr("offset")){
            $(this).show();
        }
        else{
            $(this).hide();
        }

        currentWidth += $(this).outerWidth(true);

    });

    maxOffset = currentOffset;
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

function closeTab(obj){
    var target = $(obj).parent().parent().attr("target");

    $("#frame_"+target).remove();
    $("#li_"+target).remove();

    refreshTabSize();

    preventTopEvent(window.event);
}

function changeTabs(offset){
    tabOffset += offset;
    if(tabOffset<1){
        tabOffset = 1;
        alert("已经是最前Tab页!");
    }
    else if(tabOffset>maxOffset){
        tabOffset = maxOffset;
        alert("已经是最后Tab页!");
    }
    else{
        refreshTabSize();
    }
}