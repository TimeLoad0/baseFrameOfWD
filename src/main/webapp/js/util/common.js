/**
 * 工具脚本
 * 需要jQuery、bootstrap，jQuery-confirm、jvalidate,laydate等插件支持
 * 2017-12-11 20:37:10
 * wj
 */
var _tableOptions = {}; //表格选项
var _data = {}; //数据缓存

//laydate全局默认设置
if(!isEmpty(laydate)){
    laydate.set({
        theme:'#008080'
    });
}

//ajax全局默认设置
$.ajaxSetup({
    type:'POST',
    dataType:'json',
    error:function(xhr,settings){
        return false;
    },
    complete:function(){
        hideLoadingCover();
    },
    beforeSend:function(xhr,settings){
        //判断ajax请求是否显示加载遮罩层，默认false
        if(nullToFalse(settings.loadindCover)){
            showLoadingCover();
        }
    }
});

/**
 * 创建绑定表格
 * @param options,data
 * options:{
        add:true,                   //新增，默认true
        search:true,                //搜索，默认true
        searchFunc:search_onclick,  //搜索按钮点击事件，默认search_onclick
        combineSearch:false,        //组合多条件查询，默认false，当search也为true时会在检索类别里添加组合查询选项用来切换组合查询和普通查询
        exportData:true,            //导出数据，默认true
        checkBox:true,              //复选框，默认true
        pagination:true,            //分页信息，默认true
        serialNumber:true           //序列号，默认true
        cells:[{                    //table列集合
            text:"text",            //表头显示文本
            field:"field",          //对应数据字段
            type:"select",          //控件类型，如：text，date，time，datetime，select等
            search:true,            //是否作为搜索条件，默认false
            selectOptions:[],       //字典选项数组，当type=select时生效
            key:"key",              //字典key，当type=select时配合selectOptions使用，可以为空，默认为key
            view:"view",            //字典view，当type=select时配合selectOptions使用，可以为空，默认为view
            click:"function name",  //列点击事件，传入方法名字符串，默认回传当前对象和tableOptions表格选项两个参数
            display:false           //是否显示，默认true
        }]
    }
 */
function createPage(options,data) {
    //默认选项
    var _defaultOptions = {
        add:true,           //新增，默认true
        search:true,        //搜索，默认true
        searchFunc:search_onclick, //搜索按钮点击事件，默认search_onclick
        combineSearch:false,//组合多条件查询，默认false
        exportData:true,    //导出数据，默认true
        checkBox:true,      //复选框，默认true
        pagination:true,    //分页信息，默认true
        serialNumber:true   //序列号，默认true
    };

    //合并选项
    _tableOptions = $.extend(true,_defaultOptions,options);

    //创建搜索工具栏
    createSearchToolBar(_tableOptions);

    //创建表格
    $('#mainBody').append($('<div class="panel panel-default"><table id="dataTable" class="table table-striped"></table></div>'));

    //创建表头
    createThead(_tableOptions);
    //绑定表格数据
    bindTbody(data);
}

