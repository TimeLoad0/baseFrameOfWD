<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String ctx = request.getContextPath();
%>
<html>
<head>
	<base href="<%=request.getRequestURI()%>">
	<title>baseFrame系统</title>
	<style type="text/css">
		html,body{height:100%;margin:0;padding:0}
	</style>

	<script type="text/javascript" src="../../js/util/common.js"></script>

	<script>
        path = '<%=ctx %>';
	</script>
</head>

<body>
<iframe id="home" name="home" src="<%=ctx%>/layout" width="100%" height="100%" style="margin: 0" scrolling="NO" frameborder="0"></iframe>
</body>

</html>