package com.base.web.handler;

import com.base.web.common.Constants;
import com.base.web.common.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 请求异常处理
 * @author wj
 * @date 2018-4-18 16:21:27
 */
@RestController
public class NotFoundExceptionHandler implements ErrorController{
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Override
    public String getErrorPath() {
        return "/error";
    }

    @RequestMapping(value = "/error")
    public Object error(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus hs = HttpStatus.valueOf(response.getStatus());

        if(null == hs){
            hs = HttpStatus.NOT_FOUND;
        }

        //打印日志
        Util.printExceptionLog(request,LOGGER,hs.getReasonPhrase());

        return new ModelAndView(Constants.VIEW_LAYOUT_404);
    }
}
