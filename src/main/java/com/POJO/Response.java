package com.POJO;

import java.util.Date;

public class Response {

	private String Message;
	
	private String date;
	
	private String Code;

	public String getMessage() {
		return Message;
	}

	public void setMessage(String message) {
		Message = message;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCode() {
		return Code;
	}

	public void setCode(String code) {
		Code = code;
	}

	public Response(String message, String date, String code) {
		
		Message = message;
		this.date = date;
		Code = code;
	}

	public Response() {
		
	}

	
	
	
}
