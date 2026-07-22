package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.User;
import com.maneesh.employeemanagementsystem.repo.UserRepository;
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
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void shouldReturnAllUsers() {

        User user = new User();
        user.setId(1L);
        user.setUsername("admin");

        when(userRepository.findAll())
                .thenReturn(List.of(user));

        List<User> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals(
                "admin",
                result.get(0).getUsername()
        );
    }

    @Test
    void shouldSaveUser() {

        User user = new User();
        user.setUsername("maneesh");

        when(userRepository.save(user))
                .thenReturn(user);

        User result = userService.saveUser(user);

        assertEquals(
                "maneesh",
                result.getUsername()
        );
    }

    @Test
    void shouldReturnUserById() {

        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(
                "testuser",
                result.getUsername()
        );
    }

    @Test
    void shouldReturnUserByUsername() {

        User user = new User();
        user.setUsername("admin");

        when(userRepository.findByUsername("admin"))
                .thenReturn(Optional.of(user));

        User result =
                userService.getUserByUsername("admin");

        assertNotNull(result);
        assertEquals(
                "admin",
                result.getUsername()
        );
    }

    @Test
    void shouldUpdateUser() {

        User existing = new User();
        existing.setId(1L);
        existing.setUsername("olduser");
        existing.setEmail("old@test.com");

        User updated = new User();
        updated.setUsername("newuser");
        updated.setEmail("new@test.com");

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(userRepository.save(any(User.class)))
                .thenReturn(existing);

        User result =
                userService.updateUser(
                        1L,
                        updated
                );

        assertNotNull(result);

        assertEquals(
                "newuser",
                result.getUsername()
        );

        assertEquals(
                "new@test.com",
                result.getEmail()
        );
    }

    @Test
    void shouldReturnNullWhenUsernameNotFound() {

        when(userRepository.findByUsername("UnknownUser"))
                .thenReturn(Optional.empty());

        User result =
                userService.getUserByUsername("UnknownUser");

        assertNull(result);
    }

    @Test
    void shouldDeleteUser() {

        userService.deleteUser(1L);

        verify(
                userRepository,
                times(1)
        ).deleteById(1L);
    }
}