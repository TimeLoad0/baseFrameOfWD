/**
 * 工具脚本
 * 需要jQuery、bootstrap，jQuery-confirm、jvalidate等插件支持
 * 2017-12-11 20:37:10
 * wj
 */
var _tableOptions = {}; //表格选项

//创建绑定表格
function bindTable(options,data){
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

    var cells = _defaultOptions.cells;

    //创建表格
    var table = '<table id="dataTable" class="table table-striped">';
    $('#mainBody').html(table);

    //创建表头
    createThead(_defaultOptions.cells);
    //绑定表格数据
    createTbody(data);
}

//创建表头
function createThead(cells){
    var thead = '<thead><tr>';

    //循环cells创建表头列
    for(var i=0;i<cells.length;i++){
        var th = '<th field="'+cells[i].field+'">'+cells[i].text+'</th>';
        thead += th;
    }

    thead += '</tr></thead>';

    $('#dataTable').html(thead);
}

//绑定表格数据
function createTbody(data){
    if(undefined == data || "" == data || data.length <= 0){
        return;
    }

    //获取表头html
    var thead = $('#dataTable').html();
    var tbody = '<tbody>';

    var ths = $('#dataTable thead tr th');

    for(var j=0;j<data.length;j++){
        var tr = '<tr>';

        //循环表头
        for(var k=0;k<ths.length;k++){
            var td = '<td>'+data[j][$(ths[k]).attr('field')]+'</td>';
            tr += td;
        }

        tr += '</tr>';
        tbody += tr;
    }

    tbody += '</tbody>';

    $('#dataTable').html(thead + tbody);
}

