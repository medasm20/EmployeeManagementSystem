package com.maneesh.employeemanagementsystem.controller;

import com.maneesh.employeemanagementsystem.model.Employee;
import com.maneesh.employeemanagementsystem.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeControllerTest {

    @Mock
    private EmployeeService employeeService;

    @InjectMocks
    private EmployeeController employeeController;

    @Test
    void shouldReturnEmployeeById() {

        Employee employee = new Employee();
        employee.setId(1L);

        when(employeeService.getEmployeeById(1L))
                .thenReturn(employee);

        Employee result =
                employeeController.getEmployeeById(1L);

        assertEquals(
                1L,
                result.getId()
        );
    }

    @Test
    void shouldDeleteEmployeeAndReturnSuccessMessage() {

        String result =
                employeeController.deleteEmployee(1L);

        verify(employeeService, times(1))
                .deleteEmployee(1L);

        assertEquals(
                "Employee deleted successfully",
                result
        );
    }
}