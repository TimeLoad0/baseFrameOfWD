/**
 * 工具脚本
 * 需要jQuery、bootstrap，jQuery-confirm、jvalidate等插件支持
 * 2017-12-11 20:37:10
 * wj
 */
var _tableOptions = {}; //表格选项
var _data = {}; //数据缓存

//laydate全局默认设置
laydate.set({
    theme:'#008080'
});

//ajax全局默认设置
$.ajaxSetup({
    type:'POST',
    dataType:'json',
    error:function(x,e){
        return false;
    }
});

//创建绑定表格
function createPage(options,data) {
    //默认选项
    var _defaultOptions = {
        add:true,           //新增，默认true
        search:true,        //搜索，默认true
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

    //是否添加搜索按钮
    if(options.search){
        var form = $('<form id="search_form" class="form-inline"></form>');
        var labelSelectDiv = $('<div class="form-group"><label class="search-label text-right">检索类别：</label><select id="selectType" class="form-control search-control"></select></div>');

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
        form.append(labelSelectDiv).append(controlDiv).append(searchBtnDiv);
        leftDiv.append(form);
        toolBarDiv.append(leftDiv);
    }

    //判断右侧工具栏是否含有按钮
    if(rightBtnGroupDiv.find('a').length > 0){
        rightDiv.append(rightBtnGroupDiv);
        toolBarDiv.append(rightDiv);
    }
    //判断工具栏是否含有按钮
    if(toolBarDiv.find('div').length > 0){
        leftDiv.append(form);
        $('#mainBody').append(toolBarDiv.append(leftDiv));

        //补偿高度
        toolBarDiv.css('min-width',rightDiv.height()).css('padding','10px 5px');

        //初始化调用检索类别改变事件
        searchSelect_onchage($('#selectType'));
    }else{
        $('#mainBody').append($('<div style="height: 10px;"></div>'));
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
        $('#search_input').show().siblings().hide();
    }else if("select" == controlType){
        var selectOptions = JSON.parse(nullToEmpty(optionObj.attr('selectOptions')));
        var key = nullToObject(optionObj.attr("key"),"key");
        var view = nullToObject(optionObj.attr("view"),"view");

        $('#search_select').empty().show().siblings().hide();

        $.each(selectOptions,function(i,item){
            $('#search_select').append($('<option value="'+nullToEmpty(item[key])+'">'+nullToEmpty(item[view])+'</option>'));
        });
    }else if("date" == controlType || "datetime" == controlType || "time" == controlType){
        $('#controlDiv').children().each(function(){
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
        $('#controlDiv').children().each(function(){
            $(this).hide();
        });

        $(src).find('option').each(function(){
            var optionType = nullToEmpty($(this).attr("type"));
            var controlDiv = $('<div class="form-group">');

            if("text" == optionType){
                controlDiv.append($('<label class="search-label text-right">'+$(this).attr('text')+'：</label>'));
                controlDiv.append($('<input id="search_input" type="text" class="search-control form-control"/>'));
                controlDiv.insertAfter($('#search_btn_a').parent().parent());
            }else if("select" == optionType){
                var select = $('<select class="form-control search-control">');

                var selectOptions = JSON.parse(nullToEmpty($(this).attr('selectOptions')));
                var key = nullToObject($(this).attr("key"),"key");
                var view = nullToObject($(this).attr("view"),"view");

                $.each(selectOptions,function(i,item){
                    select.append($('<option value="'+nullToEmpty(item[key])+'">'+nullToEmpty(item[view])+'</option>'));
                });

                controlDiv.append($('<label class="search-label text-right">'+$(this).attr('text')+'：</label>'));
                controlDiv.append(select);
                controlDiv.insertAfter($('#search_btn_a').parent().parent());
            }else if("date" == optionType || "datetime" == optionType || "time" == optionType){
                controlDiv.append($('<label class="search-label text-right">'+$(this).attr('text')+'起：</label>'));
                var dateBegin = $('<input placeholder="开始时间" type="text" class="search-control form-control"/>');
                controlDiv.append(dateBegin);
                controlDiv.insertAfter($('#search_btn_a').parent().parent());

                controlDiv = $('<div class="form-group">');
                controlDiv.append($('<label class="search-label text-right">'+$(this).attr('text')+'止：</label>'));
                var dateEnd = $('<input placeholder="结束时间" type="text" class="search-control form-control"/>');
                controlDiv.append(dateEnd);
                controlDiv.insertAfter($('#search_btn_a').parent().parent());
            }
        })
    }
}