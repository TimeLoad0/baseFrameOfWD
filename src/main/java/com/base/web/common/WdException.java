package com.base.web.common;

/**
 * 自定义异常
 *
 * @author wj
 * @date 2018-4-20 10:46:07
 */
public class WdException extends RuntimeException {
    private int code;
    private String msg;

    public WdException() {

    }

    public WdException(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public WdException(int code, String msg, Throwable throwable) {
        super(String.format("[%d]%s", code, msg), throwable);
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
