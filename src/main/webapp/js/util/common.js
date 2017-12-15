/**
 * 工具脚本
 * 需要jQuery、bootstrap，jQuery-confirm、jvalidate等插件支持
 * 2017-12-11 20:37:10
 * wj
 */
var _tableOptions = {}; //表格选项
var _data = {}; //数据缓存

//创建绑定表格
function bindTable(options,data) {
    //默认选项
    var _defaultOptions = {
        add:true,           //新增，默认true
        search:true,        //搜索，默认true
        exportData:true,    //导出数据，默认true
        checkBox:true,      //复选框，默认true
        pagination:true     //分页信息，默认true
    };

    //合并选项
    _tableOptions = $.extend(true,_defaultOptions,options);

    //创建表格
    var table = '<table id="dataTable" class="table table-striped">';
    $('#mainBody').html(table);

    //创建表头
    createThead(_tableOptions.cells);
    //绑定表格数据
    createTbody(data);
}

//创建表头
function createThead(cells) {
    var thead = '<thead><tr>';

    //循环cells创建表头列
    for(var i=0;i<cells.length;i++) {
        var display = !nullToTrue(cells[i].display)?"display:none;":"";

        thead += '<th style="'+display+'" field="' + cells[i].field + '">' + cells[i].text + '</th>';
    }

    thead += '</tr></thead>';

    $('#dataTable').html(thead);
}

//绑定表格数据
function createTbody(data) {
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
        var tr = '<tr>';

        //循环表头
        for(var j=0;j<ths.length;j++) {
            tr += '<td rowData=' + JSON.stringify(dataRows[i]) + '>' + dataRows[i][$(ths[j]).attr('field')] + '</td>';
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

//空转false
function nullToFalse(obj) {
    if ( undefined == obj || null == obj ) {
        obj = false;
    }

    return obj;
}

//空转true
function nullToTrue(obj) {
    if ( undefined == obj || null == obj ) {
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