//创建搜索工具栏
function createSearchToolBar(options){
    var toolBarDiv = $('<div class="panel panel-heading"></div>');
    var leftDiv = $('<div style="width: 80%;"></div>');
    var form = $('<form id="search_form" class="form-inline" style="line-height: 35px;"></form>');
    var rightDiv = $('<div class="pull-right" style="width: 20%;"></div>');
    var rightBtnGroupDiv = $('<div class="btn-group pull-right"></div>');

    //是否添加新增按钮
    if(options.add){
        rightBtnGroupDiv.append($('<a class="btn btn-primary">新建</a>'));
    }

    //是否添加导出按钮
    if(options.exportData){
        rightBtnGroupDiv.append($('<a class="btn btn-primary">导出</a>'));
    }

    //是否添加搜索栏
    if(options.search){
        var labelSelectDiv = $('<div id="search_type_div" class="form-group"><label class="search-label text-right">检索类别：</label><select id="selectType" class="form-control search-control"></select></div>');

        var cells = options.cells;

        for(var index in cells){
            if(nullToFalse(cells[index].search)){
                var option = $('<option type="'+cells[index].type+'">'+cells[index].text+'</option>');

                //判断selectOptions是否为空
                if(!isEmpty(cells[index].selectOptions)){
                    option.attr("selectOptions",JSON.stringify(cells[index].selectOptions));
                }

                //判断key是否为空
                if(!isEmpty(cells[index].key)){
                    option.attr("key",cells[index].key);
                }

                //判断view是否为空
                if(!isEmpty(cells[index].view)){
                    option.attr("view",cells[index].view);
                }

                //判断field是否为空
                if(!isEmpty(cells[index].field)){
                    option.attr("field",cells[index].field);
                }

                //判断text是否为空
                if(!isEmpty(cells[index].text)){
                    option.attr("text",cells[index].text);
                }

                labelSelectDiv.find('select').append(option);
            }
        }

        //是否组合多条件查询
        if(options.combineSearch){
            labelSelectDiv.find('select').append($('<option type="combineSearch">组合查询</option>'));
        }

        //下拉框绑定事件
        labelSelectDiv.find('select').off('change').on('change',function(){
            searchSelect_onchage(this);
        });

        var controlDiv = $('<div id="controlDiv" class="form-group">');
        var input = $('<input id="search_input" type="text" class="search-control form-control"/>').hide(); //输入框，初始隐藏
        var select = $('<select id="search_select" class="form-control search-control">').hide(); //下拉框，初始隐藏
        var dateBegin = $('<input id="search_input_begin" placeholder="开始时间" type="text" class="search-control form-control"/>').hide(); //时间控件起，初始隐藏
        var dateEnd = $('<input id="search_input_end" placeholder="结束时间" type="text" class="search-control form-control"/>').hide(); //时间控件止，初始隐藏
        controlDiv.append(input).append(select).append(dateBegin).append(dateEnd);

        var searchBtnDiv = $('<div class="form-group"><div class="btn-group"><a id="search_btn_a" class="btn btn-primary">搜索</a></div></div>');

        searchBtnDiv.off('click').on('click',function(){
            options.searchFunc();
        });

        form.append(labelSelectDiv).append(controlDiv).append(searchBtnDiv);
    }

    //判断右侧工具栏是否含有按钮
    if(rightBtnGroupDiv.find('a').length > 0){
        rightDiv.append(rightBtnGroupDiv);
        toolBarDiv.append(rightDiv);
    }

    leftDiv.append(form);
    $('#mainBody').append(toolBarDiv.append(leftDiv));

    //判断工具栏是否含有按钮
    if(form.find('div').length > 0){
        //初始化调用检索类别改变事件
        searchSelect_onchage($('#selectType'));
    }else{
        //补偿高度
        toolBarDiv.css('min-height',rightDiv.height()+20).css('padding','10px 5px');

        if(options.combineSearch){
            createCombineSearch();
        }else{
            $('#mainBody').append($('<div style="height: 10px;"></div>'));
        }
    }
}

//创建表头
function createThead(options) {
    var thead = $('<thead></thead>');
    var tr = $('<tr></tr>');

    var cells = options.cells;

    //判断是否添加checkbox
    if(options.checkBox){
        tr.append('<th checkbox="true"><div><input type="checkbox" class="checkbox"></div></th>');
    }

    //判断是否添加serialNumber
    if(options.serialNumber){
        tr.append('<th serialNumber="true">序号</th>');
    }

    //循环cells创建表头列
    for(var i=0;i<cells.length;i++) {
        var th = $('<th field="' + cells[i].field + '">' + cells[i].text + '</th>');

        for(var key in cells[i]){
            if("text" == key || "field" == key){
                continue;
            }

            //如果是字典数组需要转成字符串
            if("selectOptions" == key){
                th.attr(key,JSON.stringify(cells[i][key]));
            }else{
                th.attr(key,cells[i][key]);
            }
        }

        //判断是否显示
        if(!nullToTrue(cells[i].display)){
            th.css('display','none');
        }

        //判断是否添加了列点击事件
        if(nullToFalse(cells[i].click)){
            th.attr("click",cells[i].click);
        }

        tr.append(th);
    }

    thead.append(tr);
    $('#dataTable').empty().append(thead);
}

