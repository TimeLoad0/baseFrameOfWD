<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
错误信息：<h4 th:text="${message}"></h4>
<form action="/baseweb/doLogin" method="post">
    <p>账号：<input type="text" name="username" value="admin"/></p>
    <p>密码：<input type="text" name="password" value="123456"/></p>
    <P><input type="checkbox" name="rememberMe"/>记住我</P>
    <p><input type="submit" value="登录"/></p>
</form>
</body>
</html>
