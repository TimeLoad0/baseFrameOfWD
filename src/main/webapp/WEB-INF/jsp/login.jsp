<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="request"/>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <script type="text/javascript" src="js/jquery/jquery-3.1.1.min.js"></script>
</head>
<body>
<div class="htmleaf-container">
    <div class="wrapper">
        <div class="container">
            <h1 id="msg">登录</h1>
            <form id="loginForm" action="##" onsubmit="return false" method="post">
                <input type="text" name="username" placeholder="Username" autocomplete="false"/>
                <input type="password" name="password" placeholder="Password" autocomplete="false"/>
                <%--<P><input type="checkbox" name="rememberMe"/>记住我</P>--%>
                <input id="login-button" type="submit" value="登录" onclick="login()"/></p>
            </form>
        </div>
        <ul class="bg-bubbles">
            <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        </ul>
    </div>
</div>
</body>
<script>
    //如果登录页面不在最顶层，跳转到最顶层显示
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    function login() {
        $.ajax({
            type: "POST",
            url: "<c:out value='${ctx}'/>/doLogin",
            dataType:"json",
            data: $('#loginForm').serialize(),
            success: function (response) {
                if (response.code === 0) {
                    window.location = "<c:out value='${ctx}'/>/index";
                } else {
                    $('#msg').html(response.message).css("color","red");

                    window.setTimeout(function(){
                        $('#msg').html("登录").css("color","white");
                        $('input[name="username"]').focus();
                    },3000)
                }
            }
        });
    }
</script>
</html>
