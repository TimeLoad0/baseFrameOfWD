<%--
  Created by IntelliJ IDEA.
  User: Dth
  Date: 2017/12/11 0011
  Time: 上午 9:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String ctx = request.getContextPath();
%>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <base href="<%=request.getRequestURI()%>">
    <title>测试dth</title>
    <link rel="stylesheet" href="../../css/bootstrap/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../../css/confirm/jquery-confirm.min.css" type="text/css" />
    <link rel="stylesheet" href="../../css/common.css" type="text/css" />

    <script type="text/javascript" src="../../js/jquery/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../js/laydate/laydate.js"></script>
    <script type="text/javascript" src="../../js/confirm/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="../../js/util/common.js"></script>
    <script type="text/javascript">
        var d = null;
        $(function(){
             d = getTopPage().params.dialog;
            showLoadingCover();

            $('#sljb').click(function(){
                Alert('测试','测试123321',"30%",function(){alert(123)});
            });

            $('#slqr').click(function(){
                Confirm('测试','测试确认','30%',{cs:function(){
                    alert(123);
                },ok:{text:'确认',action:function(){alert('12321')}}},window.parent);
            });

            $('#sljz').click(function(){
                Dialog('测试','test',1000,500,{},{cs:function(){
                    alert(123);
                },ok:{text:'确认',action:function(){alert('12321')}}},window.parent);
            });

            $('#slts').click(function(){
                $.confirm({
                    title: 'Prompt!',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Enter something here</label>' +
                    '<input type="text" placeholder="Your name" class="name form-control" required />' +
                    '</div>' +
                    '</form>',
                    buttons: {
                        formSubmit: {
                            text: 'Submit',
                            btnClass: 'btn-blue',
                            action: function () {
                                var name = this.$content.find('.name').val();
                                if(!name){
                                    $.alert('provide a valid name');
                                    return false;
                                }
                                $.alert('Your name is ' + name);
                            }
                        },
                        cancel: function () {
                            //close
                        },
                    },
                    onContentReady: function () {
                        // bind to events
                        var jc = this;
                        this.$content.find('form').on('submit', function (e) {
                            // if the user submits the form by pressing enter in the field.
                            e.preventDefault();
                            jc.$$formSubmit.trigger('click'); // reference the button and click it
                        });
                    }
                });
            });

            $('#sldhk').click(function(){
                $.dialog({
                    title: 'Text content!',
                    content: 'Simple modal!',
                });
            });

            hideLoadingCover();
        });

        function Alert(title,content,width,callback){
            var object = window;

            var maxHeight = getPageHeight(object) - 80 - 112;
            var maxWidth = getPageWidth(object) - 50;

            var option = {};

            option.title = title;

            if(isEmpty(width)){
                width = maxWidth;
            }
            else{
                if( width > maxWidth){
                    width = maxWidth;
                }
            }
            option.boxWidth = width;
            option.useBootstrap=false;

            option.closeIcon = true;

            option.buttons = {
                confirm:{
                    text: '确认',
                    action: function(){
                        if(!isEmpty(callback)){
                            callback();
                        }

                    }
                }
            };

            object.$.alert(option);
        }

        function Confirm(title,content,width,buttons,object){
            if(isEmpty(object)){
                object = window;
            }

            var maxHeight = getPageHeight(object) - 80 - 112;
            var maxWidth = getPageWidth(object) - 50;

            var option = {};

            option.title = title;

            if(isEmpty(width)){
                width = maxWidth;
            }
            else{
                if( width > maxWidth){
                    width = maxWidth;
                }
            }
            option.boxWidth = width;
            option.useBootstrap=false;

            option.closeIcon = true;

            var defaultButtons = {
                cancel:{
                    text: '取消',
                    keys: ['esc'],
                    action: function(){}
                }};

            if(isEmpty(buttons)){
                option.buttons = defaultButtons;
            }
            else{
                $.extend(true,buttons,defaultButtons);

                option.buttons = buttons;
            }

            object.$.confirm(option);
        }

        function Dialog(title,url,width,height,params,buttons,object){
            if(isEmpty(object)){
                object = window;
            }

            var maxHeight = getPageHeight(object) - 80 - 112;
            var maxWidth = getPageWidth(object) - 50;

            var option = {};

            option.title = title;

            if(isEmpty(width)){
                width = maxWidth;
            }
            else{
                if( width > maxWidth){
                    width = maxWidth;
                }
            }
            option.boxWidth = width;
            option.useBootstrap=false;

            if(isEmpty(height)){
                height = maxHeight;
            }
            else{
                if( height > maxHeight){
                    height = maxHeight;
                }
            }

            option.content = '<iframe style="width:100%;height:'+height+'px;" frameborder="no" border="0" marginwidth="0" marginheight="0" src="<%=ctx%>/'+url+'"></iframe>';

            option.closeIcon = true;

            var defaultButtons = {
                cancel:{
                    text: '取消',
                    keys: ['esc'],
                    action: function(){}
                }};

            if(isEmpty(buttons)){
                option.buttons = defaultButtons;
            }
            else{
                $.extend(true,buttons,defaultButtons);

                option.buttons = buttons;
            }

            var page = getTopPage();

            page.params = isEmpty(params) ? {} : params;

            var dialog = object.$.confirm(option);

            page.params.dialog = dialog;
        }
    </script>
</head>
<body>
    <div class="container-fluid">
        <div class="btn-group">
            <a id="sljb" class="btn btn-primary">示例警报</a>
            <a id="slqr" class="btn btn-primary">示例确认</a>
            <a id="sljz" class="btn btn-primary">示例加载</a>
            <a id="slts" class="btn btn-primary" style="display: none;">示例提示</a>
            <a id="sldhk" class="btn btn-primary" style="display: none;">示例对话框</a>
        </div>
    </div>
    <input type="button" value="关闭" onclick="d.close()">
    <input type="button" value="提示" onclick="Dialog('测试123321','test',0,0,{},{},parent);">
</body>
</html>
