package com.GlobalExceptionHandling;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.POJO.Response;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler
	public ResponseEntity<Response> handleGlobalException(Exception exc)
	{
		Response response=new Response();
		response.setCode(HttpStatus.BAD_REQUEST.toString());
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
		LocalDateTime now = LocalDateTime.now(); 
		response.setDate(dtf.format(now));
		response.setMessage(exc.getMessage());
		
		return new ResponseEntity<Response>(response,HttpStatus.BAD_REQUEST);
	}
}
