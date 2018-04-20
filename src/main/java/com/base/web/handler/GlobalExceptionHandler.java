package com.base.web.handler;

import com.base.web.common.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常处理
 *
 * @author wj
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    private static final String X_REQUESTED_WITH = "x-requested-with";
    private static final String XMLHTTPRESQUEST = "XMLHttpRequest";

    @ExceptionHandler(value = WdException.class)
    @ResponseBody
    public Object wdExceptionHandler(HttpServletRequest request, WdException wde) throws Exception {
        //打印日志
        Util.printExceptionLog(request, LOGGER, wde.getMsg(), request.getRequestURL().toString());

        //如果是ajax请求响应头会有x-requested-with
        if (null == request.getHeader(X_REQUESTED_WITH) || !request.getHeader(X_REQUESTED_WITH).equalsIgnoreCase(XMLHTTPRESQUEST)) {
            request.setAttribute(Constants.RESULT_URL, request.getRequestURL());

            ModelAndView mav = new ModelAndView();
            mav.setViewName(Constants.VIEW_LAYOUT_ERROR);
            mav.getModel().put(Constants.RESULT_MESSAGE, wde.getMsg());
            mav.getModel().put(Constants.RESULT_CODE, wde.getCode());

            return mav;
        }

        return new JsonResponse(wde.getCode(), wde.getMsg()).toString();
    }

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public String jsonExceptionHandler(HttpServletRequest request, Exception e) throws Exception {
        //如果是ajax请求响应头会有x-requested-with
        if (null == request.getHeader(X_REQUESTED_WITH) || !request.getHeader(X_REQUESTED_WITH).equalsIgnoreCase(XMLHTTPRESQUEST)) {
            request.setAttribute(Constants.RESULT_URL, request.getRequestURL());

            //抛出异常由HandlerExceptionResolver和ErrorController处理
            //mapping类异常由ErrorController处理
            //方法内异常由HandlerExceptionResolver处理
            throw e;
        }

        String errMsg = Util.nullToObject(Util.getExceptionMessage(e), ResultCode.UNKONWN_ERROR.getMsg());

        //打印日志
        Util.printExceptionLog(request, LOGGER, errMsg, request.getRequestURL().toString());
        LOGGER.error(e.getMessage(), e);

        return new JsonResponse(ResultCode.FAILED.getCode(), errMsg).toString();
    }
}
