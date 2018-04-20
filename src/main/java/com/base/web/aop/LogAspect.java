package com.base.web.aop;

import com.base.web.common.Constants;
import org.apache.shiro.SecurityUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

/**
 * 日志切面
 *
 * @author August
 * @date 2018-4-10 17:22:27
 */
@Component
@Aspect
public class LogAspect {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private HttpServletRequest request;

    @Autowired
    public LogAspect(HttpServletRequest request) {
        this.request = request;
    }

    /**
     * 定义一个切入点.
     * ~ 第一个 * 代表任意修饰符及任意返回值.
     * ~ 第二个 * 任意包名
     * ~ 第三个 * 代表任意方法.
     * ~ 第四个 * 定义在web包或者子包
     * ~ 第五个 * 任意方法
     * ~ .. 匹配任意数量的参数.
     */
    @Pointcut("execution(public * com.base.web.controller..*.*(..))")
    public void webLog() {
    }

    /**
     * 前置通知
     *
     * @param joinPoint 切入点
     */
    @Before("webLog()")
    public void deBefore(JoinPoint joinPoint) throws Throwable {
        request.setAttribute(Constants.RESULT_LOGINUSERID, SecurityUtils.getSubject().getSession().getAttribute(Constants.RESULT_USERID));

        // 记录下请求内容
        StringBuilder sb = new StringBuilder();

        Enumeration<?> enumeration = request.getParameterNames();

        while (enumeration.hasMoreElements()) {
            String name = enumeration.nextElement().toString();
            String value = request.getParameter(name);

            sb.append(StringUtils.isEmpty(sb.toString()) ? "" : ",").append(name).append("=").append(value);
        }

        LOGGER.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> REQUEST INFO");
        LOGGER.info("REQUEST_URL : " + request.getRequestURL().toString());
        LOGGER.info("HTTP_METHOD_TYPE : " + request.getMethod());
        LOGGER.info("IP : " + request.getRemoteAddr());
        LOGGER.info("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        LOGGER.info("ARGS : " + sb.toString());
    }

    /**
     * 环绕通知,环绕增强，相当于MethodInterceptor
     *
     * @param pjp 切入点
     * @return Object
     */
    @Around("webLog()")
    public Object arround(ProceedingJoinPoint pjp) throws Throwable {
        Object o = pjp.proceed();
        LOGGER.info("METHOD_RESPONSE : " + o);
        return o;
    }
}
