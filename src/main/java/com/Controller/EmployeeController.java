package com.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DAO.EmployeeRepository;
import com.POJO.Employee;
import com.POJO.Response;

@CrossOrigin(origins="http://localhost:3000")
//But remember: don’t enable CORS for all origins if you’re using any 
//cookie-based authentication in your website. 
//Also, if you have both a website version and a API-based version of a service, 
//a good idea is to host them in different subdomains or domains.
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	
	@Autowired
	public EmployeeRepository empRepo;
	
	@GetMapping("/employees")
	public List<Employee> getEmployees()
	{
		return empRepo.findAll();
	}
	
	@PostMapping("/employees")
	public ResponseEntity<Response> saveEmployee(@RequestBody Employee employee)
	{
		employee.setId(0);
		System.out.println(employee.getEmailId()+" "+employee.getFirstName());
		Employee emp=empRepo.save(employee);
		Response res=new Response();
		res.setCode(HttpStatus.OK+"");
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
		   LocalDateTime now = LocalDateTime.now();  
		
		res.setDate(dtf.format(now));
		res.setMessage("Successfully Added the Record with FirstName "+emp.getFirstName());
		return new ResponseEntity<Response>(res,HttpStatus.OK);
	}

	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable("id") int theId)
	{
		Optional<Employee> result=empRepo.findById(theId);
		Employee theEmployee=null;
		if(result.isPresent())
		{
			theEmployee=result.get();
		}
		else
		{
			throw new RuntimeException("Didn't find any employee by that Id-"+theId);
		}
		
		return new ResponseEntity<Employee>(theEmployee,HttpStatus.OK);
	}
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Response> updateEmployee(@PathVariable int id,@RequestBody Employee employee)
	{
		Optional<Employee> result=empRepo.findById(id);
		Employee theEmployee=null;
		if(result.isPresent())
		{
			theEmployee=result.get();
		}
		else
		{
			throw new RuntimeException("Didn't find any employee by that Id-"+id);
		}
		
		theEmployee.setEmailId(employee.getEmailId());
		theEmployee.setFirstName(employee.getFirstName());
		theEmployee.setLastName(employee.getLastName());
		Employee emp=empRepo.save(theEmployee);
		System.out.println(emp);
		Response res=new Response();
		res.setCode(HttpStatus.ACCEPTED+"");
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
		   LocalDateTime now = LocalDateTime.now();  
		   
		res.setDate(dtf.format(now));
		res.setMessage("Successfully Updated the Record "+id);
		return new ResponseEntity<Response>(res,HttpStatus.ACCEPTED);
		//return new ResponseEntity(HttpStatus.OK);
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Response> deleteEmployee(@PathVariable int id)
	{
		empRepo.deleteById(id);
		Response res=new Response();
		res.setCode(HttpStatus.OK+"");
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
		   LocalDateTime now = LocalDateTime.now();  
		   
		res.setDate(dtf.format(now));
		res.setMessage("Successfully Deleted the Record "+id);
		return new ResponseEntity<Response>(res,HttpStatus.OK);
	}
	
}
