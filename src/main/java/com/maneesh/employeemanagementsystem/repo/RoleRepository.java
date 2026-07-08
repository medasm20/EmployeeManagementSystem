package com.maneesh.employeemanagementsystem.repo;

import com.maneesh.employeemanagementsystem.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
