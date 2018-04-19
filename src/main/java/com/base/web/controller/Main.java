package com.base.web.controller;

import com.base.web.common.JsonResponse;
import com.base.web.common.ResultCode;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 主控制器
 *
 * @author wd
 */
@Controller
public class Main {
    private Logger logger =  LoggerFactory.getLogger(this.getClass());

    @Value("${application.message:Hello World}")
    private String message = "Hello World";

    @RequestMapping("/")
    public String welcome() {
        return "welcome.page";
    }

    @RequestMapping("/layout")
    public String layout() {
        return "layout.layout";
    }

    @RequestMapping("/404")
    public String notFound() {
        return "layout.404";
    }

    @RequestMapping("/layout_top")
    public String layoutTop() {
        return "layout.top";
    }

    @RequestMapping("/layout_left")
    public String layoutLeft() {
        return "layout.left";
    }

    @RequestMapping("/layout_right")
    public String layoutRight() {
        return "layout.right";
    }

    @RequestMapping("/index")
    public String index(HttpServletRequest request) {
        System.out.println("loginUserId:"+request.getAttribute("loginUserId"));
        return "index";
    }

    @RequestMapping("/index1")
    public String index1() {
        return "index1";
    }

    @PostMapping("/test")
    @ResponseBody
    public String test() {
        return new JsonResponse(ResultCode.SUCCESS).toString();
    }

    @RequestMapping("/foo")
    public String foo() {
        throw new NullPointerException();
    }

    @RequestMapping("/foo2")
    public String foo2() {
        throw new RuntimeException();
    }

    @RequestMapping("/errorTest")
    @ResponseBody
    public String errorTest() {
        throw new RuntimeException();
    }

    @PostMapping("/doLogin")
    public String dologin(String username, String password, Boolean rememberMe) {
        UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe != null);
        SecurityUtils.getSubject().login(token);
        return "index";
    }

    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }
}
