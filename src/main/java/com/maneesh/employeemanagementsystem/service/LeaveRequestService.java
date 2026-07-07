package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.LeaveRequest;

import java.util.List;

public interface LeaveRequestService {

    List<LeaveRequest> getAllLeaveRequests();

    LeaveRequest saveLeaveRequest(LeaveRequest leaveRequest);

    LeaveRequest getLeaveRequestById(Long id);

    LeaveRequest updateLeaveRequest(Long id,
                                    LeaveRequest leaveRequest);

    void deleteLeaveRequest(Long id);
}