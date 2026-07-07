package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Employee;
import com.maneesh.employeemanagementsystem.repo.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {

        Employee existingEmployee =
                employeeRepository.findById(id).orElse(null);

        if (existingEmployee != null) {

            existingEmployee.setFirstName(
                    employee.getFirstName());

            existingEmployee.setLastName(
                    employee.getLastName());

            existingEmployee.setEmail(
                    employee.getEmail());

            existingEmployee.setPhone(
                    employee.getPhone());

            existingEmployee.setSalary(
                    employee.getSalary());

            existingEmployee.setStatus(
                    employee.getStatus());

            existingEmployee.setJoiningDate(
                    employee.getJoiningDate());

            existingEmployee.setDepartment(
                    employee.getDepartment());

            existingEmployee.setManager(
                    employee.getManager());

            existingEmployee.setRole(
                    employee.getRole());

            existingEmployee.setProject(
                    employee.getProject());

            return employeeRepository.save(existingEmployee);
        }

        return null;
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}