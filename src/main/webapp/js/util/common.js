/**
 * 工具脚本
 * 需要jQuery、bootstrap，jQuery-confirm、jvalidate,laydate等插件支持
 * 2017-12-11 20:37:10
 * wj
 */
//表格选项
var _tableOptions = {};
//对话框传参
var _dialogParams = {};
//对话框对象
var _dialog = null;
//搜索工具栏数据字典缓存
var _selectOptions = {};

//laydate全局默认设置
if (!isEmpty(laydate)) {
    laydate.set({
        theme: '#008080'
    });
}

//ajax全局默认设置
$.ajaxSetup({
    type: 'POST',
    dataType: 'json',
    error: function (xhr) {
        if (isEmpty(xhr.responseText)) {
            return false;
        }

        //判断是否session超时
        if (xhr.responseText.indexOf("login.css") !== -1) {
            $.alert({
                type: "orange",
                content: "登录已超时，请重新登录",
                title: "<span class='fa fa-exclamation-circle' style='color:#f1c40f;'>&nbsp;</span>系统信息",
                boxWidth: "400px",
                useBootstrap: false,
                closeIcon: false,
                buttons: {
                    confirm: {
                        text: '确认',
                        btnClass: 'btn-orange',
                        action: function () {
                            window.top.location = window.top.ctx + "/login";
                        }
                    }
                }
            })
        }
    },
    complete: function () {
        hideLoadingCover();
    },
    beforeSend: function (xhr, settings) {
        //判断ajax请求是否显示加载遮罩层，默认false
        if (nullToFalse(settings.loadindCover)) {
            showLoadingCover();
        }
    }
});

/**
 * 创建绑定表格
 * @param options
 * @param data
 * @param src
 * options:{
        add:true,                   //新增，默认true
        search:true,                //搜索，默认true
        searchFunc:search_onclick,  //搜索按钮点击事件，默认search_onclick
        combineSearch:false,        //组合多条件查询，默认false，当search也为true时会在检索类别里添加组合查询选项用来切换组合查询和普通查询
        exportData:true,            //导出数据，默认true
        checkBox:true,              //复选框，默认true
        pagination:true,            //分页信息，默认true
        pageList:[10,20,50,100],    //默认分页条数
        serialNumber:true           //序列号，默认true
        cellVisible:false,          //列可见选项，默认false
        cells:[{                    //table列集合
            text:"text",            //表头显示文本
            field:"field",          //对应数据字段
            type:"select",          //控件类型，如：text，date，time，datetime，select等
            search:true,            //是否作为搜索条件，默认false
            selectOptions:[],       //字典选项数组，当type=select时生效
            key:"key",              //字典key，当type=select时配合selectOptions使用，可以为空，默认为key
            view:"view",            //字典view，当type=select时配合selectOptions使用，可以为空，默认为view
            click:"function name",  //列点击事件，传入方法名字符串，默认回传当前对象和tableOptions表格选项两个参数
            sort:false,             //是否排序，默认false
            display:false,          //是否显示，默认true
            operation: [{           //默认操作列
                "text": "编辑",   //按钮文本
                "action": "rowEditOnclick",     //按钮事件
                "class":"btn-primary",      //按钮样式
                "icon":"fa-pencil",          //按钮图标
                "display":true      //是否显示，支持事件形式
            }]
        }]
    }
 */
function createPage(options, data, src) {
    //默认选项
    var _defaultOptions = {
        add: true,                   //新增，默认true
        search: true,                //搜索，默认true
        searchFunc: search_onclick, //搜索按钮点击事件，默认search_onclick
        combineSearch: false,        //组合多条件查询，默认false
        exportData: true,            //导出数据，默认true
        checkBox: true,              //复选框，默认true
        pagination: true,            //分页信息，默认true
        pageList: [10, 20, 50, 100], //默认分页条数
        serialNumber: true,          //序列号，默认true
        cellVisible: false           //列可见选项，默认false
    };

    //合并选项
    _tableOptions = $.extend(true, _defaultOptions, options);

    //获取mainbody对象
    var mainBody = $(isEmpty(src) ? '#mainBody' : src);

    //创建搜索工具栏
    createSearchToolBar(_tableOptions, mainBody);

    //创建表格
    mainBody.append('<div class="panel panel-default panel-table" style="position: relative"><table id="dataTable" class="table table-striped table-hover"></table></div>');

    //创建表头
    createThead(_tableOptions);
    //绑定表格数据
    bindTbody(data);

    //是否创建分页信息
    if (_tableOptions.pagination) {
        var pageSize = 0;
        var pageNo = 1;
        var totalSize = 0;

        if (!isEmpty(data)) {
            pageSize = nullToObject(data.pageSize, 0);
            pageNo = nullToObject(data.pageNo, 1);
            totalSize = nullToObject(data.totalSize, 0);
        }

        createPagination(pageSize, pageNo, totalSize, _tableOptions.pageList);
    }
}

