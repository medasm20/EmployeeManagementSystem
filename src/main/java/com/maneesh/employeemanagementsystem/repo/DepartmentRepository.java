package com.maneesh.employeemanagementsystem.repo;

import com.maneesh.employeemanagementsystem.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}