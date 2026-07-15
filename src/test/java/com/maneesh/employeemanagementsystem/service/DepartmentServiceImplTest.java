package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Department;
import com.maneesh.employeemanagementsystem.repo.DepartmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DepartmentServiceImplTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private DepartmentServiceImpl departmentService;

    @Test
    void shouldReturnAllDepartments() {

        Department department = new Department();
        department.setId(1L);
        department.setDepartmentName("IT");

        when(departmentRepository.findAll())
                .thenReturn(List.of(department));

        List<Department> result =
                departmentService.getAllDepartments();

        assertEquals(1, result.size());
        assertEquals("IT", result.get(0).getDepartmentName());
    }

    @Test
    void shouldSaveDepartment() {

        Department department = new Department();
        department.setDepartmentName("HR");

        when(departmentRepository.save(department))
                .thenReturn(department);

        Department result =
                departmentService.saveDepartment(department);

        assertEquals("HR", result.getDepartmentName());
    }

    @Test
    void shouldReturnDepartmentById() {

        Department department = new Department();
        department.setId(1L);
        department.setDepartmentName("Finance");

        when(departmentRepository.findById(1L))
                .thenReturn(Optional.of(department));

        Department result =
                departmentService.getDepartmentById(1L);

        assertNotNull(result);
        assertEquals("Finance", result.getDepartmentName());
    }

    @Test
    void shouldUpdateDepartment() {

        Department existing = new Department();
        existing.setId(1L);
        existing.setDepartmentName("Old Name");
        existing.setDescription("Old Description");

        Department updated = new Department();
        updated.setDepartmentName("New Name");
        updated.setDescription("New Description");

        when(departmentRepository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(departmentRepository.save(any(Department.class)))
                .thenReturn(existing);

        Department result =
                departmentService.updateDepartment(1L, updated);

        assertNotNull(result);
        assertEquals("New Name", result.getDepartmentName());
        assertEquals("New Description", result.getDescription());
    }

    @Test
    void shouldDeleteDepartment() {

        departmentService.deleteDepartment(1L);

        verify(departmentRepository, times(1))
                .deleteById(1L);
    }
}