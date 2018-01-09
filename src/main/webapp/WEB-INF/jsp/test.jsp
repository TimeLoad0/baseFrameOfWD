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
    <link rel="stylesheet" href="../../css/common.css" type="text/css" />

    <script type="text/javascript" src="../../js/jquery/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../js/laydate/laydate.js"></script>
    <script type="text/javascript" src="../../js/util/common.js"></script>
    <script type="text/javascript">
        $(function(){
            showLoadingCover();
            setTimeout(function(){
//                hideLoadingCover();
            },5000)
        });

    </script>
</head>
<body>
<input type="text">
</body>
</html>
