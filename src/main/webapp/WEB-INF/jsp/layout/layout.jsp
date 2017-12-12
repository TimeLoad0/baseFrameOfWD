<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String ctx = request.getContextPath();
%>
<html>
<head>
    <base href="<%=request.getRequestURI()%>">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <frameset rows="50,*" cols="*" border="1" bordercolor="black" framespacing="0">
        <frame src="<%=ctx%>/layout_top" name="top" scrolling="no" frameborder="0" noresize="noresize" id="top" title="top"/>

        <frameset id="content" rows="*" cols="190,*" framespacing="0" border="1px">
            <frame src="<%=ctx%>/layout_left" name="left" scrolling="no" noresize="noresize" id="left" title="left"/>
            <frame src="<%=ctx%>/layout_right" name="right" id="right" title="right"/>
        </frameset>
    </frameset>
</head>
<body>
</body>
</html>