//创建搜索工具栏
function createSearchToolBar(options, src) {
    var toolBarDiv = $('<div class="panel panel-heading"></div>');
    var leftDiv = $('<div></div>');
    var form = $('<form class="form-inline" style="line-height: 34px;"></form>');
    var rightDiv = $('<div class="pull-right"></div>');
    var rightBtnGroupDiv = $('<div class="btn-group pull-right inline-flex"></div>');

    //是否添加操作列工具按钮
    if (nullToFalse(options.toolButtons)) {
        for (var toolIndex in options.toolButtons) {
            var operAction = nullToEmpty(options.toolButtons[toolIndex]["action"]);
            var operText = nullToEmpty(options.toolButtons[toolIndex]["text"]);
            var operDisplay = nullToTrue(options.toolButtons[toolIndex]["display"]);
            var operClass = nullToEmpty(options.toolButtons[toolIndex]["class"]);
            var operIcon = nullToEmpty(options.toolButtons[toolIndex]["icon"]);

            //如果按钮文本为空
            if (isEmpty(operText)) {
                continue;
            }

            //是否显示
            if (!operDisplay) {
                continue;
            }

            var rightBtn = $('<a class="btn btn-primary"><i class="fa ' + operIcon + '"></i>&nbsp;' + operText + '</a>');

            //自定义样式
            if (!isEmpty(operClass)) {
                rightBtn.addClass(operClass);
            }

            //绑定事件
            if (!isEmpty(operAction)) {
                //闭包
                (function () {
                    var action = operAction;
                    rightBtn.off('click').on('click', function () {
                        action();
                    })
                })();
            }

            rightBtnGroupDiv.append(rightBtn);
        }
    }

    //是否添加新增按钮
    if (options.add) {
        rightBtnGroupDiv.append($('<a class="btn btn-primary">新建</a>'));
    }

    //是否添加导出按钮
    if (options.exportData) {
        rightBtnGroupDiv.append($('<a class="btn btn-primary">导出</a>'));
    }

    //是否添加列是否显示选框
    if (options.cellVisible) {
        rightBtnGroupDiv.append($('<div id="cellVisible" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">显示 <span class="caret"></span></div>'));
    }

    //是否添加搜索栏
    if (options.search) {
        var labelSelectDiv = $('<div id="search_type_div" class="form-group"><label class="search-label text-right">检索类别：</label><select id="selectType" class="form-control search-control"></select></div>');

        var cells = options.cells;

        for (var index = 0; index < cells.length; index++) {
            if (nullToFalse(cells[index].search)) {
                var option = $('<option type="' + cells[index].type + '">' + cells[index].text + '</option>');

                //判断selectOptions是否为空
                if (!isEmpty(cells[index].selectOptions)) {
                    var optionName = nullToObject(cells[index].field, cells[index].type + index) + "_options";
                    //将数据字典缓存起来
                    _selectOptions[optionName] = cells[index].selectOptions;
                    option.attr("optionName", optionName);
                }

                //判断key是否为空
                if (!isEmpty(cells[index].key)) {
                    option.attr("key", cells[index].key);
                }

                //判断view是否为空
                if (!isEmpty(cells[index].view)) {
                    option.attr("view", cells[index].view);
                }

                //判断field是否为空
                if (!isEmpty(cells[index].field)) {
                    option.attr("field", cells[index].field);
                }

                //判断text是否为空
                if (!isEmpty(cells[index].text)) {
                    option.attr("text", cells[index].text);
                }

                labelSelectDiv.find('select').append(option);
            }
        }

        //是否组合多条件查询
        if (options.combineSearch) {
            labelSelectDiv.find('select').append($('<option type="combineSearch">组合查询</option>'));
        }

        //下拉框绑定事件
        labelSelectDiv.find('select').off('change').on('change', function () {
            searchSelect_onchage(this);
        });

        var controlDiv = $('<div id="controlDiv" class="form-group">');
        var input = $('<input id="search_input" type="text" class="search-control form-control"/>').hide(); //输入框，初始隐藏
        var select = $('<select id="search_select" class="form-control search-control">').hide(); //下拉框，初始隐藏
        var dateBegin = $('<input id="search_input_begin" placeholder="开始时间" type="text" class="search-control form-control"/>').hide(); //时间控件起，初始隐藏
        var dateEnd = $('<input id="search_input_end" placeholder="结束时间" type="text" class="search-control form-control"/>').hide(); //时间控件止，初始隐藏
        controlDiv.append(input).append(select).append(dateBegin).append(dateEnd);

        var searchBtnDiv = $('<div class="form-group"><div class="btn-group"><a id="search_btn_a" class="btn btn-primary">搜索</a></div></div>');

        searchBtnDiv.off('click').on('click', function () {
            options.searchFunc(1);
        });

        form.append(labelSelectDiv).append(controlDiv).append(searchBtnDiv);
    }

    //判断右侧工具栏是否含有按钮
    if (rightBtnGroupDiv.find('a').length > 0) {
        rightDiv.append(rightBtnGroupDiv);
        toolBarDiv.append(rightDiv);
    }

    leftDiv.append(form);
    $(src).append(toolBarDiv.append(leftDiv));

    //判断工具栏是否含有按钮
    if (form.find('div').length > 0) {
        //初始化调用检索类别改变事件
        searchSelect_onchage($('#selectType'));
    } else {
        //补偿高度
        toolBarDiv.css('min-height', rightDiv.height() + 20).css('padding', '10px 5px');

        if (options.combineSearch) {
            createCombineSearch(form);
        } else {
            $(src).append($('<div style="height: 10px;"></div>'));
        }
    }
}

