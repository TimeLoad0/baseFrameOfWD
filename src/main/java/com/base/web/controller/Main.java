package com.base.web.controller;

import com.base.web.common.Constants;
import com.base.web.common.JsonResponse;
import com.base.web.common.ResultCode;
import com.base.web.common.WdException;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 主控制器
 *
 * @author wd
 */
@Controller
public class Main {
    private Logger LOGGER =  LoggerFactory.getLogger(this.getClass());

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
    public String index() {
        return "index";
    }

    @RequestMapping("/index1")
    public String index1() {
        return "index1";
    }

    @RequestMapping("/test")
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
    @ResponseBody
    public Object dologin(String username, String password, Boolean rememberMe) {
        UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe != null);
        SecurityUtils.getSubject().login(token);

        return new JsonResponse(ResultCode.SUCCESS).toString();
    }

    @RequestMapping(value = "/login")
    public ModelAndView login() {
        return new ModelAndView(Constants.VIEW_LOGIN);
    }

    @RequestMapping("/testAjax")
    @ResponseBody
    public String testAjax() {
        throw new WdException(ResultCode.FAILED.getCode(),"test ajax error");
    }

    @GetMapping("/testView")
    public String testView() {
        throw new WdException(ResultCode.FAILED.getCode(),"test view get error");
    }

    @PostMapping("/testPost")
    public String testPost() {
        throw new WdException(ResultCode.FAILED.getCode(),"test view post error");
    }
}
