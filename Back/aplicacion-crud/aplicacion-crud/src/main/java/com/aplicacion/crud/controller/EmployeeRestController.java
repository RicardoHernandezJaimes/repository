package com.aplicacion.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.crud.model.Employee;
import com.aplicacion.crud.service.api.EmployeeServiceAPI;

@RestController
@RequestMapping(value = "/employee/")
@CrossOrigin("*")
public class EmployeeRestController {

	@Autowired
	private EmployeeServiceAPI empleadoServiceAPI;

	@GetMapping(value = "/all")
	public List<Employee> getAll() {
		return empleadoServiceAPI.getAll();
	}
	
	@GetMapping(value = "/find/{id}")
	public Employee find(@PathVariable Long id) {
		return empleadoServiceAPI.get(id);
	}

	@PostMapping(value = "/save")
	public ResponseEntity<Employee> save(@RequestBody Employee empleado) {
		Employee obj = empleadoServiceAPI.save(empleado);
		return new ResponseEntity<Employee>(obj, HttpStatus.OK);
	}

	@GetMapping(value = "/delete/{id}")
	public ResponseEntity<Employee> delete(@PathVariable Long id) {
		Employee persona = empleadoServiceAPI.get(id);
		if (persona != null) {
			empleadoServiceAPI.delete(id);
		}else {
			return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<Employee>(persona, HttpStatus.OK);
	}

}