//创建表头
function createThead(options) {
    var thead = $('<thead></thead>');
    var tr = $('<tr></tr>');
    var ulList = $('<ul class="dropdown-menu"></ul>');

    var cells = options.cells;

    //判断是否添加checkbox
    if (options.checkBox) {
        tr.append('<th checkbox="true"><div><input type="checkbox" class="checkbox"></div></th>');
    }

    //判断是否添加serialNumber
    if (options.serialNumber) {
        tr.append('<th serialNumber="true">序号</th>');
    }

    //循环cells创建表头列
    for (var i = 0; i < cells.length; i++) {

        var th = $('<th class="select-none" field="' + cells[i].field + '">' + cells[i].text + '</th>');

        //判断是否支持排序
        if (nullToFalse(cells[i].sort)) {
            $(th).addClass('th-sort').append('<i class="fa fa-sort th-sort-icon"></i>').off('click').on('click', function () {
                var that = this;

                //移除所有排序图标
                $(that).siblings().find('i').each(function () {
                    $(this).removeClass('fa-sort-asc').removeClass('th-sort-icon-asc').removeClass('fa-sort-desc').removeClass('th-sort-icon-desc').addClass('fa-sort');
                });

                //获取当前表格数据
                var tData = getTBodyData();

                var thi = $(that).find('i');

                if ($(thi).hasClass('fa-sort')) {
                    //倒序排序数据
                    tData.sort(dataCompareDesc($(that).attr('field')));

                    $(thi).removeClass('fa-sort').addClass('fa-sort-desc').addClass('th-sort-icon-desc');
                } else if ($(thi).hasClass('fa-sort-desc')) {
                    //正序排序数据
                    tData.sort(dataCompareAsc($(that).attr('field')));

                    $(thi).removeClass('fa-sort-desc').removeClass('th-sort-icon-desc').addClass('fa-sort-asc').addClass('th-sort-icon-asc');
                } else if ($(thi).hasClass('fa-sort-asc')) {
                    //按照第一次保存的数据顺序正序排序
                    tData.sort(dataCompareAsc('dataSort'));

                    $(thi).removeClass('fa-sort-asc').removeClass('th-sort-icon-asc').addClass('fa-sort').addClass('th-sort-icon');
                }

                bindTbody({dataRows: tData});
            });
        }

        var li = $('<li class="form-inline"><label style="padding: 3px 15px;font-weight: 400;" field="' + cells[i].field + '"><input type="checkbox" class="checkbox" style="width: 15px;height: 15px;margin-right: 5px;" checked /><span>' + cells[i].text + '</span></label></li>');

        //绑定是否显示列checkbox点击事件及文本事件
        $(li).find('input').off('click').on('click', function () {
            var checked = $(this).prop('checked');
            var field = $(this).parent().attr('field');

            $('#dataTable').find('thead tr th').each(function () {
                if (field === $(this).attr('field')) {
                    if (checked) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }

                    $(this).attr('display', checked);
                }
            });

            bindTbody({dataRows: getTBodyData()});
        }).end().find('span').off('click').on('click', function (event) {
            $(this).prev().prop('checked', $(this).prev().prop('checked'));
            event.stopPropagation();
        });

        for (var key in cells[i]) {
            if ("text" === key || "field" === key) {
                continue;
            }

            //如果是字典数组需要转成字符串
            if ("selectOptions" === key) {
                th.attr("optionName", nullToObject(cells[i]["field"], cells[i].type + i) + "_options");
            } else {
                th.attr(key, cells[i][key]);
            }
        }

        //判断是否显示
        if (!nullToTrue(cells[i].display)) {
            th.css('display', 'none');
            li.find('input').prop('checked', false);
        }

        //判断是否添加了列点击事件
        if (nullToFalse(cells[i].click)) {
            th.attr("click", cells[i].click);
        }

        $(ulList).append(li);
        tr.append(th);
    }

    //判断是否添加操作列operation
    if (options.operation) {
        tr.append('<th operation="true">操作</th>');
    }

    //判断列显示控制按钮是否存在，存在则生成控制列表
    var cellVisible = $('#cellVisible');
    if ($(cellVisible).length > 0) {
        $(cellVisible).parent().append(ulList);
    }

    thead.append(tr);
    $('#dataTable').empty().append(thead);
}