//绑定表格数据
function bindTbody(data) {
    if(isEmpty(data) || data.length <= 0) {
        return false;
    }

    _data = data; //缓存数据data

    var dataRows = data.dataRows; //获取数据行
    var dataTable = $('#dataTable'); //获取dataTable对象
    var thead = dataTable.html(); //获取表头html
    var ths = dataTable.find('thead tr th'); //获取表头所有th
    var tbody = '<tbody>'; //tbody对象

    for(var i=0;i<dataRows.length;i++) {
        var tr = '<tr rowData=' + JSON.stringify(dataRows[i]) +'>';

        //循环表头
        for(var j=0;j<ths.length;j++) {
            //判断是否添加checkbox
            if(nullToFalse($(ths[j]).attr('checkBox'))){
                tr += '<td><div><input type="checkbox" class="checkbox"></div></td>';
                continue;
            }

            //是否添加序号
            if(nullToFalse($(ths[j]).attr('serialNumber'))){
                tr += '<td>'+parseInt(i+1)+'</td>';
                continue;
            }

            //判断是否显示
            var display = $(ths[j]).css('display')=="none"?"display:none;":"";

            //判断是否有列click事件
            var onclick = nullToFalse($(ths[j]).attr('click'))?'onclick='+$(ths[j]).attr('click')+'(this,'+JSON.stringify(_tableOptions)+')':'';

            var value = nullToEmpty(dataRows[i][$(ths[j]).attr('field')]);

            //判断是否字典
            if("select" == nullToEmpty($(ths[j]).attr('type'))){
                var selectOptions = JSON.parse(nullToEmpty($(ths[j]).attr('selectOptions')));
                var view = nullToObject($(ths[j]).attr('view'),"view");
                var key = nullToObject($(ths[j]).attr('key'),"key");
                var tempValue = getValueOfArray(selectOptions,key,view,value);

                if(!isEmpty(tempValue)){
                    value = tempValue;
                }else if(!isEmpty(dataRows[i][view])){  //如果取不到字典值尝试直接从数据行中获取view值
                    value = dataRows[i][view];
                }
            }

            tr += '<td '+onclick+' style="'+display+'">' + value + '</td>';
        }

        tr += '</tr>';
        tbody += tr;
    }

    tbody += '</tbody>';

    dataTable.html(thead + tbody);
}

//空转空字符串
function nullToEmpty(obj) {
    if ( undefined == obj || null == obj ) {
        obj = "";
    }

    return obj;
}

//空转自定义
function nullToObject(obj,str) {
    if ( undefined == obj || null == obj || "" == obj) {
        obj = str;
    }

    return obj;
}

//空转false
function nullToFalse(obj) {
    if ( undefined == obj || null == obj ) {
        obj = false;
    }else if("false" == obj || false == obj){
        obj = false;
    }else if("true" == obj || true == obj){
        obj = true;
    }

    return obj;
}

//空转true
function nullToTrue(obj) {
    if ( undefined == obj || null == obj ) {
        obj = true;
    }else if("false" == obj || false == obj){
        obj = false;
    }else if("true" == obj || true == obj){
        obj = true;
    }

    return obj;
}

/** 把一个浮点数，以小数点后几位四舍五入
 *   @param srcValue 要舍位的值
 *   @param iCount  要舍位到小数点后几位
 *   @return number
 */
function round(srcValuef, iCount) {
    var srcValue = srcValuef;

    var zs = true;

    //判断是否是负数
    if ( srcValue < 0 ) {
        srcValue = Math.abs(srcValue);
        zs = false;
    }

    var iB = Math.pow(10, iCount);

    //有时乘100结果也不精确
    var value1 = srcValue * iB;

    var anumber = [];
    var anumber1 = [];

    var fvalue = value1;
    var value2 = value1.toString();
    var idot = value2.indexOf(".");

    //如果是小数
    if ( idot != -1 ) {
        anumber = srcValue.toString().split(".");

        //如果是科学计数法结果
        if ( anumber[1].indexOf("e") != -1 ) {
            return Math.round(value1) / iB;
        }

        anumber1=value2.split(".");

        if ( anumber[1].length <= iCount ) {
            return parseFloat(srcValuef,10);
        }

        var fvalue3 = parseInt(anumber[1].substring(iCount,iCount+1),10);

        if ( fvalue3 >= 5 ) {
            fvalue = parseInt(anumber1[0],10) + 1;
        } else {
            //对于传入的形如111.834999999998 的处理（传入的计算结果就是错误的，应为111.835）
            if ( fvalue3 == 4 && anumber[1].length > 10 && parseInt(anumber[1].substring(iCount+1,iCount+2),10) == 9 ) {
                fvalue = parseInt(anumber1[0],10) + 1;
            } else {
                fvalue = parseInt(anumber1[0],10);
            }
        }
    }

    //如果是负数就用0减四舍五入的绝对值
    if ( zs ) {
        return fvalue / iB;
    } else {
        return 0 - fvalue / iB;
    }
}

