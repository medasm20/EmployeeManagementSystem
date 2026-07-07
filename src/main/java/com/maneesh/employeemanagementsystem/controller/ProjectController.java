package com.maneesh.employeemanagementsystem.controller;

import com.maneesh.employeemanagementsystem.model.Project;
import com.maneesh.employeemanagementsystem.service.ProjectService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/projects/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping("/projects")
    public Project saveProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @PutMapping("/projects/{id}")
    public Project updateProject(@PathVariable Long id,
                                 @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    @DeleteMapping("/projects/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return "Project deleted successfully";
    }
}