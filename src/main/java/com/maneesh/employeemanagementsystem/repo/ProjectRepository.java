package com.maneesh.employeemanagementsystem.repo;

import com.maneesh.employeemanagementsystem.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}