package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Department;
import com.maneesh.employeemanagementsystem.repo.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElse(null);
    }

    @Override
    public Department updateDepartment(Long id, Department department) {

        Department existingDepartment =
                departmentRepository.findById(id).orElse(null);

        if (existingDepartment != null) {

            existingDepartment.setDepartmentName(
                    department.getDepartmentName());

            existingDepartment.setDescription(
                    department.getDescription());

            return departmentRepository.save(existingDepartment);
        }

        return null;
    }

    @Override
    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
}