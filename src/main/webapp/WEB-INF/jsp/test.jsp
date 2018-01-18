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

        initPage();

        $(function(){

            $('#sljb').click(function(){
                showAlert('测试','测试123321',"30%",function(){alert(123)});
            });

            $('#slqr').click(function(){
                showConfirm('测试','测试确认','30%',{cs:function(){
                    alert(123);
                },ok:{text:'确认',action:function(){alert('12321')}}},window.parent);
            });

            $('#sljz').click(function(){
                showDialog('测试','test',1000,500,{},{cs:function(){
                    alert(123);
                },ok:{text:'确认',action:function(){alert('12321')}}},window.parent);
            });
        });


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
    <input type="button" value="关闭" onclick="_dialog.close()">
    <input type="button" value="提示" onclick="showDialog('测试123321','test',0,0,{},{},parent);">
</body>
</html>
