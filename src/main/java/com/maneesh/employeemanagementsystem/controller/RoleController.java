package com.maneesh.employeemanagementsystem.controller;

import com.maneesh.employeemanagementsystem.model.Role;
import com.maneesh.employeemanagementsystem.service.RoleService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/roles/{id}")
    public Role getRoleById(@PathVariable Long id) {
        return roleService.getRoleById(id);
    }

    @PostMapping("/roles")
    public Role saveRole(@RequestBody Role role) {
        return roleService.saveRole(role);
    }

    @PutMapping("/roles/{id}")
    public Role updateRole(@PathVariable Long id,
                           @RequestBody Role role) {
        return roleService.updateRole(id, role);
    }

    @DeleteMapping("/roles/{id}")
    public String deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return "Role deleted successfully";
    }
}