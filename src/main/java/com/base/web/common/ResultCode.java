package com.base.web.common;

/**
 * 返回码
 *
 * @author wj
 * @date 2018-4-19 15:01:44
 */
public enum ResultCode {

    /**
     * 成功
     */
    SUCCESS(0, "成功"),
    /**
     * 失败
     */
    FAILED(1, "失败"),
    /**
     * 未知错误
     */
    UNKONWN_ERROR(2, "未知错误，请联系管理人员");

    ResultCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    private String msg;
    private int code;

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