//绑定表格数据
function bindTbody(data, src) {
    if (isEmpty(data) || data.length <= 0) {
        return;
    }

    var dataRows = data.dataRows; //获取数据行
    var operation = _tableOptions.operation; //获取操作按钮数据

    if (isEmpty(dataRows)) {
        return;
    }

    var dataTable; //获取dataTable对象

    if (isEmpty(src)) {
        dataTable = $('#dataTable');
    } else {
        dataTable = $(src);
    }

    var ths = dataTable.find('thead tr th'); //获取表头所有th
    var tbody = ''; //tbody对象
    $(dataTable).find('tbody').remove(); //清除表格数据

    for (var i = 0; i < dataRows.length; i++) {
        //保存第一次加载的数据顺序留作排序备用
        if (isEmpty(dataRows[i]['dataSort'])) {
            dataRows[i]['dataSort'] = i + 1;
        }

        var tr = '<tr rowData=' + JSON.stringify(dataRows[i]) + '>';

        //循环表头
        for (var j = 0; j < ths.length; j++) {
            //判断是否添加checkbox
            if (nullToFalse($(ths[j]).attr('checkBox'))) {
                tr += '<td><div><input type="checkbox" class="checkbox"></div></td>';
                continue;
            }

            //是否添加序号
            if (nullToFalse($(ths[j]).attr('serialNumber'))) {
                tr += '<td>' + parseInt(i + 1) + '</td>';
                continue;
            }

            //是否添加操作列operation
            if (nullToFalse($(ths[j]).attr('operation'))) {
                var btnGroupDiv = '<div class="btn-group inline-flex">';

                for (var index in operation) {
                    var operAction = nullToEmpty(operation[index]["action"]);
                    var operText = nullToEmpty(operation[index]["text"]);
                    var operDisplay = nullToTrue(operation[index]["display"]);
                    var operClass = nullToEmpty(operation[index]["class"]);
                    var operIcon = nullToEmpty(operation[index]["icon"]);

                    //如果按钮文本为空
                    if (isEmpty(operText)) {
                        continue;
                    }

                    //是否显示
                    if (typeof operDisplay !== "boolean") {
                        var isDisplay = new Function("return " + operDisplay + "('" + JSON.stringify(dataRows[i]) + "')");
                        if (!isDisplay()) {
                            continue;
                        }
                    } else if (!operDisplay) {
                        continue;
                    }

                    //判断事件是否为空
                    if (isEmpty(operAction)) {
                        operAction = "";
                    } else {
                        operAction += "(this)";
                    }

                    btnGroupDiv += "<a class='btn btn-primary btn-xs " + operClass + "' onclick='" + operAction + "'>" +
                        "<i class='fa " + operIcon + "'></i>&nbsp;" + operText + "</a>";
                }

                btnGroupDiv += '</div>';

                tr += '<td>' + btnGroupDiv + '</td>';
                continue;
            }

            //判断是否显示
            var display = $(ths[j]).css('display') === "none" ? "display:none;" : "";

            //判断是否有列click事件
            var onclick = nullToFalse($(ths[j]).attr('click')) ? 'onclick=' + $(ths[j]).attr('click') + '(this)' : '';

            var value = nullToEmpty(dataRows[i][$(ths[j]).attr('field')]);

            //判断是否字典
            if ("select" === nullToEmpty($(ths[j]).attr('type'))) {
                var selectOptions = _selectOptions[nullToEmpty($(ths[j]).attr('optionName'))];
                var view = nullToObject($(ths[j]).attr('view'), "view");
                var key = nullToObject($(ths[j]).attr('key'), "key");
                var tempValue = getValueOfArray(selectOptions, key, view, value);

                if (!isEmpty(tempValue)) {
                    value = tempValue;
                } else if (!isEmpty(dataRows[i][view])) {  //如果取不到字典值尝试直接从数据行中获取view值
                    value = dataRows[i][view];
                }
            }

            //格式化
            var format = nullToEmpty($(ths[j]).attr('format'));

            if (!isEmpty(format)) {
                var date = new Date(parseInt(value, 10));

                if ("date" === format) {
                    value = date.format("yyyy-MM-dd");
                } else if ("time" === format) {
                    value = date.format("hh:mm:ss");
                } else if ("datetime" === format) {
                    value = date.format("yyyy-MM-dd hh:mm:ss");
                }
            }

            tr += '<td ' + onclick + ' style="' + display + '">' + value + '</td>';
        }

        tr += '</tr>';
        tbody += tr;
    }

    $(dataTable).append('<tbody>').find('tbody').html(tbody);
}

