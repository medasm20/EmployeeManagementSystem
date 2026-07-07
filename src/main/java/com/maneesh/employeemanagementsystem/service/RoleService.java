package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();

    Role saveRole(Role role);

    Role getRoleById(Long id);

    Role updateRole(Long id, Role role);

    void deleteRole(Long id);
}