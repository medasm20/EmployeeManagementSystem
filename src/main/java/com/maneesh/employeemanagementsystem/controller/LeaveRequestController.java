package com.maneesh.employeemanagementsystem.controller;

import com.maneesh.employeemanagementsystem.model.LeaveRequest;
import com.maneesh.employeemanagementsystem.service.LeaveRequestService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @GetMapping("/leave-requests")
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }

    @GetMapping("/leave-requests/{id}")
    public LeaveRequest getLeaveRequestById(@PathVariable Long id) {
        return leaveRequestService.getLeaveRequestById(id);
    }

    @PostMapping("/leave-requests")
    public LeaveRequest saveLeaveRequest(
            @RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.saveLeaveRequest(leaveRequest);
    }

    @PutMapping("/leave-requests/{id}")
    public LeaveRequest updateLeaveRequest(
            @PathVariable Long id,
            @RequestBody LeaveRequest leaveRequest) {

        return leaveRequestService.updateLeaveRequest(id, leaveRequest);
    }

    @DeleteMapping("/leave-requests/{id}")
    public String deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestService.deleteLeaveRequest(id);
        return "Leave Request deleted successfully";
    }
}