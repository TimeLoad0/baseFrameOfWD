package com.base.web.handler;

import com.base.web.common.Constants;
import com.base.web.common.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 视图异常处理
 *
 * @author wj
 * @date 2018-4-18 16:32:35
 */
@Component
public class ViewExceptionHandler implements HandlerExceptionResolver {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    /**
     * DispatcherServlet中如果产生了异常
     * 则接下来会在processDispatchResult()方法中查询当前容器中是否有HandlerExceptionResolver接口的实现类
     * 如果有则调用它的resolveException()方法，得到返回的View
     * 如果没有则使用框架默认的异常处理类
     *
     * @param request  HttpServletRequest
     * @param response HttpServletResponse
     * @param handler  Object
     * @param ex       Exception
     * @return ModelAndView
     */
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        //打印日志
        Util.printExceptionLog(request, LOGGER, HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),request.getAttribute(Constants.RESULT_URL).toString());

        ModelAndView mav = new ModelAndView();
        mav.setViewName(Constants.VIEW_LAYOUT_ERROR);
        mav.getModel().put(Constants.RESULT_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        mav.getModel().put(Constants.RESULT_CODE, HttpStatus.INTERNAL_SERVER_ERROR.value());

        return mav;
    }
}