//判断对象是否为空
function isEmpty(src) {
    return undefined == src || null == src || "" == src;
}

//date格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if ( /(y+)/.test(format) ) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for ( var k in o ) {
        if ( new RegExp("(" + k + ")").test(format) ) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return format;
};

//判断是否为IE浏览器
function isIE() {
    if ( isEmpty(window) ) {
        return false;
    }

    //判断是否为IE浏览器
    if ( navigator.userAgent.indexOf("MSIE") > 0 ) {
        return true;
    } else {
        return "ActiveXObject" in window;
    }
}

//获取当前event对象
function getEvent() {
    var e;

    if ( !isIE() ) {
        if ( isEmpty(arguments.callee.caller) ) {
            e = arguments.callee.arguments[0];
        } else {
            e = arguments.callee.caller.arguments[0];
        }
    } else {
        e = window.event;
    }

    return e;
}

//阻止父层事件触发
function preventTopEvent(e) {
    e = getEvent();

    if ( isIE() ) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }

    e = null;
}

//获取按键对应的值
function getKeyCode(e) {
    var key = "";

    if ( isIE() ) {
        key = e.keyCode;
    } else {
        key = e.which;
    }

    return key;
}

/**
 * 获取数组对应key的view值，在数组array中如果某条记录匹配到了key=value则返回记录中对应view值
 * array 数组
 * key 数组中数据行的key
 * view 数组中数据行的view
 * value 需要匹配的值
 */
function getValueOfArray(array,key,view,value){
    if(isEmpty(array)){
        return null;
    }

    for(var i=0;i<array.length;i++){
        if(value == nullToEmpty(array[i][key])){
            return array[i][view];
        }
    }
}

//检索类别下拉框改变事件
function searchSelect_onchage(src){
    var optionObj = $(src).find('option:selected');
    var controlType = nullToEmpty(optionObj.attr("type"));
    $('#search_btn_a').parent().parent().nextAll().remove();

    if("text" == controlType){
        $('#controlDiv').prevAll().each(function(){
            if($(this).index() > 0){
                $(this).hide();
            }
        });
        $('#search_input').show().siblings().hide();
    }else if("select" == controlType){
        $('#controlDiv').prevAll().each(function(){
            if($(this).index() > 0){
                $(this).hide();
            }
        });

        var selectOptions = JSON.parse(nullToEmpty(optionObj.attr('selectOptions')));
        var key = nullToObject(optionObj.attr("key"),"key");
        var view = nullToObject(optionObj.attr("view"),"view");

        $('#search_select').empty().show().siblings().hide();

        $.each(selectOptions,function(i,item){
            $('#search_select').append($('<option value="'+nullToEmpty(item[key])+'">'+nullToEmpty(item[view])+'</option>'));
        });
    }else if("date" == controlType || "datetime" == controlType || "time" == controlType){
        $('#controlDiv').prevAll().each(function(){
            if($(this).index() > 0){
                $(this).hide();
            }
        }).end().children().each(function(){
            if("search_input_begin" == $(this).attr('id') || "search_input_end" == $(this).attr('id')){
                $(this).show();
                laydate.render({
                    elem:'#search_input_begin',
                    type:controlType
                });
                laydate.render({
                    elem:'#search_input_end',
                    type:controlType
                });
            }else{
                $(this).hide();
            }
        })
    }else if("combineSearch" == controlType){
        createCombineSearch();
    }
}

