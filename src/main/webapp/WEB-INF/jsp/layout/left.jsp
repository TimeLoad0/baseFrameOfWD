<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=request.getRequestURI()%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>

	<script type="application/javascript">
		var i = 0;
		function addTab(){
            parent.right.addTab("a"+i,"测试"+i++,"/test",false,false,true);
		}
	</script>
</head>
<body>
	<input type="button" value="测试菜单功能" onclick="addTab()">
</body>
</html>