package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Department;

import java.util.List;

public interface DepartmentService {

    List<Department> getAllDepartments();

    Department saveDepartment(Department department);

    Department getDepartmentById(Long id);

    Department updateDepartment(Long id, Department department);

    void deleteDepartment(Long id);
}