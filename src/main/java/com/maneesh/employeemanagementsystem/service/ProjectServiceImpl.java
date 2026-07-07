package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Project;
import com.maneesh.employeemanagementsystem.repo.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public Project updateProject(Long id, Project project) {

        Project existingProject =
                projectRepository.findById(id).orElse(null);

        if (existingProject != null) {

            existingProject.setProjectName(project.getProjectName());
            existingProject.setDescription(project.getDescription());
            existingProject.setEmployees(project.getEmployees());

            return projectRepository.save(existingProject);
        }

        return null;
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}