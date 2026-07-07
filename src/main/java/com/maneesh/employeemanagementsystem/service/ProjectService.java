package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Project;

import java.util.List;

public interface ProjectService {

    List<Project> getAllProjects();

    Project saveProject(Project project);

    Project getProjectById(Long id);

    Project updateProject(Long id, Project project);

    void deleteProject(Long id);
}