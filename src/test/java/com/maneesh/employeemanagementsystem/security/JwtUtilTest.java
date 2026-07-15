package com.maneesh.employeemanagementsystem.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil(
                "mysecretkeymysecretkeymysecretkeymysecretkey"
        );
    }

    @Test
    void shouldGenerateToken() {

        String token =
                jwtUtil.generateToken(
                        "admin",
                        "ADMIN"
                );

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void shouldExtractUsername() {

        String token =
                jwtUtil.generateToken(
                        "admin",
                        "ADMIN"
                );

        String username =
                jwtUtil.extractUsername(token);

        assertEquals(
                "admin",
                username
        );
    }

    @Test
    void shouldExtractRole() {

        String token =
                jwtUtil.generateToken(
                        "admin",
                        "ADMIN"
                );

        String role =
                jwtUtil.extractRole(token);

        assertEquals(
                "ADMIN",
                role
        );
    }
}