//创建分页
function createPagination(pageSize, pageNo, totalSize, pageList) {
    var dataTable = $('#dataTable');

    //判断数据表格是否存在
    if (dataTable.length <= 0) {
        return;
    }

    if (isEmpty(pageSize) || isEmpty(pageNo) || isEmpty(totalSize)) {
        showAlert("创建分页信息错误，分页信息不完整，请检查数据！", null, null, "danger");
        return;
    }

    var pages = 0;

    //计算分页总数
    if (0 < totalSize) {
        if (totalSize % pageSize === 0) {
            pages = parseInt(totalSize / pageSize, 10);
        } else {
            pages = parseInt(totalSize / pageSize, 10) + 1;
        }
    } else {
        pageNo = pages;
    }

    var paginate_pages;

    //判断分页元素是否已经存在
    if ($('#table_pagination').length <= 0) {
        var table_pagination = $('<div id="table_pagination" class="container-fluid" style="height: 45px;line-height: 45px;font-size:14px;"></div>');
        var dataTable_info = $('<div id="dataTable_info" class="pull-left"><div>每页显示 <select id="paginate_select"></select> 条记录&nbsp;共<span style="color:#3da6f7" id="paginate_totalSize"></span>条&nbsp;&nbsp;当前第<span style="color:#3da6f7" id="paginate_pageNo"></span>页 /共<span style="color:#3da6f7" id="paginate_pages"></span>页</div></div>');
        var dataTable_paginate = $('<div id="dataTable_paginate" class="pull-right" style="padding-top:5px;"><div class="btn-group"><a class="btn btn-default" id="paginate_first">首页</a><a class="btn btn-default" id="paginate_previous">上一页</a></div><span><a class="btn btn-primary" style="margin: 0 3px;" id="paginate_current"></a></span><div class="btn-group"><a class="btn btn-default" id="paginate_next">下一页</a><a class="btn btn-default" id="paginate_last">尾页</a></div></div>');

        $(table_pagination).append(dataTable_info).append(dataTable_paginate).insertAfter($(dataTable));

        if (isEmpty(pageList)) {
            pageList = [10, 20, 50, 100];
        }

        paginate_pages = $('#paginate_pages');

        //绑定切换每页显示条数事件
        $('#paginate_select').empty().off('change').on('change', function () {
            search_onclick(getCurrentPageIndex());
        });

        $.each(pageList, function (key, value) {
            var option = $('<option value="' + value + '">' + value + '</option>');

            if (pageSize === value) {
                $(option).prop('selected', true);
            }

            $('#paginate_select').append(option);
        });

        //绑定首页按钮事件
        $('#paginate_first').off('click').on('click', function () {
            search_onclick(1);
        });

        //绑定上一页按钮事件
        $('#paginate_previous').off('click').on('click', function () {
            search_onclick(getCurrentPageIndex() - 1 > 0 ? getCurrentPageIndex() - 1 : 1);
        });

        //绑定下一页按钮事件
        $('#paginate_next').off('click').on('click', function () {
            search_onclick(getCurrentPageIndex() + 1 < parseInt($(paginate_pages).text(), 10) ? getCurrentPageIndex() + 1 : parseInt($(paginate_pages).text(), 10));
        });

        //绑定尾页按钮事件
        $('#paginate_last').off('click').on('click', function () {
            search_onclick(-1);
        });
    } else {
        paginate_pages = $('#paginate_pages');
    }

    $('#paginate_totalSize').text(totalSize);
    $('#paginate_pageNo').text(pageNo);
    $(paginate_pages).text(pages);
    $('#paginate_current').text(pageNo);
}

//获取当前页码
function getCurrentPageIndex() {
    return parseInt(nullToObject($('#paginate_pageNo').text(), 1), 10);
}

//空转空字符串
function nullToEmpty(obj) {
    if (undefined === obj || null === obj) {
        obj = "";
    }

    return obj;
}

//空转自定义
function nullToObject(obj, str) {
    if (undefined === obj || null === obj || "" === obj) {
        obj = str;
    }

    return obj;
}

//空转false
function nullToFalse(obj) {
    if (undefined === obj || null === obj) {
        obj = false;
    } else if ("false" === obj || false === obj) {
        obj = false;
    } else if ("true" === obj || true === obj) {
        obj = true;
    }

    return obj;
}

//空转true
function nullToTrue(obj) {
    if (undefined === obj || null === obj) {
        obj = true;
    } else if ("false" === obj || false === obj) {
        obj = false;
    } else if ("true" === obj || true === obj) {
        obj = true;
    }

    return obj;
}

/** 把一个浮点数，以小数点后几位四舍五入
 *   @param srcValuef 要舍位的值
 *   @param iCount  要舍位到小数点后几位
 *   @return number
 */