function createCombineSearch(){
    var controlDiv = $('#controlDiv');
    var searchForm = $('#search_form');

    if(_tableOptions.search){
        if(controlDiv.children().length > 1){
            controlDiv.children().each(function(){
                $(this).hide();
            });
        }

        if(controlDiv.prevAll().length > 1){
            controlDiv.prevAll().each(function(){
                if($(this).index() > 0){
                    $(this).show();
                }
            });

            return;
        }
    }

    var cells = nullToEmpty(_tableOptions.cells);

    $.each(cells,function(index,item){
        var optionType = nullToEmpty(item.type);
        var controlsDiv = $('<div class="form-group">');
        var field = nullToEmpty(item.field);

        if ("text" == optionType) {
            controlsDiv.append($('<label class="search-label text-right">' + item.text + '：</label>'));
            controlsDiv.append($('<input id="' + field + '" name="' + field + '" type="text" class="search-control form-control"/>'));

            if(_tableOptions.search){
                controlsDiv.insertBefore(controlDiv);
            }else{
                searchForm.append(controlsDiv);
            }
        } else if ("select" == optionType) {
            var select = $('<select class="form-control search-control" id="' + field + '" name="' + field + '">');

            var selectOptions = nullToEmpty(item.selectOptions);
            var key = nullToObject(item.key, "key");
            var view = nullToObject(item.view, "view");

            $.each(selectOptions, function (i, option) {
                select.append($('<option value="' + nullToEmpty(option[key]) + '">' + nullToEmpty(option[view]) + '</option>'));
            });

            controlsDiv.append($('<label class="search-label text-right">' + item.text + '：</label>'));
            controlsDiv.append(select);

            if(_tableOptions.search){
                controlsDiv.insertBefore(controlDiv);
            }else{
                searchForm.append(controlsDiv);
            }
        } else if ("date" == optionType || "datetime" == optionType || "time" == optionType) {
            controlsDiv.append($('<label class="search-label text-right">' + item.text + '起：</label>'));
            var dateBegin = $('<input id="' + field + '_begin" name="' + field + '_begin" placeholder="开始时间" type="text" class="search-control form-control"/>');
            controlsDiv.append(dateBegin);

            if(_tableOptions.search){
                controlsDiv.insertBefore(controlDiv);
            }else{
                searchForm.append(controlsDiv);
            }

            laydate.render({
                elem: '#' + field + '_begin',
                type: optionType
            });

            controlsDiv = $('<div class="form-group">');
            controlsDiv.append($('<label class="search-label text-right">' + item.text + '止：</label>'));
            var dateEnd = $('<input id="' + field + '_end" name="' + field + '_end" placeholder="结束时间" type="text" class="search-control form-control"/>');
            controlsDiv.append(dateEnd);

            if(_tableOptions.search){
                controlsDiv.insertBefore(controlDiv);
            }else{
                searchForm.append(controlsDiv);
            }

            laydate.render({
                elem: '#' + field + '_end',
                type: optionType
            });
        }
    });

    //如果搜素为false，给组合查询添加搜索按钮
    if(!_tableOptions.search){
        searchForm.append($('<div class="form-group"><div class="btn-group"><a id="search_btn_a" class="btn btn-primary">搜索</a></div></div>'));

        $('#search_btn_a').off('click').on('click',function(){
            _tableOptions.searchFunc();
        });
    }
}

/*
**
* 获取顶层页面
* @param 获取的页面对象
* @returns
*/
function getTopPage(page)
{
    if ( isEmpty(page) )
    {
        page = this;
    }

    var cnt = 0;

    while ( !isEmpty(page) && isEmpty(page.document.getElementById("base")) && cnt < 10 )
    {
        page = page.parent;

        if ( isEmpty(page) )
        {
            return null;
        }

        cnt++;
    }

    if ( cnt >= 10 )
    {
        page = this;

        return page;
    }

    return page;
}

//隐藏加载遮罩层
function hideLoadingCover(){
    $('#loadingCover').hide();
}

//创建并显示加载遮罩层
function showLoadingCover(){
    var loadingCover = $('#loadingCover');

    if(loadingCover.length <= 0){
        $(document.body).append($('<div id="loadingCover"><div class="coverDiv"></div><div class="loaderDiv"><span></span><span></span><span></span><span></span></div></div>'));
    }

    loadingCover.show();
}

//默认搜索方法
function search_onclick(){
    alert("default");

    showLoadingCover();

    window.setTimeout(function(){
        hideLoadingCover();
    },3000);
}


//获取页面的宽度
function getPageWidth(page) {
    if (isEmpty(page)) {
        if (parseInt(document.documentElement.clientWidth) != 0) {
            return document.documentElement.clientWidth;
        }

        return document.body.clientWidth;
    }

    if (parseInt(page.document.documentElement.clientWidth) != 0) {
        return page.document.documentElement.clientWidth;
    }

    return page.document.body.clientWidth;
}

//获取页面的高度
function getPageHeight(page) {
    if (isEmpty(page)) {
        if (parseInt(document.documentElement.clientHeight) != 0) {
            return document.documentElement.clientHeight;
        }

        return document.body.clientHeight;
    }

    if (parseInt(page.document.documentElement.clientHeight) != 0) {
        return page.document.documentElement.clientHeight;
    }

    return page.document.body.clientHeight;
}