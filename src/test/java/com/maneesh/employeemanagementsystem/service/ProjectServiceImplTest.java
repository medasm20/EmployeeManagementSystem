package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.Project;
import com.maneesh.employeemanagementsystem.repo.ProjectRepository;
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
class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

    @Test
    void shouldReturnAllProjects() {

        Project project = new Project();
        project.setId(1L);
        project.setProjectName("EMS");

        when(projectRepository.findAll())
                .thenReturn(List.of(project));

        List<Project> result =
                projectService.getAllProjects();

        assertEquals(1, result.size());

        assertEquals(
                "EMS",
                result.get(0).getProjectName()
        );
    }

    @Test
    void shouldSaveProject() {

        Project project = new Project();
        project.setProjectName("HRMS");

        when(projectRepository.save(project))
                .thenReturn(project);

        Project result =
                projectService.saveProject(project);

        assertEquals(
                "HRMS",
                result.getProjectName()
        );
    }

    @Test
    void shouldReturnProjectById() {

        Project project = new Project();
        project.setId(1L);
        project.setProjectName("Inventory");

        when(projectRepository.findById(1L))
                .thenReturn(Optional.of(project));

        Project result =
                projectService.getProjectById(1L);

        assertNotNull(result);

        assertEquals(
                "Inventory",
                result.getProjectName()
        );
    }

    @Test
    void shouldUpdateProject() {

        Project existing = new Project();
        existing.setId(1L);
        existing.setProjectName("Old Project");
        existing.setDescription("Old Description");

        Project updated = new Project();
        updated.setProjectName("New Project");
        updated.setDescription("New Description");

        when(projectRepository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(projectRepository.save(any(Project.class)))
                .thenReturn(existing);

        Project result =
                projectService.updateProject(
                        1L,
                        updated
                );

        assertNotNull(result);

        assertEquals(
                "New Project",
                result.getProjectName()
        );

        assertEquals(
                "New Description",
                result.getDescription()
        );
    }

    @Test
    void shouldDeleteProject() {

        projectService.deleteProject(1L);

        verify(
                projectRepository,
                times(1)
        ).deleteById(1L);
    }
}