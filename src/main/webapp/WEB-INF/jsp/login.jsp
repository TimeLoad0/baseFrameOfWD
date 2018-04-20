<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="request"/>
<!DOCTYPE html>
<html lang="zh-CN">
<body>
错误信息：<h4 th:text="${message}"></h4>
<form action="<c:out value='${ctx}'/>/doLogin" method="post">
    <p>账号：<input type="text" name="username" value="admin"/></p>
    <p>密码：<input type="text" name="password" value="123456"/></p>
    <P><input type="checkbox" name="rememberMe"/>记住我</P>
    <p><input type="submit" value="登录"/></p>
</form>
</body>
<script>
    //如果登录页面不在最顶层，跳转到最顶层显示
    if(window.top !== window.self){
        window.top.location = window.self.location;
    }
</script>
</html>