function round(srcValuef, iCount) {
    var srcValue = srcValuef;

    var zs = true;

    //判断是否是负数
    if (srcValue < 0) {
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
    if (idot !== -1) {
        anumber = srcValue.toString().split(".");

        //如果是科学计数法结果
        if (anumber[1].indexOf("e") !== -1) {
            return Math.round(value1) / iB;
        }

        anumber1 = value2.split(".");

        if (anumber[1].length <= iCount) {
            return parseFloat(srcValuef);
        }

        var fvalue3 = parseInt(anumber[1].substring(iCount, iCount + 1), 10);

        if (fvalue3 >= 5) {
            fvalue = parseInt(anumber1[0], 10) + 1;
        } else {
            //对于传入的形如111.834999999998 的处理（传入的计算结果就是错误的，应为111.835）
            if (fvalue3 === 4 && anumber[1].length > 10 && parseInt(anumber[1].substring(iCount + 1, iCount + 2), 10) === 9) {
                fvalue = parseInt(anumber1[0], 10) + 1;
            } else {
                fvalue = parseInt(anumber1[0], 10);
            }
        }
    }

    //如果是负数就用0减四舍五入的绝对值
    if (zs) {
        return fvalue / iB;
    } else {
        return 0 - fvalue / iB;
    }
}

//判断对象是否为空
function isEmpty(src) {
    return undefined === src || null === src || "" === src;
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

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return format;
};

//判断是否为IE浏览器
function isIE() {
    if (isEmpty(window)) {
        return false;
    }

    //判断是否为IE浏览器
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        return true;
    } else {
        return "ActiveXObject" in window;
    }
}

