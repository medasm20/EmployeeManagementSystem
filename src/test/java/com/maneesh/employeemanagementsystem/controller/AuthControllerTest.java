package com.maneesh.employeemanagementsystem.controller;

import com.maneesh.employeemanagementsystem.dto.LoginRequest;
import com.maneesh.employeemanagementsystem.dto.LoginResponse;
import com.maneesh.employeemanagementsystem.model.Role;
import com.maneesh.employeemanagementsystem.model.User;
import com.maneesh.employeemanagementsystem.security.JwtUtil;
import com.maneesh.employeemanagementsystem.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    private JwtUtil jwtUtil;

    private UserService userService;

    private AuthController authController;

    @BeforeEach
    void setUp() {

        jwtUtil = mock(JwtUtil.class);

        userService = mock(UserService.class);

        authController =
                new AuthController(
                        jwtUtil,
                        userService
                );
    }

    @Test
    void shouldLoginSuccessfully() {

        Role role = new Role();
        role.setRoleName("ADMIN");

        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin123");
        user.setRole(role);

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("admin123");

        when(userService.getUserByUsername("admin"))
                .thenReturn(user);

        when(jwtUtil.generateToken(
                "admin",
                "ADMIN"))
                .thenReturn("dummy-token");

        LoginResponse response =
                authController.login(request);

        assertEquals(
                "dummy-token",
                response.getToken()
        );
    }

    @Test
    void shouldReturnInvalidCredentialsMessage() {

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("wrong");

        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin123");

        when(userService.getUserByUsername("admin"))
                .thenReturn(user);

        LoginResponse response =
                authController.login(request);

        assertEquals(
                "Invalid Username or Password",
                response.getToken()
        );
    }

    @Test
    void shouldExtractUsername() {

        when(jwtUtil.extractUsername("token"))
                .thenReturn("admin");

        String username =
                authController.extractUsername("token");

        assertEquals(
                "admin",
                username
        );
    }

    @Test
    void shouldExtractRole() {

        when(jwtUtil.extractRole("token"))
                .thenReturn("ADMIN");

        String role =
                authController.extractRole("token");

        assertEquals(
                "ADMIN",
                role
        );
    }
}