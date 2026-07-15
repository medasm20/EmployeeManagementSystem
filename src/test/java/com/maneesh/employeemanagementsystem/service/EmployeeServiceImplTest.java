package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Employee;
import com.maneesh.employeemanagementsystem.repo.EmployeeRepository;
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
class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @Test
    void shouldReturnAllEmployees() {

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Maneesh");

        when(employeeRepository.findAll())
                .thenReturn(List.of(employee));

        List<Employee> result =
                employeeService.getAllEmployees();

        assertEquals(1, result.size());
        assertEquals(
                "Maneesh",
                result.get(0).getFirstName()
        );
    }

    @Test
    void shouldSaveEmployee() {

        Employee employee = new Employee();
        employee.setFirstName("Sai");

        when(employeeRepository.save(employee))
                .thenReturn(employee);

        Employee result =
                employeeService.saveEmployee(employee);

        assertEquals(
                "Sai",
                result.getFirstName()
        );
    }

    @Test
    void shouldReturnEmployeeById() {

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Ravi");

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee));

        Employee result =
                employeeService.getEmployeeById(1L);

        assertNotNull(result);

        assertEquals(
                "Ravi",
                result.getFirstName()
        );
    }

    @Test
    void shouldUpdateEmployee() {

        Employee existing = new Employee();
        existing.setId(1L);
        existing.setFirstName("Old");
        existing.setLastName("Name");

        Employee updated = new Employee();
        updated.setFirstName("New");
        updated.setLastName("Employee");

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(employeeRepository.save(any(Employee.class)))
                .thenReturn(existing);

        Employee result =
                employeeService.updateEmployee(
                        1L,
                        updated
                );

        assertNotNull(result);

        assertEquals(
                "New",
                result.getFirstName()
        );

        assertEquals(
                "Employee",
                result.getLastName()
        );
    }

    @Test
    void shouldDeleteEmployee() {

        employeeService.deleteEmployee(1L);

        verify(
                employeeRepository,
                times(1)
        ).deleteById(1L);
    }
}