package com.aplicacion.crud.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.aplicacion.crud.commons.GenericServiceImpl;
import com.aplicacion.crud.dao.api.EmployeeDaoAPI;
import com.aplicacion.crud.model.Employee;
import com.aplicacion.crud.service.api.EmployeeServiceAPI;

@Service
public class EmployeeServiceImpl extends GenericServiceImpl<Employee, Long> implements EmployeeServiceAPI {

	@Autowired
	private EmployeeDaoAPI empleadoDaoAPI;
	
	@Override
	public CrudRepository<Employee, Long> getDao() {
		return empleadoDaoAPI;
	}

}
