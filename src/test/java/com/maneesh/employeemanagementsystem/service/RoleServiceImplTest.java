package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Role;
import com.maneesh.employeemanagementsystem.repo.RoleRepository;
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
class RoleServiceImplTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleServiceImpl roleService;

    @Test
    void shouldReturnAllRoles() {

        Role role = new Role();
        role.setId(1L);
        role.setRoleName("ADMIN");

        when(roleRepository.findAll())
                .thenReturn(List.of(role));

        List<Role> result =
                roleService.getAllRoles();

        assertEquals(1, result.size());
        assertEquals(
                "ADMIN",
                result.get(0).getRoleName()
        );
    }

    @Test
    void shouldSaveRole() {

        Role role = new Role();
        role.setRoleName("USER");

        when(roleRepository.save(role))
                .thenReturn(role);

        Role result =
                roleService.saveRole(role);

        assertEquals(
                "USER",
                result.getRoleName()
        );
    }

    @Test
    void shouldReturnRoleById() {

        Role role = new Role();
        role.setId(1L);
        role.setRoleName("MANAGER");

        when(roleRepository.findById(1L))
                .thenReturn(Optional.of(role));

        Role result =
                roleService.getRoleById(1L);

        assertNotNull(result);

        assertEquals(
                "MANAGER",
                result.getRoleName()
        );
    }

    @Test
    void shouldUpdateRole() {

        Role existing = new Role();
        existing.setId(1L);
        existing.setRoleName("USER");

        Role updated = new Role();
        updated.setRoleName("ADMIN");

        when(roleRepository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(roleRepository.save(any(Role.class)))
                .thenReturn(existing);

        Role result =
                roleService.updateRole(
                        1L,
                        updated
                );

        assertNotNull(result);

        assertEquals(
                "ADMIN",
                result.getRoleName()
        );
    }

    @Test
    void shouldDeleteRole() {

        roleService.deleteRole(1L);

        verify(
                roleRepository,
                times(1)
        ).deleteById(1L);
    }
}