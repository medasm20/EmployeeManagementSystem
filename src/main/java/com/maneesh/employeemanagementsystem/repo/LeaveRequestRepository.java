package com.maneesh.employeemanagementsystem.repo;

import com.maneesh.employeemanagementsystem.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository
        extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployeeManagerId(Long managerId);
}