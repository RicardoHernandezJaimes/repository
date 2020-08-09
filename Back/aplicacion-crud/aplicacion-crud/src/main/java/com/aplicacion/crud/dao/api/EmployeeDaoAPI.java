package com.aplicacion.crud.dao.api;

import org.springframework.data.repository.CrudRepository;

import com.aplicacion.crud.model.Employee;

public interface EmployeeDaoAPI extends CrudRepository<Employee, Long> {

}