//获取当前event对象
function getEvent() {
    var e;

    if (!isIE()) {
        if (isEmpty(arguments.callee.caller)) {
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

    if (isIE()) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }

    e = null;
}

//获取按键对应的值
function getKeyCode(e) {
    var key = "";

    if (isIE()) {
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
function getValueOfArray(array, key, view, value) {
    if (isEmpty(array)) {
        return null;
    }

    for (var i = 0; i < array.length; i++) {
        if (value === nullToEmpty(array[i][key])) {
            return array[i][view];
        }
    }
}

//检索类别下拉框改变事件
function searchSelect_onchage(src) {
    var optionObj = $(src).find('option:selected');
    var controlType = nullToEmpty(optionObj.attr("type"));
    $('#search_btn_a').parent().parent().nextAll().remove();

    if ("text" === controlType) {
        $('#controlDiv').prevAll().each(function () {
            if ($(this).index() > 0) {
                $(this).hide();
            }
        });
        $('#search_input').show().siblings().hide();
    } else if ("select" === controlType) {
        $('#controlDiv').prevAll().each(function () {
            if ($(this).index() > 0) {
                $(this).hide();
            }
        });

        var optionName = nullToEmpty(optionObj.attr('optionName'));
        //从缓存中获取数据字典
        var selectOptions = nullToEmpty(_selectOptions[optionName]);
        var key = nullToObject(optionObj.attr("key"), "key");
        var view = nullToObject(optionObj.attr("view"), "view");

        $('#search_select').empty().show().siblings().hide();

        $.each(selectOptions, function (i, item) {
            $('#search_select').append($('<option value="' + nullToEmpty(item[key]) + '">' + nullToEmpty(item[view]) + '</option>'));
        });
    } else if ("date" === controlType || "datetime" === controlType || "time" === controlType) {
        $('#controlDiv').prevAll().each(function () {
            if ($(this).index() > 0) {
                $(this).hide();
            }
        }).end().children().each(function () {
            if ("search_input_begin" === $(this).attr('id') || "search_input_end" === $(this).attr('id')) {
                $(this).show();
                laydate.render({
                    elem: '#search_input_begin',
                    type: controlType
                });
                laydate.render({
                    elem: '#search_input_end',
                    type: controlType
                });
            } else {
                $(this).hide();
            }
        })
    } else if ("combineSearch" === controlType) {
        createCombineSearch($(src).parent().parent());
    }
}

function createCombineSearch(src) {
    var controlDiv = $('#controlDiv');
    var searchForm = $(src);

    if (searchForm.length < 1) {
        return;
    }

    if (_tableOptions.search) {
        if (controlDiv.children().length > 1) {
            controlDiv.children().each(function () {
                $(this).hide();
            });
        }

        if (controlDiv.prevAll().length > 1) {
            controlDiv.prevAll().each(function () {
                if ($(this).index() > 0) {
                    $(this).show();
                }
            });

            return;
        }
    }

    var cells = nullToEmpty(_tableOptions.cells);

    $.each(cells, function (index, item) {
        var optionType = nullToEmpty(item.type);
        var controlsDiv = $('<div class="form-group">');
        var field = nullToEmpty(item.field);

        if ("text" === optionType) {
            controlsDiv.append($('<label class="search-label text-right">' + item.text + '：</label>'));
            controlsDiv.append($('<input id="' + field + '" name="' + field + '" type="text" class="search-control form-control"/>'));

            if (_tableOptions.search) {
                controlsDiv.insertBefore(controlDiv);
            } else {
                searchForm.append(controlsDiv);
            }
        } else if ("select" === optionType) {
            var select = $('<select class="form-control search-control" id="' + field + '" name="' + field + '">');

            var selectOptions = nullToEmpty(item.selectOptions);
            var key = nullToObject(item.key, "key");
            var view = nullToObject(item.view, "view");

            $.each(selectOptions, function (i, option) {
                select.append($('<option value="' + nullToEmpty(option[key]) + '">' + nullToEmpty(option[view]) + '</option>'));
            });

            controlsDiv.append($('<label class="search-label text-right">' + item.text + '：</label>'));
            controlsDiv.append(select);

            if (_tableOptions.search) {
                controlsDiv.insertBefore(controlDiv);
            } else {
                searchForm.append(controlsDiv);
            }
        } else if ("date" === optionType || "datetime" === optionType || "time" === optionType) {
            controlsDiv.append($('<label class="search-label text-right">' + item.text + '起：</label>'));
            var dateBegin = $('<input id="' + field + '_begin" name="' + field + '_begin" placeholder="开始时间" type="text" class="search-control form-control"/>');
            controlsDiv.append(dateBegin);

            if (_tableOptions.search) {
                controlsDiv.insertBefore(controlDiv);
            } else {
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

            if (_tableOptions.search) {
                controlsDiv.insertBefore(controlDiv);
            } else {
                searchForm.append(controlsDiv);
            }

            laydate.render({
                elem: '#' + field + '_end',
                type: optionType
            });
        }
    });

    //如果搜素为false，给组合查询添加搜索按钮
    if (!_tableOptions.search) {
        searchForm.append($('<div class="form-group"><div class="btn-group"><a id="search_btn_a" class="btn btn-primary">搜索</a></div></div>'));

        $('#search_btn_a').off('click').on('click', function () {
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
function getTopPage(page) {
    if (isEmpty(page)) {
        page = this;
    }

    var cnt = 0;

    while (!isEmpty(page) && isEmpty(page.document.getElementById("base")) && cnt < 10) {
        page = page.parent;

        if (isEmpty(page)) {
            return null;
        }

        cnt++;
    }

    if (cnt >= 10) {
        page = this;

        return page;
    }

    return page;
}

//隐藏加载遮罩层
function hideLoadingCover() {
    $('#loadingCover').hide();
}

//创建并显示加载遮罩层
function showLoadingCover() {
    var loadingCover = $('#loadingCover');

    if (loadingCover.length <= 0) {
        $(document.body).append($('<div id="loadingCover"><div class="coverDiv"></div><div class="loaderDiv"><span></span><span></span><span></span><span></span></div></div>'));
    }

    loadingCover.show();
}

//默认搜索方法
function search_onclick() {
    showAlert("缺少查询方法，请实现查询方法!", null, null, "warning");
}


//获取页面的宽度
function getPageWidth(page) {
    if (isEmpty(page)) {
        if (parseInt(document.documentElement.clientWidth) !== 0) {
            return document.documentElement.clientWidth;
        }

        return document.body.clientWidth;
    }

    if (parseInt(page.document.documentElement.clientWidth) !== 0) {
        return page.document.documentElement.clientWidth;
    }

    return page.document.body.clientWidth;
}

//获取页面的高度
function getPageHeight(page) {
    if (isEmpty(page)) {
        if (parseInt(document.documentElement.clientHeight) !== 0) {
            return document.documentElement.clientHeight;
        }

        return document.body.clientHeight;
    }

    if (parseInt(page.document.documentElement.clientHeight) !== 0) {
        return page.document.documentElement.clientHeight;
    }

    return page.document.body.clientHeight;
}

//初始化页面事件
function initPage() {
    _dialogParams = getTopPage().params;
    _dialog = getTopPage().params.dialog;

    if (_dialog === null) {
        if ($('#tabs .cur', getTopPage().document).length > 0) {
            var dataKey = $('#tabs .cur', getTopPage().document).attr('data-key');
            $('#loadingCover_' + dataKey, getTopPage().document).show();
        }
    }
}

/**
 * 提示框
 * @param title
 * @param content
 * @param width
 * @param callback
 * @param level
 * @param object
 */
function showAlert(content, title, width, level, callback, object) {
    if (isEmpty(object)) {
        object = window;
    }

    var option = {};
    var type;

    var btnClass = "btn-default";

    option.content = content;

    if (isEmpty(title)) {
        title = "系统信息";
    }

    option.boxWidth = nullToObject(width, "400px");

    if (!isEmpty(level)) {
        if ("danger" === level) {
            option.title = "<span class='fa fa-warning' style='color:#e74c3c;'>&nbsp;</span>" + title;
            type = "red";
            btnClass = "btn-red";
        } else if ("info" === level) {
            option.title = "<span class='fa fa-info-circle' style='color:#3498db;'>&nbsp;</span>" + title;
            type = "blue";
            btnClass = 'btn-blue';
        } else if ("warning" === level) {
            option.title = "<span class='fa fa-exclamation-circle' style='color:#f1c40f;'>&nbsp;</span>" + title;
            type = "orange";
            btnClass = 'btn-orange';
        }
    } else {
        option.title = title;
    }

    //不使用bootstrap样式
    option.useBootstrap = false;
    //显示右上角关闭图标
    option.closeIcon = true;
    //使用懒加载
    option.lazyOpen = true;

    option.buttons = {
        confirm: {
            text: '确认',
            btnClass: btnClass,
            action: function () {
                if (!isEmpty(callback)) {
                    callback();
                }
            }
        }
    };

    var jAlert = object.$.alert(option);

    jAlert.open();

    if (!isEmpty(type)) {
        jAlert.setType(type);
    }
}

/**
 * 确认框
 * @param title
 * @param content
 * @param width
 * @param buttons
 * @param object
 */
function showConfirm(content, title, width, buttons, object) {
    if (isEmpty(object)) {
        object = window;
    }

    var option = {};

    if (isEmpty(title)) {
        title = "系统信息";
    }

    option.title = title;
    option.content = content;

    option.boxWidth = nullToObject(width, "400px");
    option.useBootstrap = false;

    option.closeIcon = true;

    var defaultButtons = {
        cancel: {
            text: '取消',
            keys: ['esc'],
            action: function () {
            }
        }
    };

    if (isEmpty(buttons)) {
        option.buttons = defaultButtons;
    }
    else {
        $.extend(true, buttons, defaultButtons);

        option.buttons = buttons;
    }

    object.$.confirm(option);
}

/**
 * 对话框
 * @param title
 * @param url
 * @param width
 * @param height
 * @param params
 * @param buttons
 * @param object
 */
function showDialog(title, url, width, height, params, buttons, object) {
    if (isEmpty(object)) {
        object = window;
    }

    var option = {};

    option.title = title;

    option.boxWidth = nullToObject(width, "400px");
    option.useBootstrap = false;

    height = nullToObject(height, (getPageHeight(object) - 80 - 112) + "px");

    option.content = '<iframe style="width:100%;height:' + height + 'px;border: none" frameborder="no" marginwidth="0" marginheight="0" src="' + getTopPage().path + '/' + url + '"></iframe>';

    option.closeIcon = true;

    var defaultButtons = {
        cancel: {
            text: '取消',
            keys: ['esc'],
            action: function () {
            }
        }
    };

    if (isEmpty(buttons)) {
        option.buttons = defaultButtons;
    }
    else {
        $.extend(true, buttons, defaultButtons);

        option.buttons = buttons;
    }

    //打开页面前事件
    option.onOpenBefore = function () {
        this.$content.append('<div id="loadingCover_dialog"><div class="coverDiv"></div><div class="loaderDiv"><span></span><span></span><span></span><span></span></div></div>');
    };

    //页面加载后事件
    option.onContentReady = function () {
        this.$content.find('#loadingCover_dialog').remove();
    };

    var page = getTopPage();

    page.params = isEmpty(params) ? {} : params;

    page.params.dialog = object.$.confirm(option);
}

//获取搜索条件
function getSearchParams() {
    var params = {};

    var selectedOption = $('#search_type_div').find('#selectType option:selected');
    var controlType = nullToEmpty(selectedOption.attr("type"));
    var field = nullToEmpty(selectedOption.attr("field"));
    var controlDiv = $('#controlDiv');

    if ("text" === controlType) {
        params[field] = controlDiv.find('#search_input').val();
    } else if ("select" === controlType) {
        params[field] = controlDiv.find('#search_select option:selected').val();
    } else if ("date" === controlType || "datetime" === controlType || "time" === controlType) {
        params[field + "_begin"] = controlDiv.find('#search_input_begin').val();
        params[field + "_end"] = controlDiv.find('#search_input_end').val();
    } else if ("combineSearch" === controlType) {
        $('#selectType').find('option').each(function () {
            field = $(this).attr('field');

            if (!isEmpty(field)) {
                controlType = $(this).attr('type');

                if ("text" === controlType || "select" === controlType) {
                    params[field] = $('#' + field).val();
                } else if ("date" === controlType || "datetime" === controlType || "time" === controlType) {
                    params[field + "_begin"] = $('#' + field + '_begin').val();
                    params[field + "_end"] = $('#' + field + '_end').val();
                }
            }
        })
    }

    params.pageNo = getCurrentPageIndex();
    params.pageSize = parseInt(nullToObject($('#paginate_select').val(), 10), 10);

    return params;
}

//获取表格数据
function getTBodyData() {
    var jsonData = [];

    var tbody = $('#dataTable').find('tbody');

    if (tbody.length <= 0) {
        return jsonData;
    }

    $(tbody).find('tr').each(function () {
        var rowData = $(this).attr('rowData');

        if (!isEmpty(rowData)) {
            jsonData.push(JSON.parse(rowData));
        }
    });

    return jsonData;
}

//数据比较ASC
function dataCompareAsc(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];

        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }

        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}

//数据比较DESC
function dataCompareDesc(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];

        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }

        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
}

//获取tr行数据,src必须是tr子元素
function getTrData(src, name) {
    return nullToEmpty($(src).parents('tr').attr(isEmpty(name) ? "rowData" : name));
}