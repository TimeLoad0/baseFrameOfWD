<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <base href="<%=request.getRequestURI()%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <style type="text/css">
        html,body{height:100%;margin:0;padding:0}
        a:hover{cursor: pointer}
    </style>

</head>

<body>
    <div style="width:190px;height:50px;line-height: 50px;float: left;border-right:1px solid black;text-indent:50px;">项目图标</div>
    <div style="height:50px;line-height: 50px;float: right;">
        <div style="height:50px;line-height: 50px;float: left;margin-right:5px">
            <a onclick="alert('功能1')">功能1</a>
            <span style="padding:0 5px">|</span>
            <a onclick="alert('功能2')">功能2</a>
            <span style="padding:0 5px">|</span>
            <a onclick="alert('功能3')">功能3</a>
            <span style="padding:0 5px">|</span>
        </div>
        <div style="width:50px;height:50px;line-height: 50px;float: right;background-color:lightblue;border-radius:50%;margin-right:5px">
            &nbsp;头像
        </div>
    </div>
</body>
</html>