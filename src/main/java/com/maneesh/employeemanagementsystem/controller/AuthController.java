package com.maneesh.employeemanagementsystem.controller;

import com.maneesh.employeemanagementsystem.dto.LoginRequest;
import com.maneesh.employeemanagementsystem.dto.LoginResponse;
import com.maneesh.employeemanagementsystem.model.User;
import com.maneesh.employeemanagementsystem.security.JwtUtil;
import com.maneesh.employeemanagementsystem.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil,
                          UserService userService) {

        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public LoginResponse login(
            @RequestBody LoginRequest loginRequest) {

        User user = userService.getUserByUsername(
                loginRequest.getUsername()
        );

        if (user != null &&
                user.getPassword().equals(
                        loginRequest.getPassword())) {

            String token = jwtUtil.generateToken(
                    user.getUsername(),
                    user.getRole().getRoleName()
            );

            return new LoginResponse(token);
        }

        return new LoginResponse(
                "Invalid Username or Password"
        );
    }

    @GetMapping("/auth/username")
    public String extractUsername(
            @RequestParam String token) {

        return jwtUtil.extractUsername(token);
    }

    @GetMapping("/auth/role")
    public String extractRole(
            @RequestParam String token) {

        return jwtUtil.extractRole(token);
    }
}