package com.maneesh.employeemanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.maneesh.employeemanagementsystem.utils.Constants;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = Constants.firstName)
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    private String email;

    private String phone;

    @Positive
    private Double salary;

    private String status;

    private String joiningDate;

    @ManyToOne
    @JsonIgnoreProperties({"employees"})
    private Department department;

    @ManyToOne
    @JsonIgnoreProperties({"manager", "department"})
    private Employee manager;

    @ManyToOne
    private Role role;

    @ManyToOne
    private Project project;
}