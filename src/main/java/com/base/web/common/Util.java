package com.base.web.common;

import org.slf4j.Logger;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

/**
 * 工具合集
 *
 * @author wj
 * @date 2018-4-19 15:17:51
 */
public class Util {
    /**
     * 获取异常消息
     *
     * @param e 异常
     * @return 消息
     */
    public static String getExceptionMessage(Exception e) {
        String message = e.getMessage();

        Throwable t = e.getCause();

        while (t != null) {
            message = t.getMessage();
            t = t.getCause();
        }

        return message;
    }

    /**
     * 打印异常请求日志
     *
     * @param request 请求
     * @param logger  日志对象
     * @param msg     消息
     */
    public static void printExceptionLog(HttpServletRequest request, Logger logger, String msg) {
        Enumeration enumeration = request.getParameterNames();

        StringBuilder sb = new StringBuilder("Request Error:");
        StringBuilder params = new StringBuilder();

        sb.append(nullToEmpty(msg)).append(" => ").append("URL:").append(request.getAttribute("url")).append(" PARAMS:");

        while (enumeration.hasMoreElements()) {
            String name = enumeration.nextElement().toString();
            String value = request.getParameter(name);

            params.append(StringUtils.isEmpty(params.toString()) ? "" : ",").append(name).append("=").append(value);
        }

        sb.append(StringUtils.isEmpty(params.toString()) ? "null" : params);
        logger.error(sb.toString());
    }

    /**
     * null转空字符串
     *
     * @param s Object
     * @return 字符串
     */
    public static String nullToEmpty(Object s) {
        if (null == s) {
            s = "";
        }

        return s.toString();
    }

    /**
     * null转空object
     *
     * @param s Object
     * @param o Object
     * @return 字符串
     */
    public static String nullToObject(Object s, Object o) {
        if (null == s) {
            s = o;
        }

        return s.toString();
    }
}
